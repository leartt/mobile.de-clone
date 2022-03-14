import React, { useState, useEffect, useMemo } from 'react'
import axios from '../axiosInstance';

interface CarMake {
   id: number,
   name: string
}

interface CarModel {
   id: number,
   name: string,
   makeID: CarMake['id'] | number
}


const useSearchData = () => {

   const [carMake] = useState<CarMake[]>([
      { id: 1, name: 'Volkswagen' },
      { id: 2, name: 'Audi' },
      { id: 3, name: 'Mercedes-Benz' },
      { id: 4, name: 'BMW' },
   ])

   const [carModel] = useState<CarModel[]>([
      { id: 1, name: 'Polo', makeID: 1, },
      { id: 2, name: 'Golf', makeID: 1, },
      { id: 3, name: 'Tiguan', makeID: 1, },
      { id: 4, name: 'A3', makeID: 2, },
      { id: 5, name: 'A4', makeID: 2, },
      { id: 6, name: 'A6', makeID: 2, },
      { id: 7, name: 'E-Class', makeID: 3 },
      { id: 8, name: 'B-Class', makeID: 3 },
      { id: 9, name: 'S-Class', makeID: 3 },
      { id: 10, name: '3 Series', makeID: 4 },
      { id: 11, name: '5 Series', makeID: 4 },
      { id: 12, name: '7 Series', makeID: 4 },
   ])

   const [carFuel] = useState<{ type: string }[]>([
      { type: 'Diesel' },
      { type: 'Petrol' },
      { type: 'Electric' },
      { type: 'Hybrid' },
   ])

   const [carPrices] = useState<number[]>([500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 30000, 50000, 70000, 90000])

   const [carMileages] = useState<number[]>(
      [
         10000, 20000, 30000, 40000, 50000, 100000, 150000, 200000,
         250000, 300000, 350000, 400000
      ]
   )


   const getRegistrationYears = (): number[] => {
      return Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)
   }

   const [registrationYears] = useState<number[]>(getRegistrationYears());

   const [registrationMonths] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

   const [locations, setLocations] = useState<any[]>([]);

   const [distances] = useState<number[]>([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150]);

   const getLocations = (): Promise<any[]> => {
      return new Promise(async (resolve, reject) => {
         try {
            const res = await axios.get('/api/locations');
            if (res.data.success) {
               resolve(res.data.locations);
            }
         } catch (error) {
            reject('Failed while fetching locations')
         }
      })
   }

   useEffect(() => {

      let _mounted = true;

      getLocations().then(data => {
         if (_mounted) {
            setLocations(data)
         }
      }).catch(err => console.log(err));

      return () => {
         _mounted = false;
      }
   }, [])


   return { carMake, carModel, carFuel, carPrices, registrationYears, registrationMonths, carMileages, locations, distances }
}

export default useSearchData
