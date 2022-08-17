import { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interfaces/controller.interface"
import HttpExceptions from "@/utils/exceptions/http.exceptions"
import validationMiddleware from "@/middleware/validation.middleware"
import validate from "@/resources/user/user.validation"
import UserService from "@/resources/user/user.service"
import authenticated from "@/middleware/authenticated.middleware"

class UserController implements Controller {
  public path = "/users"
  public router = Router()
  private UserService = new UserService()

  constructor() {
    this.initialiseRoutes()
  }

  private initialiseRoutes = (): void => {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register),
      this.register
    )
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.login
    )
    this.router.get(`${this.path}`, authenticated, this.getUser)
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { name, email, password } = req.body
      const token = await this.UserService.register(
        name,
        email,
        password,
        "user"
      )
      res.status(201).json({ token })
    } catch (e: any) {
      next(new HttpExceptions(400, e.message))
    }
  }
  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body

      const token = await this.UserService.login(email, password)

      res.status(200).json({ token })
    } catch (e: any) {
      next(new HttpExceptions(400, e.message))
    }
  }

  private getUser = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    if (!req.user) return next(new HttpExceptions(404, "No logged in user!"))
    res.status(200).json({ user: req.user })
  }
}

export default UserController
