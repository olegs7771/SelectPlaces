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
      res.status(200).json({msg: 'Created'});
    });
});

module.exports = router;
