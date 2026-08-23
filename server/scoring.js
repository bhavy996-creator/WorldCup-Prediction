function updateScoreBoard(yourTotal, botTotal) {
    document.getElementById("yourScore").textContent = yourTotal;
    document.getElementById("botScore").textContent = botTotal;
}

function resultOf(score) {
    if (score.home > score.away) return "home";
    if (score.home < score.away) return "away";
    return "draw";
}

function scorePick(predicted, actual) {
    const myResult = resultOf(predicted);
    const trueResult = resultOf(actual);

    if (
        predicted.home === actual.home &&
        predicted.away === actual.away
    ) {
        return 5;
    }

    if (myResult === trueResult) {
        return 2;
    }

    return 0;
}

function scoreRound() {

    const button = document.getElementById("scoreRoundbtn");

    const inputs = document.querySelectorAll(".score-inputs input");

const message = document.getElementById("validationMessage");

let valid = true;

inputs.forEach(input => {
    if (input.value === "") {
        valid = false;
    }
});

if (!valid) {
    message.textContent =
        "Please complete all match predictions.";

    return;
}

message.textContent = "";

    // Loading State
    button.disabled = true;
    button.innerHTML = `
        <img
            src="assets/icons/robot.svg"
            class="icon icon-sm"
            alt="Loading">
        <span>Calculating...</span>
    `;

    setTimeout(() => {

        const predictionData = collectPredictions();

if (!predictionData.isComplete) {

    document.getElementById("validationMessage").textContent =
        "Please complete all match predictions.";

    return;

}

document.getElementById("validationMessage").textContent = "";

const predictions = predictionData.predictions;
        savePredictions(predictions);

        let yourTotal = 0;
        let botTotal = 0;

        predictions.forEach((prediction, index) => {

            const resultKey = prediction.home + "|" + prediction.away;
            const actual = RESULTS[resultKey];
            
            if(actual){
            const yourPoints = scorePick(
                {
                    home: prediction.homeScore,
                    away: prediction.awayScore
                },
                actual
            );

            yourTotal += yourPoints;
            updateMatchStatus(index, yourPoints);

            // bot score
            const botScore = botPredict(
                prediction.home,
                prediction.away
            );

            const parts = botScore.split("-");

            const botPrediction = {
                home: Number(parts[0]),
                away: Number(parts[1])
            };

            const botPoints = scorePick(botPrediction, actual);

            botTotal += botPoints;
            }

        });

        

            
        // Update Scoreboard
        updateScoreBoard(yourTotal, botTotal);



        // Winner
        let winner = `
            <img src="assets/icons/handshake.svg"
                 class="icon icon-sm"
                 alt="Draw">
            Draw
        `;

        if (yourTotal > botTotal) {
            winner = `
                <img src="assets/icons/user.svg"
                     class="icon icon-sm"
                     alt="User">
                ${playerName}
            `;
        }
        else if (botTotal > yourTotal) {
            winner = `
                <img src="assets/icons/robot.svg"
                     class="icon icon-sm"
                     alt="Robot">
                House Bot
            `;
        }

        document.getElementById("winner").innerHTML = winner;

        // Leaderboard
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

        // Standings
        const standings = calculateStandings(predictions);
        const sortedTeams = sortStandings(standings);
        renderStandings(sortedTeams);

        // Next Round
        Tournament.rounds[Tournament.currentRound] = predictions;

const currentRound =
    Tournament.currentRound;

const nextRoundKey =
    getNextRound(currentRound);


// No next round = Tournament is complete
if(!nextRoundKey){

    const champion =
        completeTournament(predictions);

    renderChampion(champion);

    return;

}

// Generate the next fixtures
const nextRound =
    generateRound(predictions);

// Save them
Tournament.rounds[nextRoundKey] =
    nextRound;

// Move to the next round
setTimeout(() => {

    startRound(
        nextRound,
        nextRoundKey
    );

}, 1500);

        // Summary
        const summary = calculateSummary(predictions);
        renderSummary(summary);

        renderBreakdown(predictions);

        lockPredictionCards(predictions);

        revealResultCards();

        // Lock Inputs
        const inputs = document.querySelectorAll(".score-inputs input");

        inputs.forEach((input) => {
            input.disabled = true;
        });
        document
    .getElementById("lockBanner")
    .classList.remove("hidden");
        updateProgress();

        // Restore Button
        button.disabled = false;

        button.innerHTML = `
            <img
                src="assets/icons/trophy.svg"
                class="icon icon-sm"
                alt="Trophy">

            <span>Calculate Results</span>
        `;

    }, 600);

}

function resetRound() {

    localStorage.removeItem("predictions_round32");
    localStorage.removeItem("predictions_quarterFinals");
    localStorage.removeItem("predictions_semiFinals");
    localStorage.removeItem("predictions_final");
    document
    .getElementById("lockBanner")
    .classList.add("hidden");
    document
.querySelectorAll(".locked-score")
.forEach(score=>{

    score.classList.add("hidden");

});

document
.querySelectorAll(".score-inputs")
.forEach(inputs=>{

    inputs.classList.remove("hidden");

});
    location.reload();

}

function lockPredictionCards(predictions){

    const matches =
        document.querySelectorAll(".match");

    matches.forEach((card,index)=>{

        const inputs =
            card.querySelector(".score-inputs");

        const locked =
            card.querySelector(".locked-score");

        inputs.classList.add("hidden");

        locked.classList.remove("hidden");

        locked.querySelector(".locked-home").textContent =
            predictions[index].homeScore;

        locked.querySelector(".locked-away").textContent =
            predictions[index].awayScore;

    });

}