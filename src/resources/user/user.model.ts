import { Schema, model, Document } from "mongoose"
import bcrypt from "bcrypt"
import User from "@/resources/user/user.interface"

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre<User>("save", async function (next) {
  // TODO: check the default version (default: if (!this.Modified("password")))
  // TS2339: Property 'Modified' does not exist on type 'User'.
  // https://mongoosejs.com/docs/api.html#schema_Schema-pre
  // https://mongoosejs.com/docs/api/document.html#document_Document-isModified
  if (!this.isModified("password")) return next()

  this.password = await bcrypt.hash(this.password, 10)

  next()
})

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password)
}

export default model<User>("User", UserSchema)
