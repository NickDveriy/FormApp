import { startServer, server } from "../../src/server"
import { config } from "../../src/utils/loadConfig"
import request from "supertest"

const serverURL = `http://localhost:${config.PORT}`

beforeAll(async () => {
  await startServer()
})

afterAll(() => {
  server.close()
})

afterAll(() => {
  server.close()
})

describe("User API test", () => {
  it("POST /login should return '200' statusCode for valid credentials", async () => {
    const response = await request(serverURL).post("/api/user/login").send({
      email: "simple@email.com",
      password: "654321",
    })
    expect(response.statusCode).toBe(200)
  })
  it("POST /login should return '204' statusCode for non-existed user", async () => {
    const response = await request(serverURL).post("/api/user/login").send({
      email: "non-existed@email.com",
      password: "654321",
    })
    expect(response.statusCode).toBe(204)
  })
  it("POST /login should return '401' statusCode for wrong password", async () => {
    const response = await request(serverURL).post("/api/user/login").send({
      email: "simple@email.com",
      password: "wrongPassword",
    })
    expect(response.statusCode).toBe(401)
  })
})
