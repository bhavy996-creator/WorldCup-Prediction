function collectPredictions() {

    const predictions = [];
    let isComplete = true;

    const cards = document.querySelectorAll(".match");

    cards.forEach((card, index) => {

        const inputs = card.querySelectorAll("input");
        const fixture = FIXTURES[index];

        const homeValue = inputs[0].value.trim();
        const awayValue = inputs[1].value.trim();

        // Check for empty fields
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