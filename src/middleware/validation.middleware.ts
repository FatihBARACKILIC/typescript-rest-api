import { NextFunction, Request, RequestHandler, Response } from "express"
import Joi from "joi"

const validationMiddleware = (schema: Joi.Schema): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: false,
    }

    try {
      req.body = await schema.validateAsync(req.body, validationOptions)
      next()
    } catch (e: any) {
      const errors: string[] = []
      e.details.forEach((error: Joi.ValidationError) => {
        errors.push(error.message)
      })
      res.status(400).send({ errors })
    }
  }
}

export default validationMiddleware
