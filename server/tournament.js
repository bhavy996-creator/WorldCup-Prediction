const Tournament = {

    currentRound: "round32",
    currentFixtures: [],

    nextRoundKey: null,
    nextFixtures: [],

    rounds: {

        round32: [],
        quarterFinals: [],
        semiFinals: [],
        final: []

    },

    champion: null

};

const ROUND_TITLES = {

    round32: "Round of 32",
    quarterFinals: "Quarter Finals",
    semiFinals: "Semi Finals",
    final: "Final"

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

function getNextRound(currentRound){

    if(currentRound === "round32"){
        return "quarterFinals";
    }

    if(currentRound === "quarterFinals"){
        return "semiFinals";
    }

    if(currentRound === "semiFinals"){
        return "final";
    }

    return null;

}

function completeTournament(predictions) {

    if (!predictions || predictions.length === 0) {
        return null;
    }

    const finalMatch = predictions[0];

    const champion =
        getWinner(finalMatch);

    Tournament.champion = champion;

    return champion;
}


function renderChampion(champion) {

    const container =
        document.getElementById("nextRound");

    if (!container) {
        return;
    }

    container.innerHTML = `

        <div class="champion-card">

            <div class="champion-trophy">
                🏆
            </div>

            <div class="champion-label">
                Your Predicted Champion
            </div>

            <div class="champion-name">
                ${champion || "Unknown"}
            </div>

        </div>

    `;
}