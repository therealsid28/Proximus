import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('organizer', 'user', 'admin').required(),
  googleId: Joi.string(),
  profilePic: Joi.string(),
});

export default userSchema;
