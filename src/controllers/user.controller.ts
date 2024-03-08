import { FastifyReply } from "fastify"
import { IUserRequest } from "../interfaces/user.interface"
import { prismaClient, utils } from "../utils/utils"
import { ERRORS } from "../utils/errorsTable"
import * as JWT from "jsonwebtoken"
import { config } from "../utils/loadConfig"

export const login = async (request: IUserRequest, reply: FastifyReply) => {
  try {
    const { email, password } = request.body
    const user = await prismaClient.user.findUnique({ where: { email: email } })
    if (!user) {
      return reply.code(400).send(ERRORS.userNotExists)
    }
    const isValidPassword = await utils.compareHash(password, user.password)
    if (!isValidPassword) {
      return reply.code(400).send(ERRORS.invalidCreds)
    }

    const token = JWT.sign(
      {
        id: user.id,
        email: user.email,
      },
      config.APP_JWT_SECRET,
    )
    return reply.code(200).send({
      token,
      user: { ...user, password: null },
    })
  } catch (err) {
    console.error("login error: ", err)
    return reply.status(500).send(ERRORS.internalServerError)
  }
}

export const signUp = async (request: IUserRequest, reply: FastifyReply) => {
  try {
    const { email, password, firstName, lastName } = request.body
    const user = await prismaClient.user.findUnique({ where: { email: email } })
    if (user) {
      return reply.code(409).send(ERRORS.userExists)
    }
    const hashPass = await utils.generateSalt(10, password)
    const newUser = await prismaClient.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: String(hashPass),
      },
    })
    const token = JWT.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      config.APP_JWT_SECRET,
    )
    return reply.code(200).send({
      token,
      user: { ...newUser, password: null },
    })
  } catch (err) {
    console.error("signUp error: ", err)
    return reply.status(500).send(ERRORS.internalServerError)
  }
}

export const listUsers = async (request: IUserRequest, reply: FastifyReply) => {
  try {
    const data = await prismaClient.user.findMany()
    return reply.code(200).send({ data })
  } catch (err) {
    console.error("listUsers error: ", err)
    return reply.status(500).send(ERRORS.internalServerError)
  }
}
