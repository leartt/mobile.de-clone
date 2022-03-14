import { FC, useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Location } from 'history';
import { State } from '../../state/reducers';
import { login } from '../../state/actions/authActions';
import axios from '../../axiosInstance';

import styles from "./Auth.module.scss";
import { ActionType } from '../../state/action-types/authTypes';

interface IFormInputs {
   email: string,
   password: string,
}


const Login: FC = () => {

   const dispatch = useDispatch();
   const history = useHistory();
   const location = useLocation<{ from: string, message: string }>();

   const { user, request, isLoggedIn } = useSelector((state: State) => state.auth)

   const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();

   const handleLoginSubmit: SubmitHandler<IFormInputs> = (data) => {

      const user = {
         email: data.email,
         password: data.password
      }

      dispatch(login(user))

   }

   useEffect(() => {
      return () => {
         dispatch({ type: ActionType.AUTH_RESET_REQUEST_STATE_ACTION })
      }
   }, [])

   return (
      <div className={styles.Login}>
         <Container className={styles.container}>

            {location.state?.message &&
               <Alert variant="warning" style={{ marginBottom: "20px" }}>{location.state.message}</Alert>}

            <form className={styles.Login__form} onSubmit={handleSubmit(handleLoginSubmit)}>
               <h1 className={styles.title}>Log in</h1>
               {request.error && <Alert variant="danger">{request.error}</Alert>}
               <div className={styles.inputControl}>
                  <input
                     placeholder="Enter your email"
                     {...register("email", {
                        required: 'Please enter your email',
                        pattern: {
                           value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, message: 'Please provide a valid email address'
                        }
                     })}
                  />
                  {errors.email && <span className={styles.validationError}>{errors.email.message}</span>}
               </div>

               <div className={styles.inputControl}>
                  <input type="password" placeholder="Enter your password"
                     {...register("password", {
                        required: 'Please enter your password',
                        minLength: {
                           value: 6, message: 'Please enter at least 6 characters'
                        }
                     }
                     )}
                  />
                  {errors.password && <span className={styles.validationError}>{errors.password.message}</span>}
               </div>
               <button type="submit">Login</button>

               <small>Don't have an account? You can create new one <Link to={'/signup'}>here.</Link></small>
            </form>
         </Container>
      </div>
   )
}

export default Login
