function renderBreakdown(predictions) {

    const container =
        document.getElementById("breakdownList");

    container.innerHTML = "";


    predictions.forEach((prediction) => {

        const resultKey =
            prediction.home + "|" + prediction.away;

        const actual =
            RESULTS[resultKey];


        // ========================================
        // ACTUAL RESULT AVAILABLE
        // ========================================

        if (actual) {

            const points =
                scorePick(
                    {
                        home: prediction.homeScore,
                        away: prediction.awayScore
                    },
                    actual
                );


            let statusText = "";
            let statusClass = "";


            if (points === 5) {

                statusText =
                    "Perfect Prediction • +5 pts";

                statusClass =
                    "exact";

            }

            else if (points === 2) {

                statusText =
                    "Correct Winner • +2 pts";

                statusClass =
                    "correct";

            }

            else {

                statusText =
                    "Prediction Missed • 0 pts";

                statusClass =
                    "wrong";

            }


            const card =
                document.createElement("div");

            card.className =
                "breakdown-item";


            card.innerHTML = `

                <div class="breakdown-header">

                    <div class="breakdown-team">

                        <img
                            src="assets/flags/${prediction.home.toLowerCase()}.svg"
                            class="flag"
                            alt="${prediction.home}">

                        <span>
                            ${prediction.home}
                        </span>

                    </div>


                    <span class="breakdown-vs">
                        VS
                    </span>


                    <div class="breakdown-team">

                        <span>
                            ${prediction.away}
                        </span>

                        <img
                            src="assets/flags/${prediction.away.toLowerCase()}.svg"
                            class="flag"
                            alt="${prediction.away}">

                    </div>

                </div>


                <div class="score-comparison">

                    <div class="comparison-block">

                        <span class="comparison-title">
                            Prediction
                        </span>

                        <div class="comparison-score">

                            <span>
                                ${prediction.homeScore}
                            </span>

                            <span class="score-separator">
                                -
                            </span>

                            <span>
                                ${prediction.awayScore}
                            </span>

                        </div>

                    </div>


                    <div class="comparison-block">

                        <span class="comparison-title">
                            Result
                        </span>

                        <div class="comparison-score">

                            <span class="actual-score">
                                ${actual.home}
                            </span>

                            <span class="score-separator">
                                -
                            </span>

                            <span class="actual-score">
                                ${actual.away}
                            </span>

                        </div>

                    </div>

                </div>


                <div class="divider"></div>


                <div class="breakdown-status ${statusClass}">

                    ${statusText}

                </div>

            `;


            container.appendChild(card);

        }


        // ========================================
        // PREDICTION-ONLY KNOCKOUT ROUND
        // ========================================

        else {

            const predictedWinner =
                prediction.homeScore > prediction.awayScore
                    ? prediction.home
                    : prediction.away;


            const card =
                document.createElement("div");

            card.className =
                "breakdown-item prediction-only";


            card.innerHTML = `

                <div class="breakdown-header">

                    <div class="breakdown-team">

                        <img
                            src="assets/flags/${prediction.home.toLowerCase()}.svg"
                            class="flag"
                            alt="${prediction.home}">

                        <span>
                            ${prediction.home}
                        </span>

                    </div>


                    <span class="breakdown-vs">
                        VS
                    </span>


                    <div class="breakdown-team">

                        <span>
                            ${prediction.away}
                        </span>

                        <img
                            src="assets/flags/${prediction.away.toLowerCase()}.svg"
                            class="flag"
                            alt="${prediction.away}">

                    </div>

                </div>


                <div class="score-comparison single-prediction">

                    <div class="comparison-block">

                        <span class="comparison-title">
                            Your Prediction
                        </span>

                        <div class="comparison-score">

                            <span>
                                ${prediction.homeScore}
                            </span>

                            <span class="score-separator">
                                -
                            </span>

                            <span>
                                ${prediction.awayScore}
                            </span>

                        </div>

                    </div>

                </div>


                <div class="divider"></div>


                <div class="breakdown-status prediction-status">

                    Predicted Winner • ${predictedWinner}

                </div>

            `;


            container.appendChild(card);

        }

    });

}