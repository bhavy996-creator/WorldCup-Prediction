function renderRound(fixtures, title) {

    const container =
        document.getElementById("nextRound");

    container.innerHTML = "";

    fixtures.forEach((match, index) => {

        const card =
            document.createElement("div");

        card.className = "next-match";

        card.innerHTML = `

            <div class="bracket-header">

                ${title} ${index + 1}

            </div>

            <div class="next-fixture">

                <div class="next-team home">

                    <img
                        src="assets/flags/${match.home.toLowerCase()}.svg"
                        class="flag"
                        alt="${match.home}">

                    <span class="next-team-name">
                        ${match.home}
                    </span>

                </div>


                <div class="next-vs">

                    VS

                </div>


                <div class="next-team away">

                    <span class="next-team-name">
                        ${match.away}
                    </span>

                    <img
                        src="assets/flags/${match.away.toLowerCase()}.svg"
                        class="flag"
                        alt="${match.away}">

                </div>

            </div>

        `;

        container.appendChild(card);

    });

    // START NEXT ROUND ACTION
    const action =
        document.createElement("div");

    action.className =
        "next-round-action";

    action.innerHTML = `

        <div class="next-round-message">

            <strong>
                ${title} are ready
            </strong>

            <span>
                Analyse the matchups and start the round when you're ready.
            </span>

        </div>

        <button
            id="startNextRoundBtn"
            class="start-next-round-btn">

            Start ${title}

        </button>

    `;

    container.appendChild(action);

     // START ROUND BUTTON
    document
        .getElementById("startNextRoundBtn")
        .addEventListener("click", () => {

            startRound(
                Tournament.nextFixtures,
                Tournament.nextRoundKey
            );

            // Return to the prediction area
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

}