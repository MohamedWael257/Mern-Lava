const Testimonial = require("../models/testimonial.model");
const User = require("../models/user.model");
// const User = require('../models/user.model')
const send_testimonial = async (req, res) => {
    const { firstname, lastname, email, phone, message, date } = req.body;
    try {
        const oldUser = User.find({ email })
        if (!oldUser) {
            return res.json({ error: "User Exists" });
        }
        await Testimonial.create({
            firstname,
            lastname,
            email,
            phone,
            message,
            date,
            // photoimage:oldUser.phone,
        });
        res.send({ status: "Sending successful" });
    }
    catch (error) {
        res.send({ status: "Error Sending" });
    }
}
// const testimonialData = async (req, res) => {
// const { userID } = req.body;
// try {
// const allTestimonial = await Testimonial.find({})
// const allTestimonial = await Testimonial.find({
//     'senderId':
//     {
//         $in: [`${userID}`]
//     }
// });
//         res.send({ status: "ok", data: allTestimonial });
//     } catch (error) {
//         res.send(error);
//         // res.status(500).json({ message: 'Failed to retrieve Testimonial' });
//     }
// }
// const clear_testimonial = async (req, res) => {
//     const { userid, selectedid } = req.body;
//     try {
//         await Testimonial.deleteMany({ 'senderId': { $in: [`${userid}`, `${selectedid}`] }, 'receiverId': { $in: [`${userid}`, `${selectedid}`] } });

//         // Testimonial.deleteMany({ senderId: { $in: [userid, selectedid] } }, function (err, res) {
//         //     console.log(err);
//         // });
//         // Testimonial.deleteMany({ senderId: { $nin: [userid, selectedid] } }, function (err, res) {
//         //     console.log(err);
//         // });
//         res.send({ status: "Ok", data: "Deleted" });
//     } catch (error) {
//         res.send({ status: "Error", data: 'Failed to Clearing Testimonial' });
//     }
// }
module.exports = { send_testimonial }