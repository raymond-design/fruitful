import { Request, Response, Router } from "express";
import Comment from "../entities/Comment";

import Post from "../entities/Post";
import auth from '../middleware/auth';

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

const router = Router();

router.post('/:identifier/:slug/comments', auth, addComment);

export default router;