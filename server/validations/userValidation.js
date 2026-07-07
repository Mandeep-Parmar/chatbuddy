import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().alphanum().trim().min(3).max(30).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be atlease 3 characters",
    "string.max": "Name cannot exceed 30 characters",
  }),

  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required()
    .messages({
      "string.email": "Please enter a valid email",
      "string.empty": "Email is required",
    }),

  password: Joi.string().min(8).max(15).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password cannot exceed 15 characters",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});
