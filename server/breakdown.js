function renderBreakdown(predictions) {

    const container = document.getElementById("breakdownList");

    container.innerHTML = "";

    predictions.forEach((prediction) => {

        const resultKey =
            prediction.home + "|" + prediction.away;

        const actual = RESULTS[resultKey];

        const points = scorePick(
            {
                home: prediction.homeScore,
                away: prediction.awayScore
            },
            actual
        );

        let badge = "";
        let badgeClass = "";

        if (points === 5) {
            badge = "✓ Exact Prediction";
            badgeClass = "exact";
        }
        else if (points === 2) {
            badge = "✓ Correct Result";
            badgeClass = "correct";
        }
        else {
            badge = "✕ Wrong Prediction";
            badgeClass = "wrong";
        }

        const card = document.createElement("div");

        card.className = "breakdown-item";

        card.innerHTML = `

<div class="breakdown-header">

    <div class="breakdown-team">

        <img
            src="assets/flags/${prediction.home.toLowerCase()}.svg"
            class="flag"
            alt="${prediction.home}">

        <span>${prediction.home}</span>

    </div>

    <span class="breakdown-vs">VS</span>

    <div class="breakdown-team">

        <img
            src="assets/flags/${prediction.away.toLowerCase()}.svg"
            class="flag"
            alt="${prediction.away}">

        <span>${prediction.away}</span>

    </div>

</div>

<div class="breakdown-grid">

    <span>Your Prediction</span>
    <strong>${prediction.homeScore}-${prediction.awayScore}</strong>

    <span>Actual Result</span>
    <strong>${actual.home}-${actual.away}</strong>

</div>

<div class="status-pill ${badgeClass}">

    ${badge}

</div>

`;

        container.appendChild(card);

    });

}