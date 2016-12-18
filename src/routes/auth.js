import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/auth', passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/auth/callback',
    passport.authenticate('google', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));