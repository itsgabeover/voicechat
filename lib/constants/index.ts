export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Voice Analysis"
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Voice chat with your life insurance policy"
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4
export const signInDefaultValues = {
  email: "",
  password: "",
}
export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}