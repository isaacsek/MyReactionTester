var axios = require("axios");
var Score = require("./models/score");

module.exports = function(app) {

  app.post('/newscore', function (req, res) {
    var score = new Score({
      name: req.body.name,
      score: req.body.score
    })
    score.save();
    res.send({message: score});
  });

  app.get('/leaderboard', function (req, res) {
    Score.find({}).sort({score: 'ascending'}).exec(function(err, users) {
      res.send({users:users});
    })
  });
}
