import express from 'express';
import locationController from "../../controllers/location.controller";

const router = express.Router();

router.get('/', locationController.getLocations);
router.post('/', locationController.createLocation);

export default router;