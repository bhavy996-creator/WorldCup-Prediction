function collectPredictions() {

    const predictions = [];
    let isComplete = true;

    const cards = document.querySelectorAll(".match");

    cards.forEach((card, index) => {

        const inputs = card.querySelectorAll("input");
        const fixture = FIXTURES[index];

        const homeValue = inputs[0].value.trim();
        const awayValue = inputs[1].value.trim();

        if (homeValue === "" || awayValue === "") {
            isComplete = false;
        }

        predictions.push({
            home: fixture.home,
            away: fixture.away,
            homeScore: Number(homeValue),
            awayScore: Number(awayValue)
        });

    });

    return {
        predictions,
        isComplete
    };

}

// Save predictions
function savePredictions(predictions) {
    localStorage.setItem(
        "predictions",
        JSON.stringify(predictions)
    );
}

// Load predictions
function loadPredictions() {
    const raw = localStorage.getItem("predictions");
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