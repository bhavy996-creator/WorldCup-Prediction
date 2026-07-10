const KEY = "bhavy_predict_v1";




const LEAGUE_AVG = 1.4;

function botPredict(home, away) {

    const h = strength[home];
    const a = strength[away];

    const lambdaHome = h.attack * (a.defense / LEAGUE_AVG);
    const lambdaAway = a.attack * (h.defense / LEAGUE_AVG);

    return Math.round(lambdaHome) + "-" + Math.round(lambdaAway);
}

function renderFixtures(){
    
    const board = document.getElementById("board");

    FIXTURES.forEach((match, index) => {
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
        `;
        const prediction = document.createElement("p");
        prediction.textContent =
            "🤖 Bot Prediction: " +
            botPredict(match.home, match.away);

        card.appendChild(prediction);
        board.appendChild(card);
    });
}

renderFixtures();



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

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.name}</td>
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

const leaderboardData = [

    {
        name: "You",
        total: 17
    },

    {
        name: "House Bot",
        total: 11
    },

    {
        name: "Alex",
        total: 22
    }

];

document
    .getElementById("showLeaderboard")
    .addEventListener("click", function () {

        saveAndRank(leaderboardData);

    });