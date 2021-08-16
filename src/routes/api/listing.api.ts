import express from 'express';
import listingController from "../../controllers/listing.controller";

const router = express.Router();


router.get('/', listingController.getListings);
router.post('/', listingController.createListing);

export default router;