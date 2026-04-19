import { Router } from 'express';
import { getAllRestaurants, getRestaurantById, createRestaurant } from '../controllers/restaurantController';

const router = Router();

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', createRestaurant);

export default router;
