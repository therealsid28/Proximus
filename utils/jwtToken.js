import jwt from 'jsonwebtoken';

const signToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '5d',
  });
  return token;
};

export { signToken };
