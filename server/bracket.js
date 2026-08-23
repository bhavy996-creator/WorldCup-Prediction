function getWinner(match){

    if(match.homeScore > match.awayScore){
        return match.home;
    }

    if(match.homeScore < match.awayScore){
        return match.away;
    }

    // Temporary tie-breaker
    return match.home;
}


function generateNextRound(predictions){

    const winners = [];

    predictions.forEach((prediction) => {

        const winner = getWinner(prediction);

        if(winner){
            winners.push(winner);
        }

    });

    const nextRound = [];

    for(let i = 0; i < winners.length; i += 2){

        // Normal match
        if(winners[i + 1]){

            nextRound.push({

                home: winners[i],
                away: winners[i + 1]

            });

        }

        // If there is an odd number of winners,
        // the last team gets a bye.
        else{

            nextRound.push({

                home: winners[i],
                away: null,
                bye: true

            });

        }

    }

    return nextRound;
}


function renderRound(fixtures, title){

    const container =
        document.getElementById("nextRound");

    container.innerHTML = "";

    fixtures.forEach((match, index) => {

        const card =
            document.createElement("div");

        card.className = "next-match";


        // =========================
        // BYE
        // =========================

        if(match.bye){

            card.innerHTML = `

<div class="bracket-header">

    ${title} ${index + 1}

</div>


<div class="next-team home">

    <img
        src="assets/flags/${match.home.toLowerCase()}.svg"
        class="flag"
        alt="${match.home}">

    <span class="next-team-name">

        ${match.home}

    </span>

</div>


<div class="vs-divider">

    <span>BYE</span>

</div>


<div class="next-team away">

    <span class="next-team-name">

        Advances Automatically

    </span>

</div>

`;

        }


        // =========================
        // NORMAL MATCH
        // =========================

        else{

            card.innerHTML = `

<div class="bracket-header">

    ${title} ${index + 1}

</div>


<div class="next-team home">

    <img
        src="assets/flags/${match.home.toLowerCase()}.svg"
        class="flag"
        alt="${match.home}">

    <span class="next-team-name">

        ${match.home}

    </span>

</div>


<div class="vs-divider">

    <span>VS</span>

</div>


<div class="next-team away">

    <img
        src="assets/flags/${match.away.toLowerCase()}.svg"
        class="flag"
        alt="${match.away}">

    <span class="next-team-name">

        ${match.away}

    </span>

</div>

`;

        }

        container.appendChild(card);

    });

}