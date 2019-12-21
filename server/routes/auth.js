const express = require('express');
const router = express.Router();
const Auth = require('../modals/Auth');

//Register User

router.post('/register', (req, res) => {
  console.log('req.body', req.body);

  const newUser = new Auth({
    username: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
    .save()
    .then(user => {
      res.status(200).json({message: 'User created'});
    })
    .catch(err => {
      res.status(400).json({error: 'Error to create user'});
    });
});
//Login User

router.post('/login', (req, res) => {
  console.log('req.body', req.body);
  const email = req.body.email;
  Auth.findOne({email}).then(user => {
    if (!user) {
      return res.status(400).json({email: 'User does not exist'});
    }
    console.log('User Exists');
    console.log('user', user);
    if (user.password === req.body.password) {
      res.status(200).json({msg: 'Success!'});
    } else {
      res.status(400).json({password: 'Password does not match'});
    }
  });
});

module.exports = router;
