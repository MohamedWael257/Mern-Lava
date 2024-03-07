const express = require("express");
const { booking, bookingData } = require("../controllers/booking.controller");
const router = express.Router();

router.post('/booking', booking);
router.get('/bookingdata', bookingData);

module.exports = router