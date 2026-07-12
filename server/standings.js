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