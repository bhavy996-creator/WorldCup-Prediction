const FLAG = {
    flag = `
    <img src = "assets/flags/spain.svg" class="flag" alt="SP">
    <img src = "assets/flags/uruguay.svg" class="flag" alt="UR">
    <img src = "assets/flags/brazil.svg" class="flag" alt="BR">
    <img src = "assets/flags/japan.svg" class="flag" alt="JA">
    <img src = "assets/flags/england.svg" class="flag" alt="EN">
    <img src = "assets/flags/netherlands.svg" class="flag" alt="NE">
    <img src = "assets/flags/portugal.svg" class="flag" alt="PO">
    <img src = "assets/flags/germany.svg" class="flag" alt="GE">
    <img src = "assets/flags/argentina.svg" class="flag" alt="AR">
    <img src = "assets/flags/mexico.svg" class="flag" alt="ME">
    <img src = "assets/flags/switzerland.svg" class="flag" alt="SW">
    <img src = "assets/flags/france.svg" class="flag" alt="FR">`
};

function getFlag(teamName){
    return FLAGS[teamName] || "🏳️";
}

function createStandings() {
    const standings = {};
    FIXTURES.forEach((fixture) =>{

        if(!standings[fixture.home]){
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
        if(!standings[fixture.away]){

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

function updateStandings(standings, result){
    const homeTeam = standings[result.home];
    const awayTeam = standings[result.away];

    homeTeam.played++;
    awayTeam.played++;

    homeTeam.goalsFor += result.homeScore;
    homeTeam.goalsAgainst += result.awayScore;
    awayTeam.goalsFor += result.awayScore;
    awayTeam.goalsAgainst += result.homeScore;

    if(result.homeScore > result.awayScore){
        homeTeam.wins++;
        awayTeam.losses++;
        homeTeam.points += 3;
    }

    else if (result.homeScore < result.awayScore){
        awayTeam.wins++;
        homeTeam.losses++;
        awayTeam.points += 3;
    }

    else{
        homeTeam.draws++;
        awayTeam.draws++;
        homeTeam.points++;
        awayTeam.points++;
    }

    homeTeam.goalDifference = homeTeam.goalsFor - homeTeam.goalsAgainst;
    awayTeam.goalDifference = awayTeam.goalsFor - awayTeam.goalsAgainst;

}

function calculateStandings(predictions){
    const standings = createStandings();
    predictions.forEach((prediction)=>{
        updateStandings(standings, prediction);
    });
    return standings;
}

function sortStandings(standings){
    const teams = Object.values(standings);

    teams.sort((a, b)=>{
        if(b.points !== a.points){
            return b.points - a.points;
        }
        if(b.goalDifference !== a.goalDifference){
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
                <span class="team-flag">${getFlag(team.name)}</span>
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