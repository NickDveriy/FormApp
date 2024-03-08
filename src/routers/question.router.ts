import { FastifyInstance } from "fastify"
import { idSchema } from "../schema"
import { deleteQuestion, getAllQuestions } from "../controllers/question.controller"
import { authUser, checkIfUserIsAdmin } from "../utils/requestValidation"
import { createQuestionSchema } from "../schema/question.schema"
import { createQuestionInForm } from "../controllers/form.controller"

async function questionRouter(fastify: FastifyInstance) {
  fastify.decorateRequest("authUser", "")

  fastify.route({
    method: "GET",
    url: "/list",
    preHandler: [authUser, checkIfUserIsAdmin],
    handler: getAllQuestions,
  })

  fastify.route({
    method: "POST",
    url: "/create",
    schema: createQuestionSchema,
    preHandler: [authUser, checkIfUserIsAdmin],
    handler: createQuestionInForm,
  })

  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: idSchema,
    preHandler: [authUser, checkIfUserIsAdmin],
    handler: deleteQuestion,
  })
}

export default questionRouter
