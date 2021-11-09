import { LoginRequest, RegistrationRequest } from "../client";
import { AUTH_API } from "../client/client";

export function loginCall(loginRequest: LoginRequest) {
  return AUTH_API.login(loginRequest).then(res => res.data)
}

export function getCurrentUserCall() {
  return AUTH_API.getCurrentUser().then(res => res.data)
}

export function logoutCall() {
  return AUTH_API.logout()
}

export function registerCall(registrationRequest: RegistrationRequest) {
  return AUTH_API.register(registrationRequest).then(res => res.data)
}
