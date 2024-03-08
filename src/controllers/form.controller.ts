import { FastifyReply, FastifyRequest } from "fastify"
import { ERRORS } from "../utils/errorsTable"
import { prismaClient } from "../utils/utils"
import { Prisma } from "@prisma/client"

export const createForm = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request["authUser"]
    const data = request.body as Prisma.FormCreateInput
    const newForm = await prismaClient.form.create({
      data: {
        title: data.title,
        questions: { createMany: { data: data.questions as Prisma.QuestionCreateManyFormInput } },
        createdBy: {
          connect: {
            id: id,
          },
        },
      },
    })
    return reply.status(200).send({ data: newForm })
  } catch (err) {
    console.error("createForm error: ", err)
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
      include: { questions: true, responses: true },
    })

    return reply.status(200).send({ data: userForms })
  } catch (err) {
    console.error("getAllFormsForUser error: ", err)
    return reply.status(501).send(ERRORS.internalServerError)
  }
}

export const getFormById = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    //@ts-ignore
    const { id } = request.params

    const form = await prismaClient.form.findUnique({
      where: {
        id: +id,
      },
      include: { questions: true, responses: true },
    })

    return reply.status(200).send({ data: form })
  } catch (err) {
    console.error("getFormById error: ", err)
    return reply.status(501).send(ERRORS.internalServerError)
  }
}

export const deleteForm = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    //@ts-ignore
    const { id } = request.params

    await prismaClient.form.delete({
      where: {
        id: +id,
      },
    })

    return reply.status(200).send(`Form ${id} was deleted`)
  } catch (err) {
    console.error("deleteForm error: ", err)
    return reply.status(501).send(ERRORS.internalServerError)
  }
}
