const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const VerifyToken = require("../middlewares/AuthMiiddleware");

//I have created separate routing file for better readability.

router.post("/auth/signup", AuthController.SignupController);
router.post("/auth/login", AuthController.LoginController);
router.get("/auth/list", VerifyToken, AuthController.UserListController);

module.exports = router;
