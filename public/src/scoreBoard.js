var config = {
  apiKey: "AIzaSyDzH1Ewxtt0PqbR9Vf6cZLenj_U9k35KEg",
  authDomain: "asteroids-highscore.firebaseapp.com",
  databaseURL: "https://asteroids-highscore.firebaseio.com",
  storageBucket: "asteroids-highscore.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

function submitScore (score) {
  firebase.database().ref("highscore").push({
    name: document.getElementById('name').value,
    level: score
  })
}


var highScores = firebase.database().ref('highscore');
highScores.on('value', function(snapshot) {
  var leaderBoard = Object.keys(snapshot.val()).map(function (key) {
      return snapshot.val()[key]
  })


  var sortedLeaderBoard = leaderBoard.slice(0, 9).sort(function (a, b) { return b.level - a.level })


document.getElementById("score").innerHTML = sortedLeaderBoard.map(function (entry) {
  return "<li>" + entry.name + ": " + entry.level + "</li>"
}).join('')

});
