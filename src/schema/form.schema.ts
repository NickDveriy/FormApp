import S from "fluent-json-schema"

export const createFormSchema = {
  body: S.object().prop("title", S.string().required()),
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
}
