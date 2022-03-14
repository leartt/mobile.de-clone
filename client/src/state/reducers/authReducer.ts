import axiosInstance from '../../axiosInstance'
import { AuthAction, ActionType } from '../action-types/authTypes'


interface AuthState {
   user: any;
   isLoggedIn: boolean;
   request: {
      loading: boolean,
      error: string | null,
      success: string | null,
   }
}

const initialState: AuthState = {
   user: null,
   isLoggedIn: !!localStorage.getItem('token'),
   request: {
      loading: false,
      error: null,
      success: null
   }
}

const authReducer = (state: AuthState = initialState, action: AuthAction) => {
   switch (action.type) {
      case ActionType.GET_PROFILE:
         return {
            ...state,
            user: action.payload.user,
         }
      case ActionType.LOGIN:
         return {
            ...state,
            user: action.payload.user,
            isLoggedIn: true
         }
      case ActionType.SIGNUP:
         return {
            ...state,
         }
      case ActionType.LOGOUT:
         return {
            ...state,
            user: null,
            isLoggedIn: false
         }

      case ActionType.AUTH_REQUEST_ACTION:
         return {
            ...state,
            request: {
               loading: true,
               error: null,
               success: null
            }
         }

      case ActionType.AUTH_SUCCESS_ACTION:
         return {
            ...state,
            request: {
               loading: false,
               error: null,
               success: action.payload
            }
         }

      case ActionType.AUTH_FAILURE_ACTION:
         return {
            ...state,
            request: {
               loading: false,
               error: action.payload,
               success: null
            }
         }

      case ActionType.AUTH_RESET_REQUEST_STATE_ACTION:
         return {
            ...state,
            request: {
               loading: false,
               error: null,
               success: null
            }
         }

      default:
         return state;
   }
}

export default authReducer;