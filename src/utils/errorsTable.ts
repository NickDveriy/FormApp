export const ERRORS = {
  invalidToken: new Error("Invalid token"),
  missingToken: new Error("Missing token"),
  userExists: new Error("User already exists"),
  userNotExists: new Error("User not found"),
  userNotAuth: new Error("User not authenticated"),
  invalidCreds: new Error("Invalid email or password"),
  internalServerError: new Error("Internal Server Error"),
  forbiddenAccess: new Error("Forbidden"),
  formIsAnswered: new Error("You have already answered this form"),
}
