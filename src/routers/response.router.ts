import { FastifyInstance } from "fastify"
import { createResponseSchema } from "../schema"
import { createResponseForForm } from "../controllers/form.controller"
import { authUser } from "../utils/requestValidation"

async function responseRouter(fastify: FastifyInstance) {
  fastify.decorateRequest("authUser", "")

  fastify.route({
    method: "POST",
    url: "/create",
    schema: createResponseSchema,
    preHandler: [authUser],
    handler: createResponseForForm,
  })
}

export default responseRouter
