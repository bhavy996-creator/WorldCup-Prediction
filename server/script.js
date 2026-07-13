const KEY = "bhavy_predict_v1";

const LEAGUE_AVG = 1.4;

//adding the localstorage method for saving users info
let playerName = localStorage.getItem("playerName");
document.getElementById("playerDisplay").textContent = playerName;

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

function formatDate(dateString){
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
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

        card.innerHTML = `
    <div class="match-header">

        <span class="round">${match.round}</span>

        <div class ="date">
        <img src ="assets/icons/calendar.svg"
        class = "icon-sm"
        alt = "Calendar">

        <span>${formatDate(match.date)}</span>

    </div>
    </div>

    <div class="fixture-row">

    <div class="team home-team">
    <img src="assets/flags/${match.home.toLowerCase()}.svg"
    class ="flag"
    alt="${match.home}"
    >

        <span class="team-name">
            ${match.home}
        </span>

    </div>

    <div class="score-inputs">

        <input type="number" placeholder="0">

        <img
        src="assets/icons/football.svg"
        class="icon icon-sm"
        alt="Football"
        >

        

        <input type="number" placeholder="0">

    </div>

    <div class="team away-team">
    

        <span class="team-name">
            ${match.away}
        </span>
        <img
        src="assets/flags/${match.away.toLowerCase()}.svg"
        class="flag"
        alt="${match.away}">

    </div>

    </div>

    <div class="prediction">
    <div class="prediction-label">
    <img
    src="assets/icons/robot.svg"
    class="icon icon-sm"
    alt="Robot">

        <span>AI Prediction</span>
        </div>


        <strong>${prediction}</strong>

    </div>
`;

        //adding the card to board
        board.appendChild(card);
    });
}

function bindEvents(){

    //connecting the button to the function
document
        .getElementById("scoreRoundbtn")
        .addEventListener("click", scoreRound);

}

function initializeApp(){
    renderFixtures();
    restorePrediction();
    bindEvents();

}
initializeApp();