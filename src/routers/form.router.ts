import { FastifyInstance } from "fastify"
import { createFormSchema, getAllFormsSchema } from "../schema"
import { createForm, getAllFormsForUser } from "../controllers/form.controller"
import { authUser, checkIfUserIsAdmin } from "../utils/requestValidation"

async function formRouter(fastify: FastifyInstance) {
  fastify.decorateRequest("authUser", "")
  fastify.route({
    method: "POST",
    url: "/create",
    schema: createFormSchema,
    preHandler: [authUser, checkIfUserIsAdmin],
    handler: createForm,
  })

  fastify.route({
    method: "GET",
    url: "/listForms",
    schema: getAllFormsSchema,
    preHandler: [authUser, checkIfUserIsAdmin],
    handler: getAllFormsForUser,
  })
}

export default formRouter
