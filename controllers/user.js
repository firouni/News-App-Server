const UserSchema = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* Register */
exports.Register = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            pseudo,
            picturePath,
            age,
            CIN,
            government,
            address,
            email,
            password,
            role,
            blogs,
        } = req.body;
        const found = await UserSchema.findOne({ email });
        if (found) {
            return res.status(400).json({ msg: "existed user" });
        }

        const newUser = await new UserSchema(req.body);
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        newUser.password = hash;

        const payload = { id: newUser._id };
        let token = jwt.sign(payload, process.env.privateKey);
        newUser.save();
        res.status(201).json({ newUser, token, msg: "welcome onBoard" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

/* Login */
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const found = await UserSchema.findOne({ email });
        if (!found) {
        return res.status(404).json({ msg: "User does not exist." });
        }

        const match = await bcrypt.compare(password, found.password);
        if (!match) {
        return res.status(400).json({ msg: "Invalid credentials." });
        }

        const payload = { id: found._id };
        var token = jwt.sign(payload, process.env.privateKey);
        delete found.password;
        res.status(201).json({ msg: "Welcome", token, found });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* Get Request */
exports.getAllUsers = async (req, res) => {
    try {
        const id = req.params.id;
        const users = await UserSchema.find(id);
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.status(404).json({ msg: err.message });
    }
};