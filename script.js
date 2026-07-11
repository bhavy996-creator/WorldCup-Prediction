const KEY = "bhavy_predict_v1";

const LEAGUE_AVG = 1.4;

//adding the localstorage method for saving users info
let playerName = localStorage.getItem("playerName");

if(!playerName){
    playerName = prompt("Enter your name: ");
    
    if(playerName){
        localStorage.setItem("playerName", playerName);
    }
    else{
        playerName = "Guest";
    }
}

function botPredict(home, away) {

    const h = strength[home];
    const a = strength[away];

    const lambdaHome = h.attack * (a.defense / LEAGUE_AVG);
    const lambdaAway = a.attack * (h.defense / LEAGUE_AVG);

    return Math.round(lambdaHome) + "-" + Math.round(lambdaAway);
}

function renderFixtures(){
    
    const board = document.getElementById("board");

    board.innerHTML = "";   //clear the board before entering the data, this helps in preventing duplicate data

    FIXTURES.forEach((match, index) => {

        //we get the bot prediction first
        const prediction = botPredict(match.home, match.away);

        //then we will create the match card
        const card = document.createElement("div");
        card.className = "match";
        card.setAttribute("data-match", index);

        card.innerHTML =`
        <div class ="meta">
        ${match.round} • ${match.date}</div>

        <div class ="teams">
        ${match.home} vs ${match.away}</div>

        <div class="picks">

                <input type="number" placeholder="0">

                <span class="vs">VS</span>

                <input type="number" placeholder="0">

            </div>
            <p class="prediction">
Bot Prediction :
<strong>${prediction}</strong>
</p>
        `;

        //adding the card to board
        board.appendChild(card);
    });
}
function updateScoreBoard(yourTotal, botTotal){

    

    document.getElementById("yourScore").textContent = yourTotal;
    document.getElementById("botScore").textContent = botTotal;

}

function collectPredictions(){
    const predictions = [];

    
    const cards = document.querySelectorAll(".match");
    cards.forEach((card, index)=>{
        const inputs = card.querySelectorAll("input");
        const fixture = FIXTURES[index];
        
        const prediction = {
        home: fixture.home,
        away: fixture.away,
        homeScore: Number(inputs[0].value),
        awayScore: Number(inputs[1].value)
    };
    predictions.push(prediction);
    });
    return predictions;

    
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

//loading the predictions
function savePredictions(predictions){
    localStorage.setItem("predictions", JSON.stringify(predictions));
}
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

        }
        
       
   
renderFixtures();

//connecting the button to the function
document
        .getElementById("scoreRoundbtn")
        .addEventListener("click", scoreRound);


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

function renderLeaderboard(rows) {

    const board = document.getElementById("leaderboard");

    if (!board) return;

    board.innerHTML = "";

    rows.forEach((player, index) => {

        const row = document.createElement("tr");

        let rank;

        if(index === 0){
            rank = "🥇";
        }

        else if(index === 1){
            rank = "🥈";
        }

        else if(index === 2){
            rank = "🥉";
        }

        else{
            rank = index + 1;
        }
        
        let icon;

if (player.type === "user") {
    icon = "👤";
}
else if (player.type === "bot") {
    icon = "🤖";
}
else {
    icon = "🏆";
}
        row.innerHTML = `
            <td>${rank}</td>
            <td>${icon}${player.name}</td>
            <td>${player.total}</td>
        `;

        board.appendChild(row);

    });

}

function saveAndRank(entries) {

    // Save leaderboard
    localStorage.setItem(KEY, JSON.stringify(entries));

    // Read leaderboard
    const raw = localStorage.getItem(KEY);

    const rows = JSON.parse(raw || "[]");

    // Sort highest score first
    rows.sort((a, b) => b.total - a.total);

    // Display leaderboard
    renderLeaderboard(rows);

}


//for testing 
const predicted = {
    home: 2,
    away: 1
};
const actual = {
    home: 2, 
    away: 1
};

console.log(scorePick(predicted, actual));



    