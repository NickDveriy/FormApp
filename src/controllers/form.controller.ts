import { FastifyReply, FastifyRequest } from "fastify"
import { ERRORS } from "../utils/errorsTable"
import { prismaClient } from "../utils/utils"

export const createForm = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request["authUser"]
    const newForm = await prismaClient.form.create({
      data: {
        title: request.body["title"],
        createdBy: {
          connect: {
            id: id,
          },
        },
      },
    })
    return reply.status(200).send({ data: newForm })
  } catch (e) {
    return reply.status(500).send(ERRORS.internalServerError)
  }
}

export const getAllFormsForUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request["authUser"]

    const userForms = await prismaClient.form.findMany({
      where: {
        userId: id,
      },
    })

    return reply.status(200).send({ data: userForms })
  } catch (e) {
    return reply.status(501).send(ERRORS.internalServerError)
  }
}
