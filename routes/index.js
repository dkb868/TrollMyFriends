var express = require('express');
var session = require('express-session');

var router = express.Router();

router.use(session({ secret: 'keyboard cat', cookie: { maxAge: 300000 }}));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// post to the api, which tells the twilio api to input those digits
router.get('/success', function(req,res,next){
  // Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
  res.render('success');
});

router.get('/failure', function(req,res,next){
  // Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
  res.render('failure');
});

router.post('/inspire', function(req,res){
  var url;
  var hasUsed = req.session.hasUsed;
  if (hasUsed == null){
    // Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
    var accountSid = 'AC74d3f913d8417e3da6fe763e7119db38';
    var authToken = "3efc44c6e1aa92a223d77e6445bcf5ed";
    var client = require('twilio')(accountSid, authToken);
    if(req.body.button == 1) {
      url = "http://twimlbin.com/4b8f5d72cce9340262fb3d3169b64d52";
    } else {
      url = "http://twimlbin.com/d6570c0d62c865432cbbc368b27f33dd";
    }

    client.calls.create({
      url:url,
      to: "+1" + req.body.number,
      from: "+12028499415"
    }, function(err, call) {
      req.session.hasUsed = true;
      res.redirect('/success');
    });
  } else {
    // has been used already
    res.redirect('/failure');
  }

});



module.exports = router;
