import S from "fluent-json-schema"

export const createQuestionSchema = {
  body: S.object()
    .prop("formId", S.string().required())
    .prop("label", S.string().required())
    .prop("questionText", S.string().required()),
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
}
