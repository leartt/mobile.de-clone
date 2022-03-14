import { ActionType, ListingAction } from '../action-types/listingTypes'

interface ListingState {
   listings: any[],
   single_listing: any
   request: {
      loading: boolean,
      error: string | null,
      success: string | null,
   }
}

const initialState: ListingState = {
   listings: [],
   single_listing: null,
   request: {
      loading: false,
      error: null,
      success: null
   }
}

const listingReducer = (state: ListingState = initialState, action: ListingAction) => {
   switch (action.type) {
      case ActionType.GET_LISTINGS:
         return {
            ...state,
            listings: action.payload.listings
         }
      case ActionType.GET_SINGLE_LISTING:
         return {
            ...state,
            single_listing: action.payload.single_listing
         }

      case ActionType.LISTING_REQUEST_ACTION:
         return {
            ...state,
            request: {
               loading: true,
               error: null,
               success: null
            }
         }

      case ActionType.LISTING_SUCCESS_ACTION:
         return {
            ...state,
            request: {
               loading: false,
               error: null,
               success: action.payload
            }
         }

      case ActionType.LISTING_FAILURE_ACTION:
         return {
            ...state,
            request: {
               loading: false,
               error: action.payload,
               success: null
            }
         }

      case ActionType.LISTING_RESET_REQUEST_STATE_ACTION:
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

export default listingReducer;