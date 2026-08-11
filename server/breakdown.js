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

        let statusText = "";
let statusClass = "";

if(points === 5){

    statusText = "✓ Exact • +5 pts";
    statusClass = "exact";

}

else if(points === 2){

    statusText = "✓ Correct • +2 pts";
    statusClass = "correct";

}

else{

    statusText = "✕ Wrong • 0 pts";
    statusClass = "wrong";

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

<div class="score-section">

    <span class="score-title">
        Prediction
    </span>

    <div class="score-box">

        ${prediction.homeScore}

        <span>-</span>

        ${prediction.awayScore}

    </div>

</div>

<div class="divider"></div>

<div class="score-section">

    <span class="score-title">
        Actual Result
    </span>

    <div class="score-box">

        ${actual.home}

        <span>-</span>

        ${actual.away}

    </div>

</div>

<div class="divider"></div>

<div class="breakdown-status ${statusClass}">

    ${statusText}

</div>

`;

        container.appendChild(card);

    });

}