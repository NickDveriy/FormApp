import S from "fluent-json-schema"

export * from "./user.schema"
export * from "./form.schema"

export const idSchema = {
  queryString: S.object().prop("id", S.string().required()),
  params: S.object(),
  headers: S.object(),
}
