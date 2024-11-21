
import Joi from 'joi';

export const loginValidation = (data) => {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    
    });
  
    return schema.validate(data);
  };

  export const validateTaskCreation = (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      dueDate: Joi.date().required(), // Optional, must be a future date if provided
    
    });
  
    return schema.validate(data);
  };  

  export const validateTaskModify = (data) => {
    const schema = Joi.object({
      id: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      dueDate: Joi.date().required(), // Optional, must be a future date if provided
    
    });
  
    return schema.validate(data);
  };  



