const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const Chats = require("../models/chats.model.js");
const Orders = require('../models/orders.model.js')
const Booking = require('../models/booking.model.js')
const Image = require('../models/Image.model.js')
const generateTokenAndSetCookie = require("../utils/generateToken.js");
const jwt = require('jsonwebtoken');
const JWT_SECRET = `${process.env.JWT_SECREET}`;
const crypto = require("crypto");
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const nodemailer = require("nodemailer");

const register = async (req, res) => {
    const { username, email, phone, password, photoimage } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldEmail = await User.findOne({ email });
        if (oldEmail) {
            return res.json({ status: 'Email Exists' });
        }
        const oldUser = await User.findOne({ username });
        if (oldUser) {
            return res.json({ status: 'User Exists' });
        }
        const oldPhone = await User.findOne({ phone });
        if (oldPhone) {
            return res.json({ status: 'Phone Exists' });
        }
        await User.create({
            fullname: "",
            username,
            email,
            phone,
            password: encryptedPassword,
            address: "",
            gender: "",
            photoimage,
        });

        res.json({ status: "ok" });
    }
    catch (error) {
        res.json({ status: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        // generateTokenAndSetCookie(user._id, res);

        const token = jwt.sign({ email: user.email }, JWT_SECRET, {
            expiresIn: "15d",
        });
        if (user.__v === 0) {
            const url = `http://localhost:5000/api/auth/verify/${token}`
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false,
                // pool: true,
                auth: {
                    // adarsh438tcsckandivali
                    user: process.env.SMTP_MAIL,
                    pass: process.env.SMTP_PASS,
                },
            });
            const mailOptions = {
                to: email,
                subject: 'Verify Account',
                html: `Click <a href = '${url}'>here</a> to confirm your email.`
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.json(error);
                }
                else {
                    res.json(`Email sent: ${email}` + info.response);
                }
            });
            return res.json({ status: "verfy your email first before login" });
        }
        else {
            return res.json({ status: "ok", data: token });
        }

    }
    res.json({ status: "error", error: "InvAlid Password" });
}
const verify = async (req, res) => {
    const { token } = req.params
    // Check we have an id
    if (!token) {
        return res.send({
            message: "Missing Token"
        });
    }

    // Step 1 -  Verify the token from the URL
    let payload = null;
    try {
        payload = jwt.verify(token, JWT_SECRET);
        // res.json(payload)
    }
    catch (err) {
        return res.send(err);
    }
    try {
        // Step 2 - Find user with matching ID
        const user = await User.findOne({ email: payload.email }).exec();
        if (!user) {
            return res.send({
                message: "User does not  exists"
            });
        }
        //     // Step 3 - Update user verification status to true
        // res.json(user)
        user.__v = 1;
        await user.save();
        return res.send({
            message: "Account Verified"
        });
    }
    catch (err) {
        return res.send(err);
    }
}
const userData = async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });
        console.log(user);
        if (user == "token expired") {
            return res.send({ status: "error", data: "token expired" });
        }

        const useremail = user.email;
        User.findOne({ email: useremail })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    }
    catch (error) { }
};
const forgot_password = async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "5m",
        });
        const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            // pool: true,
            auth: {
                // adarsh438tcsckandivali
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASS,
            },
        });
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: oldUser.email,
            subject: "Password Reset",
            text: link,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.json(error);
            }
            else {
                res.json(`Email sent: ${oldUser.email}` + info.response);
            }
        });
        // res.json({ status: "ok", link: link })
    } catch (error) {
        res.json({ status: error })
    }
};
const reset_password_id_token_get = async (req, res) => {
    const { id, token } = req.params;
    // console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    try {
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        // const secret = JWT_SECRET + oldUser.password;
        const url = `http://localhost:5173/Resetpassword/${id}/${token}`
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            // pool: true,
            auth: {
                // adarsh438tcsckandivali
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASS,
            },
        });
        const mailOptions = {
            to: oldUser.email,
            subject: 'Verify Account',
            html: `Click <a href = '${url}'>here</a> to reset ypur password.`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.json(error);
            }
            else {
                res.json(`Email sent: ${email}` + info.response);
            }
        });
        return res.json({ status: "verfy your email first before login" });
        // const verify = jwt.verify(token, secret);
        // res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
        console.log(error);
        // res.json({ status: "Not Verified" });
    }
};
const reset_password_id_token_post = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    const oldUser = await User.findOne({ _id: id });
    try {
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        // const secret = JWT_SECRET + oldUser.password;
        // const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );
        res.json({ status: "Success" });
        // res.render("index", { email: verify.email, status: "verified" });
    }
    catch (error) {
        console.log(error);
        res.json({ status: "Something Went Wrong" });
    }
};
const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find({});
        res.send({ status: 'ok', data: allUser });
    } catch (error) {
        console.log(error);
    }
};
const getAllUser_no_admin = async (req, res) => {
    try {
        const allUser = await User.find({ "email": { $nin: ["admin@gmail.com"] } });
        res.send({ status: "ok", data: allUser });
    } catch (error) {
        res.send(error);
    }
};
const getAdmin = async (req, res) => {
    try {
        const allUser = await User.find({ "email": { $in: ["admin@gmail.com"] } });
        res.send({ status: "ok", data: allUser });
    } catch (error) {
        console.log(error);
    }
};
const deleteUser = async (req, res) => {
    const { userid } = req.body;
    try {
        User.deleteOne({ _id: userid }, function (err, res) {
            console.log(err);
        });
        Chats.deleteMany({ senderId: userid }, function (err, res) {
            console.log(err);
        });
        Chats.deleteMany({ receiverId: userid }, function (err, res) {
            console.log(err);
        });
        Orders.deleteMany({ uid: userid }, function (err, res) {
            console.log(err);
        });
        Booking.deleteMany({ uid: userid }, function (err, res) {
            console.log(err);
        });
        res.send({ status: "Ok", data: "Deleted" });
    } catch (error) {
        console.log(error);
    }
};
const upload_image = async (req, res) => {
    // const { base64 } = req.body;
    // const imageBuffer = Buffer.from(base64.data, "base64");
    const { image, uid } = req.body;
    try {

        await Image.create({
            image,
            uid
        })
        // await Image.create({ image: base64 });
        res.send({ Status: "ok" })

    } catch (error) {
        res.send({ Status: "error", data: error });
    }

    // const newImage = new Image({
    //   name: 'Uploaded Image',
    //   image: base64,
    // });

    // await newImage.save();
};
const get_image = async (req, res) => {
    const { uid } = req.body;
    try {
        const image = await Image.findOne({ uid });
        res.send({ status: "ok", data: image });
    } catch (error) {
        res.send({ status: "error", data: error });
    }
}

const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const update_user_data = async (req, res) => {
    const { email, username, fullname, address, phone, photoimage, gender } = req.body
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.json({ error: "User is not Exists" });
        }
        // User.updateMany({email}, function (err, res) {
        //     console.log(err);
        // });
        await oldUser.updateOne({ fullname, email, username, address, phone, photoimage, gender })
        res.send({ status: "ok", data: "User is edit " });
    } catch (error) {
        res.send({ status: "error" });
    }

}

module.exports = { verify, register, login, userData, forgot_password, reset_password_id_token_get, reset_password_id_token_post, getAllUser, getAllUser_no_admin, getAdmin, deleteUser, upload_image, get_image, logout, update_user_data }
