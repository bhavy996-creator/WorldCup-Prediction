const API_BASE = "http://localhost:3000/api";

let LIVE_RESULTS = {};


/* =========================
   FETCH ALL WORLD CUP FIXTURES
   ========================= */

async function fetchWorldCupFixtures() {

    try {

        const response =
            await fetch(
                `${API_BASE}/world-cup/fixtures`
            );

        if (!response.ok) {

            throw new Error(
                `API request failed: ${response.status}`
            );

        }

        const data =
            await response.json();

        return data.fixtures || [];

    } catch (error) {

        console.error(
            "Failed to fetch World Cup fixtures:",
            error
        );

        return [];

    }

}


/* =========================
   FETCH KNOCKOUT FIXTURES
   ========================= */

async function fetchKnockoutFixtures(
    season = 2022
) {

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


/* =========================
   NORMALIZE FIXTURE
   ========================= */

function normalizeFixture(match) {

    let round = "";

    const apiRound =
        (match.round || "").toLowerCase();


    if (
        apiRound.includes("round of 16")
    ) {

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

    else if (
        apiRound === "final"
    ) {

        round = "Final";

    }

    else {

        round =
            match.round || "Unknown";

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


/* =========================
   NORMALIZE FIXTURES
   ========================= */

function normalizeFixtures(fixtures) {

    return fixtures.map(
        normalizeFixture
    );

}


/* =========================
   GET FIXTURES FOR ROUND
   ========================= */

async function getApiFixturesForRound(
    roundKey,
    season = 2022
) {

    const fixtures =
        await fetchKnockoutFixtures(
            season
        );

    const normalized =
        normalizeFixtures(
            fixtures
        );


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


/* =========================
   FETCH ACTUAL RESULTS
   ========================= */

async function fetchWorldCupResults() {

    let fixtures = [];


    if (
        Tournament.currentRound ===
        "round32"
    ) {

        fixtures =
            await fetchWorldCupFixtures();

    }

    else {

        fixtures =
            await fetchKnockoutFixtures(
                2022
            );

    }


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
            match.home +
            "|" +
            match.away;


        results[key] = {

            home: match.homeScore,

            away: match.awayScore

        };

    });


    LIVE_RESULTS = results;


    return LIVE_RESULTS;

}


/* =========================
   GET ACTUAL RESULT
   ========================= */

function getActualResult(prediction) {

    const key =
        prediction.home +
        "|" +
        prediction.away;


    /* Live API result */

    if (
        LIVE_RESULTS[key]
    ) {

        return LIVE_RESULTS[key];

    }


    /* Existing local R32 results */

    if (
        typeof RESULTS !== "undefined" &&
        RESULTS[key]
    ) {

        return RESULTS[key];

    }


    /* Existing knockout fallback */

    if (
        typeof KNOCKOUT_RESULTS !==
        "undefined"
    ) {

        const roundResults =
            KNOCKOUT_RESULTS[
                Tournament.currentRound
            ];


        if (
            roundResults &&
            roundResults[key]
        ) {

            return roundResults[key];

        }

    }


    return null;

}