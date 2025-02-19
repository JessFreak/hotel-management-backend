import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import createError from 'http-errors';

export const registerUser = async (req, res) => {
  const { firstName, lastName, middleName, passportNumber, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    middleName,
    passportNumber,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json();
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(createError(400, 'User with such email not found'));
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(createError(400, 'Password is not valid'));
  }

  const accessToken = jwt.sign({
      user: {
        email: user.email,
        id: user.id,
      },
    },
    process.env.JWT_SECERT,
    { expiresIn: '3d' }
  );

  res.status(200).json({ accessToken });
  next();
};

export const getCurrentUser = (req, res) => {
  res.json(req.user);
};
