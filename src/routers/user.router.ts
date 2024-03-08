import { FastifyInstance } from "fastify"
import { loginSchema, signupSchema } from "../schema"

import { login, signUp, listUsers } from "../controllers/user.controller"
import { authUser, checkIfUserIsAdmin } from "../utils/requestValidation"

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

  fastify.route({
    method: "GET",
    url: "/list",
    preHandler: [authUser, checkIfUserIsAdmin],
    handler: listUsers,
  })
}

export default userRouter
