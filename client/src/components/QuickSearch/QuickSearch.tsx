import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './QuickSearch.module.scss';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../state/reducers';
import { getListings } from '../../state/actions/listingActions';
import { useHistory } from 'react-router';
import useSearchData from '../../hooks/useSearchData'

interface CarMakeInput {
   id: number | undefined,
   name: string
}

// interface LocationInput {
//    long: number,
//    lat: number,
//    distanceInKM: number,
// }

const QuickSearch: React.FC = () => {

   const history = useHistory();
   const dispatch = useDispatch();
   const { listings } = useSelector((state: State) => state.listing)

   const {
      carMake, carModel, carFuel, carPrices, registrationYears, carMileages, locations, distances } = useSearchData();

   const [carMakeInput, setCarMakeInput] = useState<CarMakeInput>({ id: undefined, name: '' });
   const [carModelInput, setCarModelInput] = useState<string>('')
   const [fuelTypeInput, setFuelTypeInput] = useState<string>('');
   const [priceInput, setPriceInput] = useState<string>('');
   const [registrationYearInput, setRegistrationYearInput] = useState<string>('');
   const [carMileageInput, setCarMileageInput] = useState<string>('')

   // it needs to be empty object string, otherwise JSON.parse() will throw error
   const [locationInput, setLocationInput] = useState<string>('{}');
   const [distanceInput, setDistanceInput] = useState<string>('10');

   const handleCarMakeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {

      if (!e.target.value) {
         setCarMakeInput({
            id: undefined,
            name: ''
         })

      }
      else {
         const carMakeByID = carMake.find(m => m.id == Number(e.target.value))

         setCarMakeInput({
            id: Number(e.target.value),
            name: String(carMakeByID?.name)
         })
      }

      // reset car model everytime after choosing a new car make
      setCarModelInput('');

   }

   const handleLocationSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {

      if (e.target.value === '') {
         setLocationInput("{}");
         setDistanceInput("")
         return;
      }

      setLocationInput(e.target.value);

   }

   const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {

      e.preventDefault();

      const locationObj = JSON.parse(locationInput)

      const listingQuery: any = {
         make: carMakeInput.name,
         model: carModelInput,
         first_registration: registrationYearInput,
         price: priceInput,
         mileage: carMileageInput,
         fuel: fuelTypeInput,
         long: locationObj.longitude,
         lat: locationObj.latitude,
         distanceInKM: distanceInput
      }


      let queryArray: string[] = [];

      Object.entries(listingQuery).forEach((obj, idx) => {
         // check if object key has value
         if (obj[1]) {
            queryArray.push(obj[0] + "=" + obj[1]);
         }
      })

      const preparedQuery: string = queryArray.join('&');

      console.log(preparedQuery);

      history.push(`/listings?${preparedQuery}`)
   }


   return (
      <div className={styles.QuickSearch}>
         <Container>
            <div className={styles.QuickSearch__box}>
               <div className={styles.QuickSearch__tabs}>
                  <p className={styles.tab}>Buy</p>
                  <p className={styles.tab}>Sell</p>
                  <p className={styles.tab}>Finance</p>
               </div>
               <form onSubmit={handleSearchFormSubmit}
                  className={styles.QuickSearch__form}
               >
                  <Row>
                     <Col xs={6} className={styles.Input__Col}>
                        <label htmlFor="make">Make</label>
                        <select id="make"
                           onChange={handleCarMakeSelectChange}
                           value={carMakeInput.id}
                        >
                           <option value="">Any</option>
                           {carMake.map(make => (
                              <option key={make.id} value={make.id}>{make.name}</option>
                           ))}
                        </select>
                     </Col>
                     <Col xs={6} className={styles.Input__Col}>

                        <label htmlFor="model">Model</label>
                        <select id="model"
                           onChange={e => setCarModelInput(e.target.value)}
                           value={carModelInput}
                           disabled={!carMakeInput.name}
                        >
                           <option value="">Any</option>
                           {carModel.map(model => (
                              carMakeInput.id === model.makeID &&
                              <option key={model.id} value={model.name}>{model.name}</option>
                           ))}
                        </select>

                     </Col>

                     <Col xs={6} className={styles.Input__Col}>

                        <label htmlFor="fuel_type">Fuel Type</label>
                        <select id="fuel_type"
                           onChange={e => setFuelTypeInput(e.target.value)}
                           value={fuelTypeInput}
                        >
                           <option value="">Any</option>
                           {carFuel.map((fuel, idx) => (
                              <option key={idx} value={fuel.type}>{fuel.type}</option>
                           ))}
                        </select>

                     </Col>

                     <Col xs={6} className={styles.Input__Col}>
                        <label htmlFor="price">Price Up To</label>
                        <select id="price"
                           onChange={e => setPriceInput(e.target.value)}
                           value={priceInput}
                        >
                           <option value="">Any</option>
                           {carPrices.map((price, idx) => (
                              <option key={idx} value={price}>{price} €</option>
                           ))}
                        </select>

                     </Col>

                     <Col xs={6} className={styles.Input__Col}>

                        <label htmlFor="registrationYear">1st registration from</label>
                        <select id="registrationYear"
                           onChange={e => setRegistrationYearInput(e.target.value)}
                           value={registrationYearInput}
                        >
                           <option value="">Any</option>
                           {registrationYears.map((year, idx) => (
                              <option key={idx} value={year}>{year}</option>
                           ))}
                        </select>

                     </Col>

                     <Col xs={6} className={styles.Input__Col}>

                        <label htmlFor="mileage">Mileage up to</label>
                        <select id="mileage"
                           onChange={e => setCarMileageInput(e.target.value)}
                           value={carMileageInput}
                        >
                           <option value="">Any</option>
                           {carMileages.map((mileage, idx) => (
                              <option key={idx} value={mileage}>{mileage}</option>
                           ))}
                        </select>

                     </Col>

                     <Col xs={6} className={styles.Input__Col}>

                        <label htmlFor="location">Select a location</label>

                        <select id="location"
                           onChange={handleLocationSelect} value={locationInput}
                        >
                           <option value="">Any</option>
                           {locations.map((location) => (
                              <option key={location._id} value={JSON.stringify(location)}>{location.city}</option>
                           ))}
                        </select>

                     </Col>

                     <Col xs={6} className={styles.Input__Col}>

                        <label htmlFor="distance">Radius from location</label>

                        <select
                           disabled={locationInput === '{}'} id="distance"
                           onChange={e => setDistanceInput(e.target.value)}
                           value={distanceInput}
                        >
                           {distances.map((distance, idx) => (
                              <option key={idx} value={distance}>{distance} km</option>
                           ))}
                        </select>

                     </Col>

                     <Col xs={12} className={styles.Input__Col}>

                        <button type="submit" className={styles.Form__submitBtn}>
                           <FaSearch className={styles.searchIcon} />
                           Search
                        </button>

                     </Col>

                  </Row>
               </form>
            </div>
         </Container>
      </div>
   )
}

export default QuickSearch
