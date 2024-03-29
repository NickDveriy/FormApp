import fastify from "fastify"
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import formbody from "@fastify/formbody"
import pino from "pino"
import userRouter from "./routers/user.router"
import formRouter from "./routers/form.router"
import { config } from "./utils/loadConfig"
import questionRouter from "./routers/question.router"
import responseRouter from "./routers/response.router"

const port = +config.PORT || 3000

export const server = fastify({
  logger: pino({ level: config.LOG_LEVEL }),
})

export const startServer = async () => {
  try {
    server.register(formbody)
    server.register(cors)
    server.register(helmet)
    server.register(userRouter, { prefix: "/api/user" })
    server.register(formRouter, { prefix: "/api/form" })
    server.register(questionRouter, { prefix: "/api/question" })
    server.register(responseRouter, { prefix: "/api/response" })

    server.get("/", (request, reply) => {
      reply.send({ name: "FormApp API" })
    })

    await server.listen({ port, host: "0.0.0.0" })
  } catch (err) {
    console.error("startServer error: ", err)
  }
}

process.on("unhandledRejection", (err) => {
  console.error("UnhandledRejection: ", err)
  process.exit(1)
})
