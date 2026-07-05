
const FIXTURES = [
    {
        home: "Germany",
        away: "Mexico",
        date: "2026-06-28",
        round: "R32"
    },

    {
        home: "Argentina",
        away: "Switzerland",
        date: "2026-06-29",
        round: "R32"
    },
    {
        home: "France",
        away: "Portugal",
        date: "2026-06-30",
        round: "R32"
    },
    {
        home: "Spain",
        away: "Uruguay",
        date: "2026-07-01",
        round: "R32"
    },
    {
        home: "Brazil",
        away: "Japan",
        date: "2026-07-02",
        round: "R32"
    },
    {
        home: "England",
        away: "Netherlands",
        date: "2026-07-03",
        round: "R32"
    }
];

const strength = {
    Germany: {
        attack: 2.6,
        defense: 0.6
    },

    England: {
        attack: 0.7,
        defense: 1.9
    },

    France: {
        attack: 1.4,
        defense: 1.3
    },

    Spain: {
        attack: 1.3,
        defense: 1.4
    },

    Argentina: {
        attack: 1.7,
        defense: 1.0
    },

    Brazil: {
        attack: 1.6,
        defense: 1.1
    },
    
    Mexico: {
    attack: 1.2,
    defense: 1.3
},

Switzerland: {
    attack: 1.1,
    defense: 1.0
},

Portugal: {
    attack: 1.8,
    defense: 0.9
},

Uruguay: {
    attack: 1.4,
    defense: 1.2
},

Japan: {
    attack: 1.3,
    defense: 1.1
},

Netherlands: {
    attack: 1.7,
    defense: 1.0
}
};
const LEAGUE_AVG = 1.4;

function botPredict(home, away) {

    const h = strength[home];
    const a = strength[away];

    const lambdaHome = h.attack * (a.defense / LEAGUE_AVG);
    const lambdaAway = a.attack * (h.defense / LEAGUE_AVG);

    return Math.round(lambdaHome) + "-" + Math.round(lambdaAway);
}

function renderFixtures(){
    
    const board = document.getElementById("board");

    FIXTURES.forEach((match, index) => {
        const card = document.createElement("div");
        card.className = "match";
        card.setAttribute("data-match", index);

        card.innerHTML =`
        <div class ="meta">
        ${match.round} • ${match.date}</div>

        <div class ="teams">
        ${match.home} vs ${match.away}</div>

        <div class="picks">

                <input type="number" placeholder="0">

                <span class="vs">VS</span>

                <input type="number" placeholder="0">

            </div>
        `;
        const prediction = document.createElement("p");
        prediction.textContent =
            "🤖 Bot Prediction: " +
            botPredict(match.home, match.away);

        card.appendChild(prediction);
        board.appendChild(card);
    });
}

renderFixtures();



function resultOf(score){
    if(score.home>score.away){
        return "home";
    }
    if(score.home<score.away){
        return "away";

    }
    return "draw";
}

function scorePick(predicted, actual){
    const myResult = resultOf(predicted);
    const trueResult = resultOf(actual);

    if(
        predicted.home === actual.home &&
        predicted.away === actual.away
    ){
        return 5;
    }
    if(
        myResult === trueResult
    ){
        return 2;
    }
    return 0;
}


//for testing 
const predicted = {
    home: 2,
    away: 1
};
const actual = {
    home: 2, 
    away: 1
};

console.log(scorePick(predicted, actual));