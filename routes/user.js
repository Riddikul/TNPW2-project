const express = require('express');
const router = express.Router();
const passport = require('passport');

const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');


router.get('/register', (req, res) => {
  res.render('users/register', { username: '', email: '' });
});

router.post(
  '/register',
  catchAsync(async (req, res, next) => {
    try {
      const { username, email, password, password2 } = req.body;
      
      if (password !== password2) {
        const errorMessage = 'Hesla se neshodují. Zkuste to znovu.';
        return res.render('users/register', { username, email, errorMessage });
      }

      const existingUser = await User.countDocuments({ $or: [{ username }, { email }] });
      if (existingUser > 0) {
        const errorMessage = 'Uživatel s tímto jménem nebo emailem již existuje.';
        return res.render('users/register', { username, email, errorMessage }); 
      }

      const user = new User({ username, email });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash('success', 'Byli jste úspěšně zaregistrováni, Vítejte!');
        res.redirect('/recipes/home');
      });
    } catch (error) {
      const errorMessage = error.message;
      res.render('users/register', { username, email, errorMessage }); 
    }
  })
);


router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
  }),
  (req, res) => {
    req.flash('success', 'Byli jste úspěšně přihlášeni!');
    res.redirect('/recipes/myrecipes');
  }
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Byli jste úspěšně odhlášeni!');
    res.redirect('/recipes/home');
  });
});

module.exports = router;
