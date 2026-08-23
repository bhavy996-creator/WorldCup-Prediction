function collectPredictions() {

    const predictions = [];
    let isComplete = true;

    const cards = document.querySelectorAll(".match");

    cards.forEach((card, index) => {

        const inputs = card.querySelectorAll("input");
        const fixture = Tournament.currentFixtures[index];
        const homeValue = inputs[0].value.trim();
        const awayValue = inputs[1].value.trim();

        if (homeValue === "" || awayValue === "") {
            isComplete = false;
        }

        predictions.push({
    home: fixture.home,
    away: fixture.away,
    homeScore: Number(homeValue),
    awayScore: Number(awayValue),
    round: Tournament.currentRound
});

    });

    return {
        predictions,
        isComplete
    };

}

// Save predictions
function savePredictions(predictions) {
    const round = Tournament.currentRound;
    localStorage.setItem(
        `predictions_${round}`,
        JSON.stringify(predictions)
    );
}

// Load predictions
function loadPredictions() {
    const round = Tournament.currentRound;
    const raw = localStorage.getItem(`predictions_${round}`);
    return JSON.parse(raw || "[]");
}

// Restore predictions
function restorePrediction() {

    const predictions = loadPredictions();

    const cards = document.querySelectorAll(".match");

    cards.forEach((card, index) => {

        if (!predictions[index]) return;

        const inputs = card.querySelectorAll("input");

        inputs[0].value = predictions[index].homeScore;
        inputs[1].value = predictions[index].awayScore;

    });

}