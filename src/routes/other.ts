import { Request, Router } from 'express'
import Post from '../entities/Post';
import User from '../entities/User'
import Vote from '../entities/Vote';
import Comment from '../entities/Comment';

import auth from '../middleware/auth'
import { ConnectionNotFoundError } from 'typeorm';

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

    if(commentIdentifier){
      //if exists, find vote using comment
      comment = await Comment.findOneOrFail({ identifier: commentIdentifier });
      vote = await Vote.findOne({ user, comment });
    } else {
      vote = await Vote.findOne({ user, post });
    }

    if(!vote && value == 0){
      // no vote and value = 0 (error)
      return res.status(404).json({ error: 'Vote not found '});
    } else if(!vote){
      //create vote
      vote = new Vote({ user, value });

      if(comment) {
        vote.comment = comment;
      }
      else {
        vote.post = post;
      }

      await vote.save();
    } else if(value === 0) {
      //If vote and value = 0, then remove vote
      await vote.remove();
    } else if(vote.value !== value) {
      //If vote, update vote
      vote.value = value;
      await vote.save();
    }

    post = await Post.findOneOrFail({ identifier, slug }, { relations: ['comments', 'group', 'votes']});

    return res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error!'});
  }
}
const router = Router();

router.post('/vote', auth, vote);
export default router;