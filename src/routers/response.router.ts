import { FastifyInstance } from "fastify"
import { createFormSchema } from "../schema"
import { createResponseForForm } from "../controllers/form.controller"
import { authUser } from "../utils/requestValidation"

async function responseRouter(fastify: FastifyInstance) {
  fastify.decorateRequest("authUser", "")

  fastify.route({
    method: "POST",
    url: "/create",
    //schema: createFormSchema,
    preHandler: [authUser],
    handler: createResponseForForm,
  })
}

export default responseRouter
