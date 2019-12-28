const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Auth = require('../modals/Auth');
const privateKey = 'bubuna';

//Register User

router.post('/register', (req, res) => {
  console.log('req.body', req.body);
  //Check for Email Exists
  Auth.findOne({email: req.body.email}).then(user => {
    if (user) {
      return res
        .status(400)
        .json({email: 'User with such email alredy exists!'});
    }

    //Hash Password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(200).json({message: 'cant not hash passport'});
      }
      bcrypt.hash(req.body.password, salt).then(hash => {
        const newUser = new Auth({
          username: req.body.name,
          email: req.body.email,
          password: hash,
        })
          .save()
          .then(user => {
            res.status(200).json({message: 'User created'});
          })
          .catch(err => {
            res.status(400).json({error: 'Error to create user'});
          });
      });
    });
  });
});
//Login User

router.post('/login', (req, res) => {
  // console.log('req.body', req.body);
  const email = req.body.email;
  Auth.findOne({email}).then(user => {
    if (!user) {
      return res.status(400).json({email: 'User does not exist'});
    }
    //user exists
    console.log('user', user);
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(400).json(err);
      }
      if (!isMatch) {
        res.status(400).json({password: 'Password does not match'});
      } else {
        //Create jwt Token
        const data = {
          name: user.username,
          email: user.email,
          password: user.password,
        };
        const token = jwt.sign({data}, privateKey, {expiresIn: '1h'});
        // console.log('token /login', token);
        res.status(200).json({token, user});
      }
    });
  });
});

//Get Auth by Token
router.post('/auth_with_token', (req, res) => {
  const decoded = jwt.decode(req.body.token);
  // console.log('req.body.token', req.body.token);

  // console.log('decoded token', decoded);
  // console.log('decoded.exp', decoded.exp);
  // console.log('Date.now()', Math.trunc(Date.now() / 1000));
  if (decoded.exp < Math.trunc(Date.now() / 1000)) {
    return res.status(400).json({session: 'Session expired.Please log again'});
  }

  //find user in DB
  Auth.findOne({email: decoded.data.email}).then(user => {
    //Compare password
    if (user.password === decoded.data.password) {
      //Create Updated token
      const tokenBody = {
        name: user.username,
        email: user.email,
        password: decoded.data.password,
      };
      const token = jwt.sign({data: tokenBody}, privateKey, {expiresIn: '1h'});

      res.status(200).json({user, token});
    }
  });
});

module.exports = router;
