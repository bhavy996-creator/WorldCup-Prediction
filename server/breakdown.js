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

    statusText = "Perfect Prediction --> +5 pts";

}
else if(points === 2){

    statusText = "Correct Winner --> +2 pts";

}
else{

    statusText = "Prediction Missed --> 0 pts";

}

        const card = document.createElement("div");

        card.className = "breakdown-item";

        card.innerHTML = `

<div class="breakdown-header">

    <div class="breakdown-team">
        <img src="assets/flags/${prediction.home.toLowerCase()}.svg"
             class="flag">
        <span>${prediction.home}</span>
    </div>

    <span class="breakdown-vs">VS</span>

    <div class="breakdown-team">
        <img src="assets/flags/${prediction.away.toLowerCase()}.svg"
             class="flag">
        <span>${prediction.away}</span>
    </div>

</div>

<div class="score-comparison">

    <div class="comparison-block">

        <span class="comparison-title">
            Prediction
        </span>

        <div class="comparison-score">

            ${prediction.homeScore}

            <span>:</span>

            ${prediction.awayScore}

        </div>

    </div>

    <div class="comparison-block">

        <span class="comparison-title">
            Result
        </span>

        <div class="comparison-score actual-score">

            ${actual.home}

            <span>:</span>

            ${actual.away}

        </div>

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