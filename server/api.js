const API_BASE = "http://localhost:3000/api";
const API_SEASON = 2022;

let LIVE_RESULTS = {};
let LIVE_FIXTURES = {};



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
    season = API_SEASON
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
    season = API_SEASON
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
   LOAD ROUND FIXTURES
   ========================= */

async function loadRoundFixtures(roundKey) {

    if (roundKey === "round32") {

        const fixtures =
            await fetchWorldCupFixtures();

        return fixtures
            .filter(
                match =>
                    match.home &&
                    match.away
            )
            .map(match => ({

                id: match.id,

                home: match.home,

                away: match.away,

                date: match.date,

                round: "R32",

                status: match.status,

                homeScore: match.homeScore,

                awayScore: match.awayScore

            }));

    }

    return await getApiFixturesForRound(
        roundKey,
        API_SEASON
    );

}


/* =========================
   CREATE MATCH KEY
   ========================= */

function createMatchKey(home, away) {

    return [
        home,
        away
    ]
        .sort()
        .join("|");

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
                API_SEASON
            );

    }

    const results = {};

    const allFixtures = {};


    fixtures.forEach(match => {

        const key =
            createMatchKey(
                match.home,
                match.away
            );


        /* Store every fixture */

        allFixtures[key] = {

            homeTeam: match.home,

            awayTeam: match.away,

            status: match.status,

            home: match.homeScore,

            away: match.awayScore

        };


        /* Store only completed matches */

        if (
            match.status !== "FT" ||
            match.homeScore === null ||
            match.awayScore === null
        ) {

            return;

        }


        results[key] = {

            homeTeam: match.home,

            awayTeam: match.away,

            home: match.homeScore,

            away: match.awayScore

        };

    });


    LIVE_RESULTS =
        results;

    LIVE_FIXTURES =
        allFixtures;


    return LIVE_RESULTS;

}


/* =========================
   GET ACTUAL RESULT
   ========================= */

function getActualResult(prediction) {

    const key =
        createMatchKey(
            prediction.home,
            prediction.away
        );


    /* =========================
       LIVE API RESULT
       ========================= */

    const liveResult =
        LIVE_RESULTS[key];

    if (liveResult) {

        /*
         API and prediction have
         the same home/away order.
        */

        if (
            liveResult.homeTeam ===
                prediction.home &&
            liveResult.awayTeam ===
                prediction.away
        ) {

            return {

                home:
                    liveResult.home,

                away:
                    liveResult.away

            };

        }


        /*
         API has reversed the
         home/away order.
        */

        return {

            home:
                liveResult.away,

            away:
                liveResult.home

        };

    }


    /* =========================
       LOCAL R32 RESULT
       ========================= */

    if (
        typeof RESULTS !==
        "undefined"
    ) {

        const directKey =
            prediction.home +
            "|" +
            prediction.away;

        const reversedKey =
            prediction.away +
            "|" +
            prediction.home;


        if (
            RESULTS[directKey]
        ) {

            return RESULTS[directKey];

        }


        if (
            RESULTS[reversedKey]
        ) {

            const reversed =
                RESULTS[reversedKey];

            return {

                home:
                    reversed.away,

                away:
                    reversed.home

            };

        }

    }


    /* =========================
       LOCAL KNOCKOUT FALLBACK
       ========================= */

    if (
        typeof KNOCKOUT_RESULTS !==
        "undefined"
    ) {

        const roundResults =
            KNOCKOUT_RESULTS[
                Tournament.currentRound
            ];

        if (roundResults) {

            const directKey =
                prediction.home +
                "|" +
                prediction.away;

            const reversedKey =
                prediction.away +
                "|" +
                prediction.home;


            if (
                roundResults[directKey]
            ) {

                return roundResults[
                    directKey
                ];

            }


            if (
                roundResults[reversedKey]
            ) {

                const reversed =
                    roundResults[
                        reversedKey
                    ];

                return {

                    home:
                        reversed.away,

                    away:
                        reversed.home

                };

            }

        }

    }


    return null;

}


/* =========================
   GET FIXTURE STATUS
   ========================= */

function getFixtureStatus(prediction) {

    const key =
        createMatchKey(
            prediction.home,
            prediction.away
        );

    const fixture =
        LIVE_FIXTURES[key];


    if (!fixture) {

        return "UNKNOWN";

    }


    if (
        fixture.status === "FT"
    ) {

        return "FT";

    }


    return "UPCOMING";

}