import User from '../models/User/User.js';
import bcrypt from 'bcrypt';
import { asyncErrorHandler } from '../utils/ErrorHandeling.js';
import {
  userSignupSchema,
  userLoginSchema,
} from '../utils/validation/userValidation.js';
import AppError from '../utils/AppError.js';
import { signToken } from '../utils/jwtToken.js';

const userSignup = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password, googleId, profilePic, role } = req.body;

  const { error } = userSignupSchema.validate({
    name,
    email,
    password,
    googleId,
    profilePic,
    role,
  });

  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const checkUser = await User.findOne({ email: email });
  if (checkUser) {
    return next(new AppError('User already exists', 400));
  }

  // Hashing the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Saving the user in database
  let user = await User.create({
    name,
    email,
    password: hashedPassword,
    googleId,
    profilePic,
    role,
  });

  const token = signToken({
    _id: user._id,
    email: user.email,
  });

  res.status(200).json({
    message: 'User created successfully',
    data: {
      userData: {
        name: user.name,
        email: user.email,
      },
      token,
    },
  });
});

const userLogin = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = userLoginSchema.validate({
    email,
    password,
  });

  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError('Email or Password may be incorrect', 404));
  }

  // Check Password
  const verifyPassword = await bcrypt.compare(password, user.password);

  if (!verifyPassword) {
    return next(new AppError('Email or password may be in correct', 400));
  }

  const token = signToken({
    _id: user._id,
    email: user.email,
  });

  res.status(200).json({
    message: 'User Logged In',
    data: {
      userData: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
});

export { userSignup, userLogin };
