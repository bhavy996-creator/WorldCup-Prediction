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

        const predictions = collectPredictions();
        savePredictions(predictions);

        let yourTotal = 0;
        let botTotal = 0;

        predictions.forEach((prediction) => {

            const resultKey = prediction.home + "|" + prediction.away;
            const actual = RESULTS[resultKey];

            const yourPoints = scorePick(
                {
                    home: prediction.homeScore,
                    away: prediction.awayScore
                },
                actual
            );

            yourTotal += yourPoints;

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
        const nextRound = generateNextRound(predictions);
        renderRound(nextRound, "Quarter Finals");

        // Summary
        const summary = calculateSummary(predictions);
        renderSummary(summary);

        // Lock Inputs
        const inputs = document.querySelectorAll(".score-inputs input");

        inputs.forEach((input) => {
            input.disabled = true;
        });

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

    localStorage.removeItem("predictions");

    location.reload();

}