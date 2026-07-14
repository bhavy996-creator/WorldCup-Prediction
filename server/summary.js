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