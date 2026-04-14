import express from 'express';
import customersController from '../controllers/customersController.js';  

const router = express.Router();

router.route('/')
.get(customersController.getCustomers)

router.route('/:id')
.put(customersController.updateCustomer)
.delete(customersController.deleteCustomer);

export default router;