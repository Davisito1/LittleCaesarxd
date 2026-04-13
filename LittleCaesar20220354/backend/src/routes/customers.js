import express from 'express';
import customersController from '../controllers/customesController.js';  

const router = express.Router();

router.route('/')
.get(customersController.getCustomers)

.route('/:id')
.put(customersController.updateCustomer)
.delete(customersController.deleteCustomer);

export default router;