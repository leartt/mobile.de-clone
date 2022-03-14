import { FC, useEffect, useRef, useState } from "react"
import { Alert, Col, Container, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import useSearchData from "../../hooks/useSearchData";
import { State } from "../../state/reducers";

import { default as NumberFormat } from 'react-number-format';
import styles from "./CreateListing.module.scss"
import { createListing } from "../../state/actions/listingActions";
import { ActionType } from "../../state/action-types/listingTypes";

// import { RouteComponentProps } from "react-router"

// interface IMatchParams {
//    id: string
// }

// interface IProps extends RouteComponentProps<IMatchParams> {
//    name: string
// }

interface IFormInputs {
   car_make: string,
   car_model: string,
   first_registration: {
      year: number,
      month: string,
   },
   title: string,
   price: string,
   mileage: string,
   color: string,
   doors: string,
   category: string,
   fuel: string,
   engine: string,
   transmission: string,
   performance: {
      ps: string,
      kw: string
   },
   consumption: {
      combined: string,
      urban: string,
      extra_urban: string,
   },
   emission_class: string
   damaged: boolean,
   roadworthy: boolean,
   address: string
   location: {
      type: string,
      coordinates: number[]
   },
   images: any;
   extra_info: string
   userID: string
}


const CreateListing: FC = () => {


   const dispatch = useDispatch();
   const history = useHistory();

   const { carMake, carModel, carFuel, registrationYears, registrationMonths, locations } = useSearchData()

   const { user } = useSelector((state: State) => state.auth)
   const { request } = useSelector((state: State) => state.listing)

   const { register, watch, handleSubmit, reset, formState: { errors } } = useForm<IFormInputs>();


   console.log(watch('extra_info'));

   const handleListingFormSubmit: SubmitHandler<IFormInputs> = (data) => {
      console.log(data)

      const location = locations.find(loc => loc._id === data.address)

      console.log(location);


      const listingFormData = new FormData();
      try {

         listingFormData.set('car_make', data.car_make);
         listingFormData.set('car_model', data.car_model)
         listingFormData.set('mileage', data.mileage)
         listingFormData.set('doors', data.doors)
         listingFormData.set('title', data.title)
         listingFormData.set('category', data.category)
         listingFormData.set('fuel', data.fuel)
         listingFormData.set('price', data.price.replaceAll(',', '').replace('€', ''))
         listingFormData.set('engine', data.engine)
         listingFormData.set('first_registration.year', data.first_registration.year.toString())
         listingFormData.set('first_registration.month', data.first_registration.month)
         listingFormData.set('transmission', data.transmission)
         listingFormData.set('performance.ps', data.performance.ps)
         listingFormData.set('performance.kw', data.performance.kw)
         listingFormData.set('consumption.urban', data.consumption.urban)
         listingFormData.set('consumption.extra_urban', data.consumption.extra_urban)
         listingFormData.set('consumption.combined', data.consumption.combined)
         listingFormData.set('consumption.urban', data.consumption.extra_urban)
         listingFormData.set('color', data.color)
         listingFormData.set('emission_class', data.emission_class)
         listingFormData.set('roadworthy', data.roadworthy.toString())
         listingFormData.set('damaged', data.damaged.toString())
         listingFormData.set('address.city', location.city)
         listingFormData.set('address.country', location.country)
         listingFormData.set('location.coordinates[0]', location.longitude)
         listingFormData.set('location.coordinates[1]', location.latitude)
         Object.values(data.images).forEach((image: any) => {
            listingFormData.append('images', image, image.name)
         });
         listingFormData.set('extra_info', data.extra_info);
         listingFormData.set('user', data.userID);

         dispatch(createListing(listingFormData))

      } catch (error) {
         console.log(error)
      }
   }

   const resetForm = () => {
      reset()
   }

   useEffect(() => {
      if (request.success) {
         window.scroll(0, 0);
         resetForm();
      }
      if (request.error) {
         window.scroll(0, 0);
      }

   }, [request.success, request.error])

   useEffect(() => {
      console.log('hi')
      return () => {
         dispatch({ type: ActionType.LISTING_RESET_REQUEST_STATE_ACTION })
      }
   }, [])


   return (
      <div className={styles.CreateListing}>
         <Container>
            <form className={styles.CreateListing__form}
               onSubmit={handleSubmit(handleListingFormSubmit)}
            >
               {request.error && <Alert variant="danger">{request.error}</Alert>}
               {request.success && <Alert variant="success">{request.success}</Alert>}

               <Row>

                  <Col xs={12} className={styles.inputCol}>
                     <label htmlFor="make">Car Make</label>
                     <select id="make" {...register("car_make", {
                        required: "Please choose an option"
                     })}>
                        {carMake.map((make, idx) => (
                           <option key={idx} value={make.name}>{make.name}</option>
                        ))}
                     </select>
                     {errors.car_make && <span className={styles.validationError}>{errors.car_make.message}</span>}
                  </Col>

                  <Col xs={12}>
                     <label htmlFor="model">Car Model</label>
                     <select id="model" {...register("car_model", {
                        required: "Please choose an option"
                     })}>
                        {carModel.map(model => (
                           <option key={model.id} value={model.name}>{model.name}</option>
                        ))}
                     </select>
                     {errors.car_model && <span className={styles.validationError}>{errors.car_model.message}</span>}
                  </Col>

                  <Col xs={6}>
                     <label htmlFor="year">1st Registration</label>
                     <select id="year" {...register("first_registration.year", {
                        required: "Please select a year"
                     })}>
                        {registrationYears.map((year, idx) => (
                           <option key={idx} value={year}>{year}</option>
                        ))}
                     </select>
                     {errors.first_registration?.year && <span className={styles.validationError}>{errors.first_registration?.year.message}</span>}
                  </Col>

                  <Col xs={6}>
                     <label htmlFor="month">Month</label>
                     <select id="month" {...register("first_registration.month", {
                        required: "Please choose a month"
                     })}>
                        {registrationMonths.map((month, idx) => (
                           <option key={idx} value={month}>{month}</option>
                        ))}
                     </select>
                     {errors.first_registration?.month && <span className={styles.validationError}>{errors.first_registration.month.message}</span>}
                  </Col>

                  <Col xs={6}>
                     <label htmlFor="mileage">Mileage (km)</label>
                     <input type="number" {...register('mileage', {
                        required: "Please enter mileage"
                     })} />
                     {errors.mileage && <span className={styles.validationError}>{errors.mileage.message}</span>}
                  </Col>


                  <Row>
                     <label htmlFor="">Doors</label>
                     <Col xs={3}>
                        <div className={styles.radioController}>
                           <input {...register("doors", {
                              required: "Please choose an option"
                           })} type="radio" name="doors" value="2/3" />
                           <label htmlFor="">2/3</label>
                        </div>
                     </Col>
                     <Col xs={3}>
                        <div className={styles.radioController}>
                           <input {...register("doors", {
                              required: "Please choose an option"
                           })} type="radio" name="doors" value="4/5" />
                           <label htmlFor="">4/5</label>
                        </div>
                     </Col>
                     {errors.doors && <span className={styles.validationError}>{errors.doors.message}</span>}
                  </Row>


                  <Col xs={6}>
                     <label htmlFor="category">Category</label>
                     <select id="category" {...register("category", {
                        required: "Please select a category"
                     })}>
                        <option value="Sedan">Sedan</option>
                        <option value="Compact">Compact</option>
                        <option value="Estate">Estate</option>
                        <option value="SUV">SUV</option>
                     </select>
                     {errors.category && <span className={styles.validationError}>{errors.category.message}</span>}
                  </Col>

                  <Col xs={12}>
                     <label htmlFor="fuel">Fuel</label>
                     <select id="fuel" {...register("fuel", {
                        required: "Please choose an option"
                     })}>
                        {carFuel.map((fuel, idx) => (
                           <option key={idx} value={fuel.type}>{fuel.type}</option>
                        ))}
                     </select>
                     {errors.fuel && <span className={styles.validationError}>{errors.fuel.message}</span>}
                  </Col>

                  <Col xs={12}>
                     <label htmlFor="engine">Engine</label>
                     <select id="engine" {...register("engine", {
                        required: "Please choose an option"
                     })}>
                        <option value="3.0">3.0</option>
                        <option value="2.2">2.2</option>
                        <option value="2.0">2.0</option>
                        <option value="1.9">1.9</option>
                        <option value="1.6">1.6</option>
                        <option value="1.4">1.4</option>
                        <option value="1.2">1.2</option>
                     </select>
                     {errors.engine && <span className={styles.validationError}>{errors.engine.message}</span>}
                  </Col>


                  <Row>
                     <label htmlFor="">Is your car roadworthy and registered</label>
                     <Col xs={3}>
                        <div className={styles.radioController}>
                           <input {...register("roadworthy", {
                              required: 'Please choose an option'
                           })} type="radio" name="roadworthy" value="true" />
                           <label htmlFor="">YES</label>
                        </div>
                     </Col>
                     <Col xs={3}>
                        <div className={styles.radioController}>
                           <input {...register("roadworthy", {
                              required: 'Please choose an option'
                           })} type="radio" name="roadworthy" value="false" />
                           <label htmlFor="">NO</label>
                        </div>
                     </Col>
                     {errors.roadworthy && <span className={styles.validationError}>{errors.roadworthy.message}</span>}
                  </Row>

                  <Row>
                     <label htmlFor="">Is your car damaged</label>
                     <Col xs={3}>
                        <div className={styles.radioController}>
                           <input {...register("damaged", {
                              required: "Please choose an option"
                           })} type="radio" name="damaged" value="true" />
                           <label htmlFor="">YES</label>
                        </div>
                     </Col>
                     <Col xs={3}>
                        <div className={styles.radioController}>
                           <input {...register("damaged", {
                              required: "Please choose an option"
                           })} type="radio" name="damaged" value="false" />
                           <label htmlFor="">NO</label>
                        </div>
                     </Col>
                     {errors.damaged && <span className={styles.validationError}>{errors.damaged.message}</span>}
                  </Row>

                  <Col xs={6}>
                     <label htmlFor="color">Color</label>
                     <input type="text" {...register('color', {
                        required: "Please specify a color"
                     })} placeholder="Ex. red" />
                     {errors.color && <span className={styles.validationError}>{errors.color.message}</span>}
                  </Col>

                  <Col xs={12}>
                     <label htmlFor="transmission">Transmission</label>
                     <select id="transmission" {...register("transmission")}>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                     </select>
                     {errors.transmission && <span className={styles.validationError}>{errors.transmission.message}</span>}
                  </Col>

                  <Row>
                     <label htmlFor="">Performance (kw, hp)</label>
                     <Col xs={6}>
                        <input {...register("performance.kw", {
                           required: "Please provide kw"
                        })} type="number" placeholder="Performance in kW ex. 160 kW" />
                        {errors.performance?.kw && <span className={styles.validationError}>{errors.performance?.kw.message}</span>}
                     </Col>
                     <Col xs={6}>
                        <input {...register("performance.ps", {
                           required: "Please provide PS"
                        })} type="number"
                           placeholder="Performance in PS ex. 200 PS" />
                        {errors.performance?.ps && <span className={styles.validationError}>{errors.performance.ps.message}</span>}
                     </Col>
                  </Row>

                  <Row>
                     <label htmlFor="">Consumption</label>
                     <Col xs={4}>
                        <label>urban</label>
                        <input {...register("consumption.urban", {
                           required: 'Please type a number from 1 to 12'
                        })} type="number" placeholder="5.6" min="1" max="12" step="0.1"
                        />
                        {errors.consumption?.urban && <span className={styles.validationError}>{errors.consumption
                           .urban.message}</span>}
                     </Col>
                     <Col xs={4}>
                        <label>extra urban</label>
                        <input type="number" placeholder="5.7" min="1" max="12" step="0.1"
                           {...register("consumption.extra_urban", {
                              required: 'Please type a number from 1 to 12'
                           })}
                        />
                        {errors.consumption?.extra_urban && <span className={styles.validationError}>{errors.consumption
                           .extra_urban.message}</span>}
                     </Col>
                     <Col xs={4}>
                        <label>combined</label>
                        <input {...register("consumption.combined", {
                           required: 'Please type a number from 0 to 12'
                        })}
                           type="number"
                           placeholder="6.0" min="1" max="12" step="0.1"
                        />
                        {errors.consumption?.combined && <span className={styles.validationError}>{errors.consumption
                           .combined.message}</span>}
                     </Col>
                  </Row>

                  <Col xs={6}>
                     <label>Emission class</label>
                     <input {...register("emission_class")} placeholder="Euro 5" />
                     {errors.emission_class && <span className={styles.validationError}>{errors.emission_class.message}</span>}
                  </Col>

                  <Col xs={12}>
                     <label>Choose images</label>
                     <input type="file" multiple={true}
                        {...register("images", {
                           required: "Please choose images"
                        })}
                     />
                     {errors.images && <span className={styles.validationError}>
                        {errors.images.message}</span>}
                  </Col>

                  <Row>
                     <label>Where would you like to sell your car?</label>
                     <Col xs={6}>
                        <label htmlFor="city">City</label>
                        {locations?.length > 0 &&
                           <select id="city" {...register("address", {
                              required: 'Please choose a city'
                           })} >
                              {locations.map(location => (
                                 <option key={location._id} value={location._id}>{location.city}</option>
                              ))}
                           </select>
                        }
                        {errors.address && <span className={styles.validationError}>{errors.address.message}</span>}
                     </Col>

                     <Col xs={12}>
                        <label htmlFor="title">Title of your car listing</label>
                        <input type="text" id="title"
                           {...register("title", { required: "Please provide a title" })}
                        />
                        {errors.title && <span className={styles.validationError}>{errors.title.message}</span>}
                     </Col>

                     <Col xs={12}>
                        <label htmlFor="price">Price of your listing car</label>
                        <NumberFormat
                           {...register("price",
                              { required: "Please provide a price" })
                           }
                           thousandSeparator={true}
                           suffix=" €"
                           placeholder="For ex. 12,500 €"
                        />
                        {errors.price && <span className={styles.validationError}>
                           {errors.price.message}</span>}
                     </Col>

                     {user && <Row>
                        <label>Your informations</label>
                        <Col xs={6}>
                           <label htmlFor="first_name">First Name</label>
                           <input disabled type="text" id="first_name" value={user.first_name} />
                        </Col>

                        <Col xs={6}>
                           <label htmlFor="last_name">Last Name</label>
                           <input disabled type="text" id="last_name" value={user.last_name} />
                        </Col>

                        <Col xs={6}>
                           <label htmlFor="Email">Email</label>
                           <input disabled type="email" value={user.email} />
                        </Col>

                        <Col xs={6}>
                           <label htmlFor="">Phone</label>
                           <input disabled type="text" value={user.phone_number} />
                        </Col>

                        <input type="text" {...register("userID")} hidden value={user._id} />
                     </Row>}

                  </Row>


                  <Col xs={12}>
                     <button type="submit">Submit</button>
                  </Col>

               </Row>


            </form>
         </Container>
      </div >
   )
}

export default CreateListing
