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

function renderRound(fixtures, title){
    const container = document.getElementById("nextRound");
    container.innerHTML = "";

    fixtures.forEach((match) =>{
        const card = document.createElement("div");
        card.className = "next-match";
        card.innerHTML = `
        <div class="next-fixture">
        <div class ="next-team home">
        <img 
        src="assets/flags/${match.home.toLowerCase()}.svg"
        class="flag"
        alt="${match.home}">

        <span class ="next-team-name">${match.home}</span>

        </div>

        <div class="next-vs">

            VS

        </div>

        <div class="next-team away">

        <span class ="next-team-name">${match.away}</span>

            <img
                src="assets/flags/${match.away.toLowerCase()}.svg"
                class="flag"
                alt="${match.away}">


        </div>

    </div>
        `;
        container.appendChild(card);
    });
}