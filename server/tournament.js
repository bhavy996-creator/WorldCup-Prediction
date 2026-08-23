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

const TOURNAMENT_STORAGE_KEY = "world_cup_tournament";

function getWinner(match) {
    if (match.homeScore > match.awayScore) return match.home;
    if (match.homeScore < match.awayScore) return match.away;
    return match.home;
}

function generateRound(predictions) {
    const winners = [];

    predictions.forEach(match => {
        const winner = getWinner(match);
        if (winner) winners.push(winner);
    });

    const fixtures = [];

    for (let i = 0; i < winners.length; i += 2) {
        if (!winners[i]) continue;

        fixtures.push({
            home: winners[i],
            away: winners[i + 1]
        });
    }

    return fixtures;
}

function getNextRound(currentRound) {
    if (currentRound === "round32") return "quarterFinals";
    if (currentRound === "quarterFinals") return "semiFinals";
    if (currentRound === "semiFinals") return "final";
    return null;
}

function completeTournament(predictions) {
    if (!predictions || predictions.length === 0) return null;

    const finalMatch = predictions[0];
    const champion = getWinner(finalMatch);

    Tournament.champion = champion;
    saveTournamentState();

    return champion;
}

function saveTournamentState() {
    localStorage.setItem(
        TOURNAMENT_STORAGE_KEY,
        JSON.stringify(Tournament)
    );
}

function loadTournamentState() {
    const saved = localStorage.getItem(TOURNAMENT_STORAGE_KEY);

    if (!saved) return false;

    try {
        const state = JSON.parse(saved);

        Tournament.currentRound = state.currentRound || "round32";
        Tournament.currentFixtures = state.currentFixtures || [];
        Tournament.nextRoundKey = state.nextRoundKey || null;
        Tournament.nextFixtures = state.nextFixtures || [];

        Tournament.rounds = state.rounds || {
            round32: [],
            quarterFinals: [],
            semiFinals: [],
            final: []
        };

        Tournament.champion = state.champion || null;

        return true;
    } catch (error) {
        console.error("Failed to load tournament state:", error);
        return false;
    }
}

function resetTournamentState() {
    localStorage.removeItem(TOURNAMENT_STORAGE_KEY);

    Tournament.currentRound = "round32";
    Tournament.currentFixtures = [];
    Tournament.nextRoundKey = null;
    Tournament.nextFixtures = [];

    Tournament.rounds = {
        round32: [],
        quarterFinals: [],
        semiFinals: [],
        final: []
    };

    Tournament.champion = null;
}

function renderChampion(champion) {
    const container = document.getElementById("nextRound");

    if (!container) return;

    container.innerHTML = `
        <div class="champion-card">
            <div class="champion-trophy">🏆</div>
            <div class="champion-label">Your Predicted Champion</div>
            <div class="champion-name">${champion || "Unknown"}</div>
        </div>
    `;
}