import S from "fluent-json-schema"

export const createResponseSchema = {
  body: S.object().prop("formId", S.number().required()).prop("answers", S.array().required()),
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
}
