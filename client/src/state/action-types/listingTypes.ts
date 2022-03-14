export enum ActionType {
   GET_LISTINGS = "GET_LISTINGS",
   GET_SINGLE_LISTING = "GET_SINGLE_LISTING",
   CREATE_LISTING = "CREATE_LISTING",
   LISTING_REQUEST_ACTION = "LISTING_REQUEST_ACTION",
   LISTING_SUCCESS_ACTION = "LISTING_SUCCESS_ACTION",
   LISTING_FAILURE_ACTION = "LISTING_FAILURE_ACTION",
   LISTING_RESET_REQUEST_STATE_ACTION = "LISTING_RESET_REQUEST_STATE_ACTION"
}

interface GetListingsAction {
   type: ActionType.GET_LISTINGS,
   payload: {
      listings: any[]
   }
}

interface GetSingleListingsAction {
   type: ActionType.GET_SINGLE_LISTING,
   payload: {
      single_listing: any
   }
}


interface CreateListingAction {
   type: ActionType.CREATE_LISTING
}

interface ListingRequestAction {
   type: ActionType.LISTING_REQUEST_ACTION,
}

interface ListingSuccessAction {
   type: ActionType.LISTING_SUCCESS_ACTION,
   payload: string | null,
}

interface ListingFailureAction {
   type: ActionType.LISTING_FAILURE_ACTION,
   payload: string | null,
}

interface ListingResetRequestStateAction {
   type: ActionType.LISTING_RESET_REQUEST_STATE_ACTION
}

export type ListingAction =
   | GetListingsAction
   | GetSingleListingsAction
   | CreateListingAction
   | ListingRequestAction
   | ListingSuccessAction
   | ListingFailureAction
   | ListingResetRequestStateAction