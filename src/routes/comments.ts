import { Request, Response, Router } from "express";
import Comment from "../entities/Comment";

import Post from "../entities/Post";

import auth from '../middleware/auth';
import status from '../middleware/status';

const addComment = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  const {body} = req.body;
  console.log(identifier,slug,body);
  try {
    const post = await Post.findOneOrFail({ identifier, slug });

    const comment = new Comment({
      body,
      user: res.locals.user,
      post
    });

    await comment.save();

    return res.json(comment);
  } catch (error) {
    //console.log(error);
    console.log(identifier,slug,body);

    return res.status(404).json({ error: 'Post not found' });
  }
}

const getPostComments = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params
  try {
    const post = await Post.findOneOrFail({ identifier, slug })
    const comments = await Comment.find({
      where: { post },
      order: { createdAt: 'DESC' },
      relations: ['votes']
    })

    if(res.locals.user) {
      comments.forEach(c => c.setUserVote(res.locals.user))
    }
    
    return res.json(comments)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error"})
  }
}

const router = Router();

router.post('/:identifier/:slug/comments', status, auth, addComment);
router.get('/:identifier/:slug/comments', status, getPostComments);

export default router;