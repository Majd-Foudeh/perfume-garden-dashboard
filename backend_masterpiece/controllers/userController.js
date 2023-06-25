// 1- calling the model
const user = require('../models/userModel')
const bcrypt = require('bcryptjs')
const utils =  require('../utils')
const allUsers = (req, res) => {
  // select * from users  =     find();
  user.find()
    .then((data) => {
      // console.log(data);
      res.status(200).json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const signin = async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: utils.getToken(signinUser),
    });
  } else {
    res.status(401).send({ message: 'Invalid Email or Password.' });
  }
}
const signup = async (req, res) => {
  const newUser =  new User({
    name:req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync( req.body.password)
  });

  const user = await newUser.save()
  res.send({
    _id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: utils.getToken(user),
  });
  
    // res.status(401).send({ message: 'Invalid Email or Password.' });
  
}



module.exports = {
  allUsers,
  signin,
  signup
  
};
