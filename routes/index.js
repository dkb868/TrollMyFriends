var express = require('express');
var router = express.Router();


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

router.post('/inspire', function(req,res){
  // Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
  var accountSid = 'AC74d3f913d8417e3da6fe763e7119db38';
  var authToken = "3efc44c6e1aa92a223d77e6445bcf5ed";
  var client = require('twilio')(accountSid, authToken);
  client.calls.create({
    url: "http://twimlbin.com/external/280b4bff4294310842a0149decd2b29b",
    to: "+1" + req.body.number,
    from: "+12028499415"
  }, function(err, call) {
    process.stdout.write(call.sid);
    res.redirect('/success');
  });
});



module.exports = router;
