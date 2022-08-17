import UserModel from "@/resources/user/user.model"
import token from "@/utils/token"

class UserService {
  private user = UserModel

  /**
   * Register a new user
   */
  public register = async (
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<string | Error> => {
    try {
      const user = await this.user.create({ name, email, password, role })
      return token.createToken(user)
    } catch (e) {
      throw new Error("Unable to create user!")
    }
  }

  /**
   * Attempt to log in a user
   */

  public login = async (
    email: string,
    password: string
  ): Promise<string | Error> => {
    try {
      const user = await this.user.findOne({ email })

      if (!user) throw new Error("Unable to find user with that Email Address!")

      if (await user.isValidPassword(password)) return token.createToken(user)
      else throw new Error("Wrong credentials given")
    } catch (e) {
      throw new Error("Unable to login user!")
    }
  }
}

export default UserService
