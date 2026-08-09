function renderBreakdown(predictions) {

    const container = document.getElementById("breakdownList");

    container.innerHTML = "";

    predictions.forEach((prediction) => {

        const resultKey = prediction.home + "|" + prediction.away;

        const actual = RESULTS[resultKey];

        const points = scorePick(
            {
                home: prediction.homeScore,
                away: prediction.awayScore
            },
            actual
        );

        const card = document.createElement("div");

        card.className = "breakdown-item";

        card.innerHTML = `
            <div class="breakdown-header">
                <strong>${prediction.home}</strong>
                <span>vs</span>
                <strong>${prediction.away}</strong>
            </div>

            <div class="breakdown-row">
                <span>Your Prediction</span>
                <strong>${prediction.homeScore}-${prediction.awayScore}</strong>
            </div>

            <div class="breakdown-row">
                <span>Actual Result</span>
                <strong>${actual.home}-${actual.away}</strong>
            </div>

            <div class="breakdown-row">
                <span>Points Earned</span>
                <strong>${points}</strong>
            </div>
        `;

        container.appendChild(card);

    });

}