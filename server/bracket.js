function getWinner(match){
    if(match.homeScore > match.awayScore){
        return match.home;
    }
    if(match.homeScore < match.awayScore){
        return match.away;
    }
    //temporary tie 
    return match.home;
}

function generateNextRound(predictions){
    const winners = [];
    predictions.forEach((prediction) =>{
        const winner = getWinner(prediction);
        winners.push(winner);
    });

    const nextRound = [];
    for (let i =0; i<winners.length; i+=2){
        nextRound.push({
            home: winners[i],
            away: winners[i+1]
        });
    }
return nextRound;
}