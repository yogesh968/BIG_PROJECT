import { Router } from 'express';
import { createReservation, getMyReservations, updateReservationStatus } from '../controllers/reservationController';

const router = Router();

router.post('/', createReservation);
router.get('/user/:customerId', getMyReservations);
router.patch('/:id/status', updateReservationStatus);

export default router;
