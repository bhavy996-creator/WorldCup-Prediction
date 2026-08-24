const KEY = "bhavy_predict_v1";
const LEAGUE_AVG = 1.4;

let playerName = localStorage.getItem("playerName");

if(!playerName){
    playerName = prompt("Enter your name: ");

    if(playerName){
        localStorage.setItem("playerName", playerName);
    }else{
        playerName = "Guest";
    }
}

document.getElementById("playerDisplay").textContent = playerName;

function botPredict(home, away){
    const h = strength[home];
    const a = strength[away];

    if(!h || !a){
        return "0-0";
    }

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

function renderFixtures(fixtures){
    const board = document.getElementById("board");

    board.innerHTML = "";

    fixtures.forEach((match, index) => {

        if(!match.home || !match.away){
            return;
        }

        const prediction = botPredict(match.home, match.away);

        const card = document.createElement("div");

        card.className = "match";
        card.setAttribute("data-match", index);

        card.innerHTML = `
            <div class="match-header">

                <span class="round">
                    ${match.round || ROUND_TITLES[Tournament.currentRound]}
                </span>

                <div class="date">

                    <img
                        src="assets/icons/calendar.svg"
                        class="icon-sm"
                        alt="Calendar">

                    <span>
                        ${match.date ? formatDate(match.date) : "Upcoming"}
                    </span>

                </div>

            </div>

            <div class="fixture-row">

                <div class="team home-team">

                    <img
                        src="assets/flags/${match.home.toLowerCase()}.svg"
                        class="flag"
                        alt="${match.home}">

                    <span class="team-name">
                        ${match.home}
                    </span>

                </div>

                <div class="score-inputs">

                    <input
                        type="number"
                        placeholder="0">

                    <img
                        src="assets/icons/football.svg"
                        class="icon icon-sm"
                        alt="Football">

                    <input
                        type="number"
                        placeholder="0">

                </div>

                <div class="locked-score hidden">

                    <span class="locked-home"></span>

                    <img
                        src="assets/icons/football.svg"
                        class="icon icon-sm"
                        alt="Football">

                    <span class="locked-away"></span>

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

                    <span>
                        AI Prediction
                    </span>

                </div>

                <strong>
                    ${prediction}
                </strong>

            </div>

            <div
                class="match-status"
                id="status-${index}">
            </div>
        `;

        board.appendChild(card);
    });
}

function bindEvents(){

    const scoreButton =
        document.getElementById("scoreRoundbtn");

    const resetButton =
        document.getElementById("resetBtn");

    scoreButton.onclick = scoreRound;
    resetButton.onclick = resetRound;

    const inputs =
        document.querySelectorAll(".score-inputs input");

    inputs.forEach(input => {
        input.addEventListener("input", updateProgress);
    });
}

function initializeApp(){

    bindEvents();

    const restored = loadTournamentState();

    if(restored && Tournament.champion){

        document.getElementById("roundName").textContent =
            "Tournament Complete";

        document.getElementById("progressText").textContent =
            "Champion";

        document.getElementById("progressFill").style.width =
            "100%";

        renderChampion(Tournament.champion);

        return;
    }

    if(restored && Tournament.currentFixtures.length > 0){

        startRound(
            Tournament.currentFixtures,
            Tournament.currentRound
        );

    }else{

        Tournament.currentRound = "round32";
        Tournament.currentFixtures = FIXTURES;

        startRound(
            FIXTURES,
            "round32"
        );

        saveTournamentState();
    }

    hideResultCards();
    updateProgress();
}

initializeApp();

window.addEventListener("scroll", () => {

    const toolbar =
        document.querySelector(".toolbar");

    if(!toolbar) return;

    if(window.scrollY > 120){
        toolbar.classList.add("compact");
    }else{
        toolbar.classList.remove("compact");
    }

});

function hideResultCards(){

    const cards = [
        "scoreboard",
        "summary",
        "leaderboardCard",
        "standingsCard",
        "nextRoundCard",
        "breakdownCard"
    ];

    cards.forEach(id => {

        const card =
            document.getElementById(id);

        if(card){
            card.classList.add("fade-hidden");
        }

    });
}

function revealResultCards(){

    const cards = [
        "scoreboard",
        "summary",
        "leaderboardCard",
        "standingsCard",
        "nextRoundCard",
        "breakdownCard"
    ];

    cards.forEach((id,index) => {

        setTimeout(() => {

            const card =
                document.getElementById(id);

            if(!card) return;

            card.classList.remove("fade-hidden");
            card.classList.add("fade-show");

        }, index * 220);

    });
}

function startRound(fixtures, roundKey){

    Tournament.currentRound = roundKey;
    Tournament.currentFixtures = fixtures;

    document.getElementById("roundName").textContent =
        ROUND_TITLES[roundKey];

    document.getElementById("progressText").textContent =
        `0 / ${fixtures.length}`;

    document.getElementById("progressFill").style.width =
        "0%";

    renderFixtures(fixtures);

    restorePrediction();

    bindEvents();

    updateProgress();

    saveTournamentState();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

