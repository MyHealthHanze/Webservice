import express from 'express';
var router = express.Router();

import models from '../models/index';
import auth from '../helpers/auth';
import response from '../helpers/response';

var Bills = models.Bills;
var Orders = models.Orders;

router.get('/', auth.isAuthenticated, (req, res) => {
    // Get all the bills with the orders in one query
    Bills
        .findAll({
            where: {
                userId: req.user.id
            },
            include: [{
                model: Orders,
                as: 'orders'
            }]
        })
        .then((bills) => {
            return response('', bills, res);
        });
});

export default router;