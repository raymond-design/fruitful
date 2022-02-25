import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { isEmpty } from 'class-validator';
import multer, { FileFilterCallback } from "multer";
import User from "../entities/User";
import Group from "../entities/Group";

import auth from '../middleware/auth';
import status from '../middleware/status';
import Post from "../entities/Post";
import { makeId } from "../util/helpers";
import path from "path/posix";

const createGroup = async (req: Request, res: Response) => {
  const { name, title, description } = req.body;

  const user: User = res.locals.user;

  try {
    let errors: any = {};

    if(isEmpty(name)) {
      errors.name = 'Name cannot be empty!';
    }

    if(isEmpty(title)) {
      errors.title = 'Title cannot be empty!';
    }

    //typeorm-specific query to check if group name exists (case-insensitive)
    const group = await getRepository(Group)
      .createQueryBuilder('group')
      .where('lower(group.name) = :name', { name: name.toLowerCase() })
      .getOne();

    if(group) {
      errors.name = 'Group already exists';
    }

    if(Object.keys(errors).length > 0){
      throw errors
    }

  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }

  try {
    const group = new Group({ name, description, title, user });
    await group.save();

    return res.json(group);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }

}

const getGroup = async(req: Request, res: Response) => {
  const name = req.params.name;

  try {
    const group = await Group.findOneOrFail({ name });
    const posts = await Post.find({
      where: { group },
      order: { createdAt : 'DESC'},
      relations: ["comments", "votes"],
    });
    
    group.posts = posts;

    if(res.locals.user) {
      (await group).posts.forEach(p => p.setUserVote(res.locals.user))
    }
    return res.json(group)
  } catch (err) {
    console.log(err);
    return res.status(404).json({ group: 'Group doesn\'t exist!'})
  }
}

const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/images',
    filename: (req, file, cb) => {
      const name = makeId(15);
      cb(null, name + path.extname(file.originalname));
    }
  }),
  fileFilter: (_, file: any, cb: FileFilterCallback) => {
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      cb(null, true);
    }
    else {
      cb(null, false);
    }
  }
});

const uploadGroupImage = async (req: Request, res: Response) => {
  return res.json({ success: true });
}

const router = Router();

router.post('/', status, auth, createGroup);
router.get('/:name', status, getGroup)
router.post('/:name/image', status, auth, upload.single('file'), uploadGroupImage)
export default router;