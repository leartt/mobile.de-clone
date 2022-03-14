

export enum ActionType {
   LOGIN = "LOGIN",
   SIGNUP = "SIGNUP",
   LOGOUT = "LOGOUT",
   GET_PROFILE = "GET_PROFILE",
   AUTH_REQUEST_ACTION = "AUTH_REQUEST_ACTION",
   AUTH_SUCCESS_ACTION = "AUTH_SUCCESS_ACTION",
   AUTH_FAILURE_ACTION = "AUTH_FAILURE_ACTION",
   AUTH_RESET_REQUEST_STATE_ACTION = "AUTH_RESET_REQUEST_STATE_ACTION"
}

interface GetProfile {
   type: ActionType.GET_PROFILE,
   payload: {
      user: any
   }
}

interface LoginAction {
   type: ActionType.LOGIN,
   payload: {
      user: any,
   }
}

interface SignUpAction {
   type: ActionType.SIGNUP,
}

interface LogoutAction {
   type: ActionType.LOGOUT
}

interface AuthRequestAction {
   type: ActionType.AUTH_REQUEST_ACTION,
}

interface AuthSuccessAction {
   type: ActionType.AUTH_SUCCESS_ACTION,
   payload: string | null,
}

interface AuthFailureAction {
   type: ActionType.AUTH_FAILURE_ACTION,
   payload: string | null,
}


interface AuthResetRequestStateAction {
   type: ActionType.AUTH_RESET_REQUEST_STATE_ACTION
}


export type AuthAction =
   | GetProfile
   | LoginAction
   | SignUpAction
   | LogoutAction
   | AuthRequestAction
   | AuthSuccessAction
   | AuthFailureAction
   | AuthResetRequestStateAction