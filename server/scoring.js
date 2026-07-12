function updateScoreBoard(yourTotal, botTotal){

    

    document.getElementById("yourScore").textContent = yourTotal;
    document.getElementById("botScore").textContent = botTotal;

}

function resultOf(score){
    if(score.home>score.away){
        return "home";
    }
    if(score.home<score.away){
        return "away";

    }
    return "draw";
}


function scorePick(predicted, actual){
    const myResult = resultOf(predicted);
    const trueResult = resultOf(actual);

    if(
        predicted.home === actual.home &&
        predicted.away === actual.away
    ){
        return 5;
    }
    if(
        myResult === trueResult
    ){
        return 2;
    }
    return 0;
}


function scoreRound(){

    const predictions = collectPredictions();
    savePredictions(predictions);

    let yourTotal = 0;
    let botTotal = 0;

        

         predictions.forEach((prediction) => {

            const resultKey = prediction.home + "|" + prediction.away;
            const actual = RESULTS[resultKey];

            //calculate users points
            const yourPoints = scorePick(
                {
                    home: prediction.homeScore,
                    away: prediction.awayScore
                },
                actual
            );

            //adding to total
            yourTotal += yourPoints;

            //get bot prediction
            const botScore = botPredict(
                prediction.home,
                prediction.away
            );

            const parts = botScore.split("-");
            
            //convert into object
            const botPrediction = {
                home: Number(parts[0]),
                away: Number(parts[1])
            }
 
            //calculate bot points
            const botPoints = scorePick(botPrediction, actual);

            //adding to total for bot
            botTotal += botPoints;


            
            //for testing
            console.log("Fixture:", prediction.home, "vs", prediction.away);
            console.log("Predicted:", prediction);
            console.log("Actual:", actual);
            console.log("Your Points:", yourPoints);
            console.log("Bot Points:", botPoints);
            console.log("------------------------");

});


//update scoreboard once
updateScoreBoard(yourTotal, botTotal);

//creating leaderboard info

const leaderboardData = [
    {
        name: playerName,
        total: yourTotal,
        type: "user"

},
{
    name: "House Bot",
    total: botTotal,
    type: "bot"
}
];

saveAndRank(leaderboardData);

const standings = calculateStandings(predictions);
        const sortedTeams = sortStandings(standings);

        renderStandings(sortedTeams);

        }