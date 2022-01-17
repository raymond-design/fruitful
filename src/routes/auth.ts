import {Request, Response, Router} from 'express';
import {isEmpty, validate} from 'class-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import User from '../entities/User';
import auth from '../middleware/auth';

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

const login = async (req: Request, res: Response) => {
  const {username, password} = req.body;

  try {
    //Check that fields aren't empty
    let errors: any = {};

    if(isEmpty(username))
    {
      errors.username = 'Username cannot be empty';
    }
    if(isEmpty(password))
    {
      errors.password = 'Password cannot be empty';
    }

    if(Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    //FInd user in db
    const user = await User.findOne({ username });

    if(!user) return res.status(404).json({ error: 'User does not exist' });

    const match = await bcrypt.compare(password, user.password);

    //Password incorrect
    //(Limit password tries later on)
    if(!match){
      return res.status(401).json({ password: 'Password incorrect'});
    }

    //Create jwt
    //Note: change signature string to more secure, random string later on
    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    //Set secure to true later on
    res.set('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    }));

    return res.json(user);

  } catch (error) {
    
  }
}

const me = (_: Request, res: Response) => {
  return res.json(res.locals.user);
}

const logout = (req: Request, res: Response) => {
  res.set('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
    path: '/',
  }))

  return res.status(200).json({ success: true });
}

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, me);
router.get('/logout', auth, logout);

export default router;