import { Request, Response, Router } from "express";
import Group from "../entities/Group";

import Post from "../entities/Post";
import auth from '../middleware/auth';
import status from '../middleware/status';

const createPost = async (req: Request, res: Response) => {
  const { title, body, group } = req.body;

  const user = res.locals.user

  if(title.trim() === '') {
    return res.status(400).json({ title: 'Title must not be empty'})
  }

  try {
    const groupName = await Group.findOneOrFail({ name: group });

    const post = new Post({ title, body, user, group: groupName });
    await post.save();

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

//Eventually take in params that will allow the posts to be reordered in different ways
//Also define pagination and default ordering!
const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find({
      order: { createdAt: 'DESC' },
      /**
       * the following line is breaking code, Feb 18
       */
      //relations: ['comments', 'votes', 'group'],
    });

    if(res.locals.user) {
      posts.forEach((post) => post.setUserVote(res.locals.user));
    }
    
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

//Get single post
const getPost = async (req: Request, res: Response) => {
  const {identifier, slug} = req.params;
  try {
    const post = await Post.findOneOrFail(
      { identifier, slug },
      {
        relations: ['group', 'votes', 'comments']
      }
    );

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: 'Post not found' });
  }
}

const router = Router();

router.post('/', status, auth, createPost);
router.get('/', status, getPosts);
router.get('/:identifier/:slug', getPost);

export default router;