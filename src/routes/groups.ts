import { Request, Response, Router } from "express";
import User from "../entities/User";
import Group from "../entities/Group";
import auth from '../middleware/auth';
import { getRepository } from "typeorm";
import {isEmpty} from 'class-validator';
import { Subject } from "typeorm/persistence/Subject";

const createGroup = async (req: Request, res: Response) => {
  const {name, title, description } = req.body;

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
      .where('lower(group.name) - :name', { name: name.toLowercase() })
      .getOne();

    if(group) {
      errors.name = 'Group already exists';
    }

    if(Object.keys(errors).length > 0){
      throw errors
    }

  } catch (error) {
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

const router = Router();

router.post('/', auth, createGroup);

export default router;