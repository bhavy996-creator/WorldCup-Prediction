function renderRound(fixtures, title){
    const container = document.getElementById("nextRound");
    container.innerHTML = "";

    fixtures.forEach((match, index) =>{
        const card = document.createElement("div");
        card.className = "next-match";
        card.innerHTML = `

<div class="bracket-header">

    Quarter Final ${index + 1}

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
        container.appendChild(card);
    });
}