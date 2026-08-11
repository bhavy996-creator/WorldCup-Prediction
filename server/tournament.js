const Tournament = {

    currentRound: "Round of 32",

    rounds: {

        round32: [],
        quarterFinals: [],
        semiFinals: [],
        final: []

    },

    champion: null

};

function getWinner(match){

    if(match.homeScore > match.awayScore){
        return match.home;
    }

    if(match.homeScore < match.awayScore){
        return match.away;
    }

    // Temporary tiebreaker
    return match.home;

}

function generateRound(predictions){

    const winners = [];

    predictions.forEach(match=>{

        winners.push(getWinner(match));

    });

    const fixtures = [];

    for(let i=0;i<winners.length;i+=2){

        fixtures.push({

            home:winners[i],
            away:winners[i+1]

        });

    }

    return fixtures;

}