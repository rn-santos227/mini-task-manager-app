import Joi from "joi";

const dateRangeValidator = (values, helpers) => {
  const { startDate, endDate } = values;

  if (startDate && endDate) {
    if (new Date(startDate) > new Date(endDate)) {
      return helpers.error("any.invalid");
    }
  }
  return values;
};

export const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().allow(""),
  completed: Joi.boolean(),

  startDate: Joi.date().iso().allow(null),
  endDate: Joi.date().iso().allow(null),

  active: Joi.boolean().default(true),
}).custom(dateRangeValidator)
  .messages({
    "any.invalid": "startDate cannot be later than endDate",
  });

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(100),
  description: Joi.string().allow(""),
  completed: Joi.boolean(),

  startDate: Joi.date().iso().allow(null),
  endDate: Joi.date().iso().allow(null),

  active: Joi.boolean(),
}).custom(dateRangeValidator)
  .messages({
    "any.invalid": "startDate cannot be later than endDate",
  });

