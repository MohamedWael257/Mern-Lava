const { register, login, userData, forgot_password, reset_password_id_token_get, reset_password_id_token_post, getAllUser, deleteUser, upload_image, get_image, logout, getAllUser_no_admin, getAdmin, update_user_data, verify } = require("../controllers/auth.controller.js");
const express = require("express");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/userData", userData);
router.get("/verify/:token", verify);
router.post("/forgot-password", forgot_password);
router.get("/reset-password/:id/:token", reset_password_id_token_get);
router.post("/reset-password/:id/:token", reset_password_id_token_post);
router.get('/getAllUser', getAllUser);
router.get('/getAllUser-no-admin', getAllUser_no_admin);
router.get('/getAdmin', getAdmin);
router.post('/deleteUser', deleteUser);
router.post('/upload-image', upload_image);
router.post('/get-image', get_image);
router.get('/logout', logout);
router.post('/update-user-data', update_user_data);


module.exports = router