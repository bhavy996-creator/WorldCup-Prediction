function calculateSummary(predictions){
    const summary = {
        exact: 0, 
        correct: 0,
        wrong: 0
    };
    predictions.forEach((prediction) =>{
        const key = prediction.home + "|" + prediction.away;
        const actual = RESULTS[key];

        const predictedResult = resultOf({
            home: prediction.homeScore,
            away: prediction.away
        });

        const actualResult = resultOf(actual);
        if(
            prediction.homeScore === actual.home &&
            prediction.awayScore === actual.away
        ){
            summary.exact++;
        }
        else if(predictedResult === actualResult){
            summary.correct++;
        }
        else{
            summary.wrong++;
        }
    });
    return summary;
}

function renderSummary(summary){

    const container = document.getElementById("summary");

    const total =
        summary.exact +
        summary.correct +
        summary.wrong;

    const accuracy =
        Math.round(
            ((summary.exact + summary.correct) / total) * 100
        );

    container.innerHTML = `
        <h2>Round Summary</h2>

        <div class="result-row">
            <span>Exact Scores</span>
            <strong>${summary.exact}</strong>
        </div>

        <div class="result-row">
            <span>Correct Results</span>
            <strong>${summary.correct}</strong>
        </div>

        <div class="result-row">
            <span>Wrong Picks</span>
            <strong>${summary.wrong}</strong>
        </div>

        <div class="result-row">
            <span>Accuracy</span>
            <strong>${accuracy}%</strong>
        </div>
    `;

}