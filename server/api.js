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

async function fetchKnockoutFixtures(season = 2022) {
    try {

        const response =
            await fetch(
                `${API_BASE}/world-cup/knockout?season=${season}`
            );

        if (!response.ok) {
            throw new Error(
                `Knockout API request failed: ${response.status}`
            );
        }

        const data =
            await response.json();

        return data.fixtures || [];

    } catch (error) {

        console.error(
            "Failed to fetch knockout fixtures:",
            error
        );

        return [];
    }
}

function normalizeFixture(match) {

    let round = "";

    const apiRound =
        (match.round || "").toLowerCase();

    if (apiRound.includes("round of 16")) {
        round = "R16";
    }
    else if (
        apiRound.includes("quarter-finals") ||
        apiRound.includes("quarter finals")
    ) {
        round = "QF";
    }
    else if (
        apiRound.includes("semi-finals") ||
        apiRound.includes("semi finals")
    ) {
        round = "SF";
    }
    else if (apiRound === "final") {
        round = "Final";
    }
    else {
        round = match.round || "Unknown";
    }

    return {
        id: match.id,
        home: match.home,
        away: match.away,
        date: match.date,
        round: round,
        status: match.status,
        homeScore: match.homeScore,
        awayScore: match.awayScore
    };
}

function normalizeFixtures(fixtures) {

    return fixtures.map(
        normalizeFixture
    );

}

async function getApiFixturesForRound(roundKey, season = 2022) {

    const fixtures =
        await fetchKnockoutFixtures(season);

    const normalized =
        normalizeFixtures(fixtures);

    const roundMap = {
        quarterFinals: "QF",
        semiFinals: "SF",
        final: "Final"
    };

    const targetRound =
        roundMap[roundKey];

    if (!targetRound) {
        return [];
    }

    return normalized.filter(
        fixture =>
            fixture.round === targetRound
    );
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

    if (LIVE_RESULTS[key]) {
        return LIVE_RESULTS[key];
    }

    if (
        typeof RESULTS !== "undefined" &&
        RESULTS[key]
    ) {
        return RESULTS[key];
    }

    if (
        typeof KNOCKOUT_RESULTS !== "undefined"
    ) {

        const roundResults =
            KNOCKOUT_RESULTS[Tournament.currentRound];

        if (
            roundResults &&
            roundResults[key]
        ) {
            return roundResults[key];
        }
    }

    return null;
}

