const express = require("express");
const router = express.Router();
const passport = require("passport");
const parseBearerToken = require("parse-bearer-token");
require("jsonwebtoken");
const nJwt = require("njwt");
const keys = require("../config/keys");

router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
});

//GET GOOGLE AUTHENTICATION
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    function(req, res) {
      const claims ={
          sub: req.user._id,
          iss:'task-board',
          permissions:'upload-photos'
      };
      const jwt = nJwt.create(claims, keys.tokenSecret);
      const token = jwt.compact();
      res.redirect("http://localhost:3000?token=" + token);
    }
);

router.get('/verify', (req, res) => {
    const config = require('../config/passport.js');
    const token = parseBearerToken(req);
    if (token) {
        //VERIFY TOKEN
        const verifyToken = nJwt.verify(token, keys.tokenSecret);
        const userID = verifyToken.body.sub;
            res.redirect('http://localhost:5000/users/' + userID)
    } else {
        // IF THERE IS NO TOKEN
            return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;