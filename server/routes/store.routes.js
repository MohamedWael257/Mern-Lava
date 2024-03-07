const express = require("express");
const { checkout, ordersData } = require("../controllers/store.controller");
const router = express.Router();

router.post('/checkout', checkout);
router.get('/ordersdata', ordersData);
module.exports = router