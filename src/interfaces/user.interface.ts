import { FastifyRequest } from "fastify"
import { Prisma, User } from "@prisma/client"

export interface IUserRequest extends FastifyRequest {
  body: Prisma.UserCreateInput
  authUser: User
}
