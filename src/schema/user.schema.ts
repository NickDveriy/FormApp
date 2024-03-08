import S from "fluent-json-schema"

export const loginSchema = {
  body: S.object().prop("email", S.string().required()).prop("password", S.string().minLength(6).required()),
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
}

export const signupSchema = {
  body: S.object()
    .prop("email", S.string().required())
    .prop("password", S.string().minLength(6).required())
    .prop("firstName", S.string().required())
    .prop("lastName", S.string().required()),
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
}
