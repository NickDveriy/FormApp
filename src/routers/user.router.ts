import { FastifyInstance } from "fastify"
import { loginSchema, signupSchema } from "../schema"
import { login, signUp } from "../controllers/user.controller"

async function userRouter(fastify: FastifyInstance) {
  fastify.decorateRequest("authUser", "")

  fastify.route({
    method: "POST",
    url: "/login",
    schema: loginSchema,
    handler: login,
  })

  fastify.route({
    method: "POST",
    url: "/signup",
    schema: signupSchema,
    handler: signUp,
  })
}

export default userRouter
