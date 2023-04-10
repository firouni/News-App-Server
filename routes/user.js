const express = require('express');
const { Register, Login, getAllUsers } = require('../controllers/user');

const UserRouter = express.Router();

UserRouter.get("/getusers", getAllUsers);

UserRouter.post("/register", Register);
UserRouter.post("/login", Login);


module.exports = UserRouter;