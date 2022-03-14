import { useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ActionType } from '../../state/action-types/authTypes';
import { signup } from '../../state/actions/authActions';
import { State } from '../../state/reducers';
import { default as NumberFormat } from 'react-number-format';

import styles from "./Auth.module.scss";

interface IFormInputs {
   first_name: string,
   last_name: string,
   email: string,
   password: string,
   confirm_password: string
   phone_number: string,
}

const Signup = () => {

   const dispatch = useDispatch();
   const history = useHistory();

   const { request } = useSelector((state: State) => state.auth)

   const { register, watch, handleSubmit, reset, formState: { errors } } = useForm<IFormInputs>();


   const handleSignupSubmit: SubmitHandler<IFormInputs> = (data) => {
      const user = {
         first_name: data.first_name,
         last_name: data.last_name,
         email: data.email,
         password: data.password,
         confirm_password: data.confirm_password,
         phone_number: data.phone_number
      }

      dispatch(signup(user))

   }

   const resetForm = () => {
      //reset form if user registration is successful
      if (request.success) {
         reset();
      }
   }

   useEffect(() => {
      resetForm();
   }, [request.success])

   useEffect(() => {
      return () => {
         dispatch({ type: ActionType.AUTH_RESET_REQUEST_STATE_ACTION })
      }
   }, [])

   return (
      <div className={styles.Signup}>
         <Container className={styles.container}>

            <form className={styles.Signup__form} onSubmit={handleSubmit(handleSignupSubmit)}>
               <h1 className={styles.title}>Sign up</h1>

               {request.error && <Alert variant="danger">{request.error}</Alert>}
               {request.success &&
                  <Alert variant="success">
                     {request.success}. You can <Link to="/login">Login</Link> now.
                  </Alert>}

               <div className={styles.inputControl}>
                  <input
                     placeholder="Enter your first name"
                     {...register("first_name", {
                        required: 'Please enter your first name',
                     })}
                  />
                  {errors.first_name && <span className={styles.validationError}>{errors.first_name.message}</span>}
               </div>

               <div className={styles.inputControl}>
                  <input
                     placeholder="Enter your last name"
                     {...register("last_name", {
                        required: 'Please enter your last name',
                     })}
                  />
                  {errors.last_name && <span className={styles.validationError}>{errors.last_name.message}</span>}
               </div>

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
                           value: 5, message: 'Please enter at least 6 characters'
                        }
                     }
                     )}
                  />
                  {errors.password && <span className={styles.validationError}>{errors.password.message}</span>}
               </div>

               <div className={styles.inputControl}>
                  <input type="password" placeholder="Enter your confirm password"
                     {...register("confirm_password", {
                        required: true,
                        validate: (value: string) => {
                           return value === watch("password")
                        },
                     }
                     )}
                  />
                  {errors.confirm_password && <span className={styles.validationError}>Password should match</span>}
               </div>

               <div className={styles.inputControl}>
                  <NumberFormat format="+49 ### #######" mask="_"
                     placeholder="For ex. +49 123 1234567"
                     {...register("phone_number", {
                        required: 'Please enter a phone number'
                     })}
                  />
                  {errors.phone_number && <span className={styles.validationError}>
                     {errors.phone_number.message}</span>}
               </div>

               <button type="submit">Sign up</button>

               <small>Already have an account? Login in <Link to={'/login'}>here.</Link></small>
            </form>
         </Container>
      </div >
   )
}

export default Signup
