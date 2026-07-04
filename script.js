console.log("Javascript loading");
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
        board.appendChild(card);
    });
}

renderFixtures();