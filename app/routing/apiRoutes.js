var friendData = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });
    app.post("/api/friends", function (req, res) {
        
        var newScore = req.body.scores;
        for (var i = 0; i < newScore.length; i++) {
            newScore[i] = parseInt(newScore[i]);
        };

        var scoreDiffArray = [];
        var matchIndex = 0;

        for (var i = 0; i < friendData.length; i++) {
            var scoresDifference = 0;
            for (var j = 0; j<newScore.length; j++){
                scoresDifference += Math.abs((friendData[i].scores[j])-newScore[j]);
            };
            scoreDiffArray.push(scoresDifference);
        };

        for (var i = 0; i <scoreDiffArray.length; i++){
            if (scoreDiffArray[i]<=scoreDiffArray[matchIndex]){
                matchIndex = i;
            };
        };

        var friendMatch = friendData[matchIndex];
        res.json(friendMatch);
        console.log("Best friend: ", friendMatch);

        friendData.push(req.body);


    });
};