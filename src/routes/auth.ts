import {Request, Response, Router} from 'express';
import {validate} from 'class-validator';
import { User } from '../entities/User';

const register = async (req: Request, res: Response) => {
  const {email, username, password} = req.body;

  try {
    //list of errors
    let errorObj: any = {};

    //fetch to see if email/username already exist
    const emailUser = await User.findOne({email});
    const usernameUser = await User.findOne({username});

    if (emailUser) {
      errorObj.email = 'Email already in use';
    }
    if (usernameUser) {
      errorObj.username = 'Username already in use';
    }

    if(Object.keys(errorObj).length > 0) {
      return res.status(400).send(errorObj);
    }
    
    //Create new user
    const user = new User({email, username, password});

    // More validation
    errorObj = await validate(user);
    if (errorObj.length > 0) {
      return res.status(400).send({errorObj});
    }

    //Save user to db
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const router = Router();
router.post('/register', register);

export default router;