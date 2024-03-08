import { FastifyInstance } from "fastify"
import { createFormSchema, idSchema } from "../schema"
import { createForm, getAllFormsForUser, getFormById, deleteForm } from "../controllers/form.controller"
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
    url: "/list",
    preHandler: [authUser, checkIfUserIsAdmin],
    handler: getAllFormsForUser,
  })

  fastify.route({
    method: "GET",
    url: "/:id",
    schema: idSchema,
    preHandler: [authUser],
    handler: getFormById,
  })

  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: idSchema,
    preHandler: [authUser, checkIfUserIsAdmin],
    handler: deleteForm,
  })
}

export default formRouter
