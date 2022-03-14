import axios from '../../axiosInstance';
import { ActionType, AuthAction } from '../action-types/authTypes';
// import { Dispatch } from 'react'
import { Dispatch } from 'redux';

interface ILoginParams {
   email: string,
   password: string,
}

interface ISignUpParams {
   first_name: string,
   last_name: string,
   email: string,
   password: string,
   confirm_password: string,
   phone_number: string,
}

export const login = (user: ILoginParams) => {

   return async (dispatch: Dispatch<AuthAction>) => {

      try {

         dispatch({
            type: ActionType.AUTH_REQUEST_ACTION,
         })

         const res = await axios.post('/api/users/login', user);

         if (res.data.success) {

            const token: string = res.data.token;
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log(axios.defaults.headers.common['Authorization']);


            dispatch({
               type: ActionType.LOGIN,
               payload: {
                  user: res.data.user,
               }
            })

            dispatch({
               type: ActionType.AUTH_SUCCESS_ACTION,
               payload: res.data.message || null
            })
         }

      } catch (error) {
         dispatch({
            type: ActionType.AUTH_FAILURE_ACTION,
            payload: error.response?.data?.message || error.message
         })
      }
   }

}

export const signup = (user: ISignUpParams) => {

   return async (dispatch: Dispatch<AuthAction>) => {

      try {

         dispatch({
            type: ActionType.AUTH_REQUEST_ACTION,
         })

         const res = await axios.post('/api/users/signup', user);

         if (res.data.success) {

            dispatch({
               type: ActionType.SIGNUP,
            })

            dispatch({
               type: ActionType.AUTH_SUCCESS_ACTION,
               payload: res.data.message || null
            })
         }

      } catch (error) {
         dispatch({
            type: ActionType.AUTH_FAILURE_ACTION,
            payload: error?.response?.data.message || error.message
         })
      }
   }

}

export const getProfile = () => {

   return async (dispatch: Dispatch<AuthAction>) => {

      try {

         dispatch({
            type: ActionType.AUTH_REQUEST_ACTION,
         })

         const res = await axios.get('/api/users/profile');

         if (res.data.success) {


            dispatch({
               type: ActionType.GET_PROFILE,
               payload: {
                  user: res.data.user
               }
            })

            dispatch({
               type: ActionType.AUTH_SUCCESS_ACTION,
               payload: res.data.message || null
            })
         }

      } catch (error) {
         dispatch({
            type: ActionType.AUTH_FAILURE_ACTION,
            payload: error.response?.data?.message || error.message
         })
      }
   }

}

export const logout = (): any => {
   try {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      return {
         type: ActionType.LOGOUT,
      }
   } catch (error) {
      console.log(error);
   }
}