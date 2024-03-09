import { log } from "console"
import { startServer, server } from "../../src/server"
import { config } from "../../src/utils/loadConfig"
import request from "supertest"

const serverURL = `http://localhost:${config.PORT}`
let newFormId

beforeAll(async () => {
  await startServer()
})

afterAll(() => {
  server.close()
})

afterAll(() => {
  server.close()
})

describe("Form API test", () => {
  it("GET /list should return '401' statusCode for unauthorized request", async () => {
    const response = await request(serverURL).get("/api/form/list")
    expect(response.statusCode).toBe(401)
  })

  it("POST /create should create a new form for logged-in user with role ADMIN", async () => {
    const { body } = await request(serverURL).post("/api/user/login").send({
      email: "test@email.com",
      password: "111111",
    })

    const {
      statusCode,
      body: {
        data: { id, title },
      },
    } = await request(serverURL)
      .post("/api/form/create")
      .set({
        Authorization: `Bearer ${body.token}`,
      })
      .send({
        title: "Test Form",
        questions: [
          {
            label: "Personal",
            questionText: "What is your name?",
            type: "String",
          },
        ],
      })

    newFormId = id

    expect(statusCode).toBe(200)
    expect(title).toBe("Test Form")
  })

  it("GET /:id should return proper form", async () => {
    const { body } = await request(serverURL).post("/api/user/login").send({
      email: "test@email.com",
      password: "111111",
    })

    const {
      statusCode,
      body: {
        data: { title },
      },
    } = await request(serverURL)
      .get(`/api/form/${newFormId}`)
      .set({
        Authorization: `Bearer ${body.token}`,
      })
    expect(statusCode).toBe(200)
    expect(title).toBe("Test Form")
  })
})
