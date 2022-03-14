// import { Dispatch } from "redux";
import { Dispatch } from "redux";
import { setTimeout } from "timers";
import axios from "../../axiosInstance";
import { ListingAction, ActionType } from "../action-types/listingTypes";

interface SearchQuery {
   make: string,
   model: string,
   fuel: string
   price: number | string,
   first_registration: number | string,
   mileage: number | string,
   long: number | string,
   lat: number | string,
   distanceInKM: number | string,
}


export const getListings = (query: SearchQuery) => {

   return async (dispatch: Dispatch<ListingAction>) => {

      try {

         dispatch({
            type: ActionType.LISTING_REQUEST_ACTION,
         })


         let queryArray: string[] = [];
         Object.entries(query).forEach((el, idx) => {
            if (el[1]) {
               queryArray.push(`${el[0]}=${el[1]}`);
            }
         })

         const preparedQuery: string = queryArray.join('&');

         const res = await axios.get(`/api/listings?${preparedQuery}`);

         if (res.data.success) {

            dispatch({
               type: ActionType.GET_LISTINGS,
               payload: {
                  listings: res.data.listings,
               }
            })

            dispatch({
               type: ActionType.LISTING_SUCCESS_ACTION,
               payload: res.data.message ? res.data.message : null
            })

         }

      } catch (error) {
         dispatch({
            type: ActionType.LISTING_FAILURE_ACTION,
            payload: error.response?.data?.message || error.message
         })
      }
   }

}

export const getListingByID = (id: string) => {

   return async (dispatch: Dispatch<ListingAction>) => {

      try {

         dispatch({
            type: ActionType.LISTING_REQUEST_ACTION,
         })

         const res = await axios.get(`/api/listings/${id}`);

         if (res.data.success) {

            dispatch({
               type: ActionType.GET_SINGLE_LISTING,
               payload: {
                  single_listing: res.data.listing,
               }
            })

            dispatch({
               type: ActionType.LISTING_SUCCESS_ACTION,
               payload: res.data.message ? res.data.message : null
            })

         }

      } catch (error) {
         dispatch({
            type: ActionType.LISTING_FAILURE_ACTION,
            payload: error.response.data.message || error.message
         })
      }
   }

}

export const createListing = (listing: FormData) => {
   return async (dispatch: Dispatch<ListingAction>) => {

      try {

         dispatch({
            type: ActionType.LISTING_REQUEST_ACTION,
         })

         const res = await axios.post('/api/listings', listing);

         if (res.data.success) {

            dispatch({
               type: ActionType.LISTING_SUCCESS_ACTION,
               payload: res.data.message ? res.data.message : "Listing has been successfully added."
            })

         }

      } catch (error) {
         dispatch({
            type: ActionType.LISTING_FAILURE_ACTION,
            payload: error.response?.data?.message || error.message
         })
      }
   }
}