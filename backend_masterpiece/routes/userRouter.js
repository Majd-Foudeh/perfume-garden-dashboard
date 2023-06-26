const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


// get all users
router.get("/users", userController.allUsers);

router.put("/deleteUser/:id" ,userController.deleteUser);

// sign in 
router.post("/signin", userController.signin);
router.post("/signup", userController.signup);


module.exports = router;
