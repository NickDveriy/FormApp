import { FastifyReply, FastifyRequest } from "fastify"
import { ERRORS } from "../utils/errorsTable"
import { prismaClient } from "../utils/utils"
import { Prisma } from "@prisma/client"
import { IParamsId } from "../interfaces"

export const createForm = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = request.body as Prisma.FormCreateInput
    const newForm = await prismaClient.form.create({
      data: {
        title: data.title,
        questions: { createMany: { data: data.questions as Prisma.QuestionCreateManyFormInput } },
      },
    })
    return reply.status(200).send({ data: newForm })
  } catch (err) {
    console.error("createForm error: ", err)
    return reply.status(500).send(ERRORS.internalServerError)
  }
}

export const getAllForms = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userForms = await prismaClient.form.findMany({
      include: { questions: true, responses: { include: { answers: true } } },
    })

    return reply.status(200).send({ data: userForms })
  } catch (err) {
    console.error("getAllForms error: ", err)
    return reply.status(501).send(ERRORS.internalServerError)
  }
}

export const getFormById = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as IParamsId

    const form = await prismaClient.form.findUnique({
      where: {
        id: +id,
      },
      include: { questions: true },
    })

    return reply.status(200).send({ data: form })
  } catch (err) {
    console.error("getFormById error: ", err)
    return reply.status(501).send(ERRORS.internalServerError)
  }
}

export const deleteForm = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as IParamsId

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

export const createQuestionInForm = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = request.body as Prisma.QuestionUncheckedCreateInput

    const updatedForm = await prismaClient.form.update({
      where: { id: +data.formId },
      data: {
        questions: {
          create: {
            label: data.label,
            questionText: data.questionText,
            type: data.type,
          },
        },
      },
    })

    return reply.status(200).send({ data: updatedForm })
  } catch (err) {
    console.error("createQuestionInForm error: ", err)
    return reply.status(500).send(ERRORS.internalServerError)
  }
}

export const createResponseForForm = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request["authUser"]
    const data = request.body as Prisma.ResponseUncheckedCreateInput

    const isFormAnsweredAlready = await prismaClient.response.count({ where: { userId: id, formId: data.formId } })

    if (!!isFormAnsweredAlready) {
      return reply.status(403).send(ERRORS.formIsAnswered)
    }

    const updatedForm = await prismaClient.form.update({
      where: { id: data.formId },
      data: {
        responses: {
          create: {
            submissionDate: new Date(),
            answers: { createMany: { data: data.answers as Prisma.AnswerCreateManyInput } },
            userId: id,
          },
        },
      },
    })

    return reply.status(200).send({ data: updatedForm })
  } catch (err) {
    console.error("createResponseForForm error: ", err)
    return reply.status(500).send(ERRORS.internalServerError)
  }
}
