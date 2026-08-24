const API_BASE = "http://localhost:3000/api";

let LIVE_RESULTS = {};

async function fetchWorldCupFixtures() {
    try {
        const response =
            await fetch(`${API_BASE}/world-cup/fixtures`);

        if (!response.ok) {
            throw new Error(
                `API request failed: ${response.status}`
            );
        }

        const data = await response.json();

        return data.fixtures || [];

    } catch (error) {

        console.error(
            "Failed to fetch World Cup fixtures:",
            error
        );

        return [];
    }
}

async function fetchWorldCupResults() {
    const fixtures =
        await fetchWorldCupFixtures();

    const results = {};

    fixtures.forEach(match => {

        if (
            match.status !== "FT" ||
            match.homeScore === null ||
            match.awayScore === null
        ) {
            return;
        }

        const key =
            match.home + "|" + match.away;

        results[key] = {
            home: match.homeScore,
            away: match.awayScore
        };

    });

    LIVE_RESULTS = results;

    return LIVE_RESULTS;
}

function getActualResult(prediction) {

    const key =
        prediction.home + "|" + prediction.away;

    // First prefer live API result
    if (LIVE_RESULTS[key]) {
        return LIVE_RESULTS[key];
    }

    // Round of 32 fallback
    if (
        Tournament.currentRound === "round32" &&
        typeof RESULTS !== "undefined"
    ) {
        return RESULTS[key] || null;
    }

    // Knockout fallback
    if (
        typeof KNOCKOUT_RESULTS !== "undefined"
    ) {

        const roundResults =
            KNOCKOUT_RESULTS[Tournament.currentRound];

        if (roundResults && roundResults[key]) {
            return roundResults[key];
        }

    }

    return null;
}