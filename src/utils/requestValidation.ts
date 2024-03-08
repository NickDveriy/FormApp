import { FastifyReply } from "fastify"
import { prismaClient } from "./utils"
import { IUserRequest } from "../interfaces/user.interface"
import { ERRORS } from "./errorsTable"
import * as JWT from "jsonwebtoken"
import { config } from "./loadConfig"

export const authUser = async (request: IUserRequest, reply: FastifyReply) => {
  try {
    let token = request.headers.authorization
    token = token?.replace("Bearer ", "")

    if (!token) {
      return reply.code(401).send(ERRORS.missingToken)
    }

    const user: any = JWT.verify(token, config.APP_JWT_SECRET)

    if (!user.id) {
      return reply.code(401).send(ERRORS.userNotAuth)
    }

    const userData = await prismaClient.user.findUnique({ where: { id: user.id } })

    if (!userData) {
      return reply.code(401).send(ERRORS.userNotExists)
    }
    request.authUser = userData
  } catch (err) {
    return reply.code(401).send(err)
  }
}

export const checkIfUserIsAdmin = async (request: IUserRequest, reply: FastifyReply) => {
  if (request.authUser?.role !== "ADMIN") {
    return reply.code(403).send(ERRORS.forbiddenAccess)
  }
}
