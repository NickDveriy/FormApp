import { FastifyReply, FastifyRequest } from "fastify"
import { ERRORS } from "../utils/errorsTable"
import { prismaClient } from "../utils/utils"
import { IParamsId } from "../interfaces"
import { Prisma } from "@prisma/client"

export const getAllQuestions = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const questions = await prismaClient.question.findMany()

    return reply.status(200).send({ data: questions })
  } catch (err) {
    console.error("getAllQuestions error: ", err)
    return reply.status(501).send(ERRORS.internalServerError)
  }
}

export const deleteQuestion = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as IParamsId

    await prismaClient.question.delete({
      where: {
        id: +id,
      },
    })

    return reply.status(200).send(`Question ${id} was deleted`)
  } catch (err) {
    console.error("deleteQuestion error: ", err)
    return reply.status(501).send(ERRORS.internalServerError)
  }
}
