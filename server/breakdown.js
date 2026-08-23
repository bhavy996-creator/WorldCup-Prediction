function renderBreakdown(predictions) {

    const container =
        document.getElementById("breakdownList");

    container.innerHTML = "";


    predictions.forEach((prediction) => {

        const resultKey =
            prediction.home + "|" + prediction.away;

        const actual =
            RESULTS[resultKey];

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

function renderPredictionSummary(predictions) {

    const breakdownCard =
        document.getElementById("breakdownCard");

    if (!breakdownCard) return;


    // Remove previous summary if it exists
    const oldSummary =
        document.getElementById("predictionSummary");

    if (oldSummary) {
        oldSummary.remove();
    }


    const round =
        Tournament.currentRound;


    // R32 does not need this section
    if (round === "round32") {
        return;
    }


    let title = "";
    let message = "";
    let extraContent = "";


    if (round === "quarterFinals") {

        title = "Quarter Final Predictions";

        message =
            "Your quarter-final predictions have been recorded. Analyse the matchups and continue when you're ready.";

    }


    else if (round === "semiFinals") {

        title = "Semi Final Predictions";

        message =
            "Your semifinal predictions have been recorded. Results will be available after the matches are played.";

    }


    else if (round === "final") {

        title = "Final Prediction";

        const finalPrediction =
            predictions[0];

        if (finalPrediction) {

            const champion =
                finalPrediction.homeScore >
                finalPrediction.awayScore
                    ? finalPrediction.home
                    : finalPrediction.away;

            extraContent = `

                <div class="predicted-champion">

                    <span class="champion-icon">
                        🏆
                    </span>

                    <strong>
                        ${champion}
                    </strong>

                </div>

            `;

            message =
                "Your final prediction has been recorded. Awaiting the final result.";

        }

    }


    if (!title) return;


    const summary =
        document.createElement("div");

    summary.id =
        "predictionSummary";

    summary.className =
        "prediction-summary";


    summary.innerHTML = `

        <div class="prediction-summary-content">

            <div class="prediction-summary-text">

                <strong>
                    ${title}
                </strong>

                <span>
                    ${message}
                </span>

            </div>

            ${extraContent}

        </div>

    `;


    breakdownCard.appendChild(summary);

}