import S from "fluent-json-schema"

export * from "./user.schema"
export * from "./form.schema"
export * from "./question.schema"
export * from "./response.schema"

export const idSchema = {
  queryString: S.object().prop("id", S.string().required()),
  params: S.object(),
  headers: S.object(),
}
