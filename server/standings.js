const FLAGS = {
    Spain: "assets/flags/spain.svg",
    Uruguay: "assets/flags/uruguay.svg",
    Brazil: "assets/flags/brazil.svg",
    Japan: "assets/flags/japan.svg",
    England: "assets/flags/england.svg",
    Netherlands: "assets/flags/netherlands.svg",
    Portugal: "assets/flags/portugal.svg",
    Germany: "assets/flags/germany.svg",
    Argentina: "assets/flags/argentina.svg",
    Mexico: "assets/flags/mexico.svg",
    Switzerland: "assets/flags/switzerland.svg",
    France: "assets/flags/france.svg",
    Italy: "assets/flags/italy.svg",
    Croatia: "assets/flags/croatia.svg",
    Morocco: "assets/flags/morocco.svg",
    Belgium: "assets/flags/belgium.svg"
};

function getFlag(teamName) {
    const src = FLAGS[teamName];
    if (!src) return "";
    return `<img src="${src}" class="flag" alt="${teamName}">`;
}

function createStandings() {
    const standings = {};
    FIXTURES.forEach((fixture) => {

        if (!standings[fixture.home]) {
            standings[fixture.home] = {
                name: fixture.home,
                played: 0,
                wins: 0,
                draws: 0,
                losses: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                goalDifference: 0,
                points: 0
            };
        }
        if (!standings[fixture.away]) {
            standings[fixture.away] = {
                name: fixture.away,
                played: 0,
                wins: 0,
                draws: 0,
                losses: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                goalDifference: 0,
                points: 0
            };
        }

    });

    return standings;
}

function updateStandings(standings, result) {
    const homeTeam = standings[result.home];
    const awayTeam = standings[result.away];

    homeTeam.played++;
    awayTeam.played++;

    homeTeam.goalsFor += result.homeScore;
    homeTeam.goalsAgainst += result.awayScore;
    awayTeam.goalsFor += result.awayScore;
    awayTeam.goalsAgainst += result.homeScore;

    if (result.homeScore > result.awayScore) {
        homeTeam.wins++;
        awayTeam.losses++;
        homeTeam.points += 3;
    }
    else if (result.homeScore < result.awayScore) {
        awayTeam.wins++;
        homeTeam.losses++;
        awayTeam.points += 3;
    }
    else {
        homeTeam.draws++;
        awayTeam.draws++;
        homeTeam.points++;
        awayTeam.points++;
    }

    homeTeam.goalDifference = homeTeam.goalsFor - homeTeam.goalsAgainst;
    awayTeam.goalDifference = awayTeam.goalsFor - awayTeam.goalsAgainst;
}

function calculateStandings(predictions) {
    const standings = createStandings();
    predictions.forEach((prediction) => {
        updateStandings(standings, prediction);
    });
    return standings;
}

function sortStandings(standings) {
    const teams = Object.values(standings);

    teams.sort((a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points;
        }
        if (b.goalDifference !== a.goalDifference) {
            return b.goalDifference - a.goalDifference;
        }
        return b.goalsFor - a.goalsFor;
    });
    return teams;
}

function renderStandings(teams) {

    const body = document.getElementById("standingsBody");

    body.innerHTML = "";

    teams.forEach((team, index) => {

        const row = document.createElement("tr");
        const pos = index + 1;

        if (pos <= 2) {
            row.classList.add("qualified-row");
        }

        const gdDisplay = team.goalDifference > 0
            ? `+${team.goalDifference}`
            : team.goalDifference;

        row.innerHTML = `
            <td><span class="pos-badge">${pos}</span></td>
            <td class="team-cell">
                ${getFlag(team.name)}
                <span class="team-name">${team.name}</span>
            </td>
            <td>${team.played}</td>
            <td>${team.wins}</td>
            <td>${team.draws}</td>
            <td>${team.losses}</td>
            <td>${team.goalsFor}</td>
            <td>${team.goalsAgainst}</td>
            <td>${gdDisplay}</td>
            <td class="pts-cell">${team.points}</td>
        `;

        body.appendChild(row);

    });

}