import fastify from "fastify"
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import formbody from "@fastify/formbody"
import pino from "pino"
import userRouter from "./routers/user.router"
import formRouter from "./routers/form.router"
import { config } from "./utils/loadConfig"

const port = config.PORT || 3030

const startServer = async () => {
  try {
    const server = fastify({
      logger: pino({ level: config.LOG_LEVEL }),
    })
    server.register(formbody)
    server.register(cors)
    server.register(helmet)
    server.register(userRouter, { prefix: "/api/user" })
    server.register(formRouter, { prefix: "/api/form" })

    await server.listen({ port })
  } catch (e) {
    console.error(e)
  }
}

process.on("unhandledRejection", (e) => {
  console.error(e)
  process.exit(1)
})

startServer()
