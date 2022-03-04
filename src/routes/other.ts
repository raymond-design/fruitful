import { Request, Response, Router } from 'express'

import Group from '../entities/Group';
import Post from '../entities/Post';
import User from '../entities/User'
import Vote from '../entities/Vote';
import Comment from '../entities/Comment';

import auth from '../middleware/auth'
import status from '../middleware/status';
import { getConnection } from 'typeorm';

const vote = async (req: Request, res: Response) => {
  const {identifier, slug, commentIdentifier, value} = req.body;

  //Validation:

  /**
   * -1 means it is a downvote
   * 0 means it is not voted
   * 1 means it is an upvote
   */
  if(![-1,-0,1].includes(value)){
    return res.status(400).json({value: 'Value has to be either -1, 0, or 1'});
  }

  try {
    const user: User = res.locals.user;
    let post = await Post.findOneOrFail({ identifier, slug });
    let vote: Vote | undefined;
    let comment: Comment | undefined;

    if (commentIdentifier) {
      // find by identifier
      comment = await Comment.findOneOrFail({ identifier: commentIdentifier });
      vote = await Vote.findOne({ user, comment });
    } else {
      // find by post
      vote = await Vote.findOne({ user, post });
    }

    if (!vote && value === 0) {
      // if no vote and value = 0 return error
      return res.status(404).json({ error: 'Vote not found' });
    } else if (!vote) {
      // If no vote, create it
      vote = new Vote({ user, value });

      if (comment) vote.comment = comment;
      else vote.post = post;

      await vote.save();
    } else if (value === 0) {
      // If vote exists and value === 0, then removw
      await vote.remove();
    } else if (vote.value !== value) {
      vote.value = value;

      await vote.save();
    }

    post = await Post.findOneOrFail( { identifier, slug }, { relations: ['comments', 'comments.votes', 'group', 'votes'] } );
    post.setUserVote(user);
    post.comments.forEach(c => c.setUserVote(user))
    return res.json(post)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * 
 * @param req 
 * @param res 
 * @returns Array of groups in the way that the frontend expects it
 */
const topGroups = async (_: Request, res: Response) => {
  const imageUrl = `COALESCE('${process.env.APP_URL}/images/' || s."imageUrn", 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y')`;  
  try {
    const groups = await getConnection()
      .createQueryBuilder()
      .select(`s.title, s.name, ${imageUrl} as "imageUrl", count(p.id) as "postCount"`)
      .from(Group, 's')
      .leftJoin(Post, 'p', 's.name = p."subName')
      .groupBy('s.title, s.name, "imageUrl"')
      .orderBy(`"postCount"`, 'DESC')
      .limit(10)
      .execute()

    return res.json(groups)
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const router = Router();

router.post('/vote', status, auth, vote);
router.get('/top-groups', topGroups);
export default router;