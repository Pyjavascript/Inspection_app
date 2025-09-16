const express = require("express")
const {userRegister,loginUser,getUserInfo} = require('../controller/authController')
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();


router.post('/register',userRegister)
router.post('/login',loginUser)
router.get("/me", authMiddleware, getUserInfo);

module.exports = router;