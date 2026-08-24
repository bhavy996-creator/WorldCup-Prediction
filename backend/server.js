const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3000;

const WORLD_CUP_LEAGUE = 1;
const WORLD_CUP_SEASON = 2022;

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


/* =========================
   ALL WORLD CUP FIXTURES
   ========================= */

app.get("/api/world-cup/fixtures", async (req, res) => {

    try {

        const season =
            Number(req.query.season) || WORLD_CUP_SEASON;

        const url =
            `https://v3.football.api-sports.io/fixtures?` +
            `league=${WORLD_CUP_LEAGUE}&season=${season}`;

        const response = await fetch(url, {
            headers: {
                "x-apisports-key":
                    process.env.API_FOOTBALL_KEY
            }
        });

        const data = await response.json();

        if (!response.ok || data.errors?.length) {

            return res.status(500).json({
                error: "API request failed",
                details: data.errors
            });

        }

        const fixtures =
            data.response.map(match => ({

                id: match.fixture.id,

                home: match.teams.home.name,

                away: match.teams.away.name,

                date: match.fixture.date,

                status: match.fixture.status.short,

                homeScore: match.goals.home,

                awayScore: match.goals.away

            }));


        res.json({

            league: WORLD_CUP_LEAGUE,

            season,

            count: fixtures.length,

            fixtures

        });

    } catch (error) {

        console.error(
            "Failed to fetch World Cup fixtures:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});


/* =========================
   KNOCKOUT FIXTURES
   ========================= */

app.get("/api/world-cup/knockout", async (req, res) => {

    try {

        const season =
            Number(req.query.season) || WORLD_CUP_SEASON;

        const url =
            `https://v3.football.api-sports.io/fixtures?` +
            `league=${WORLD_CUP_LEAGUE}&season=${season}`;

        const response = await fetch(url, {
            headers: {
                "x-apisports-key":
                    process.env.API_FOOTBALL_KEY
            }
        });

        const data = await response.json();

        if (!response.ok || data.errors?.length) {

            return res.status(500).json({
                error: "API request failed",
                details: data.errors
            });

        }


        const knockout =
            data.response

                .filter(match => {

                    const round =
                        match.league.round?.toLowerCase() || "";

                    return (
                        round.includes("round of 16") ||
                        round.includes("quarter-finals") ||
                        round.includes("quarter finals") ||
                        round.includes("semi-finals") ||
                        round.includes("semi finals") ||
                        round === "final"
                    );

                })

                .map(match => ({

                    id: match.fixture.id,

                    home: match.teams.home.name,

                    away: match.teams.away.name,

                    date: match.fixture.date,

                    status: match.fixture.status.short,

                    homeScore: match.goals.home,

                    awayScore: match.goals.away,

                    round: match.league.round

                }));


        res.json({

            league: WORLD_CUP_LEAGUE,

            season,

            count: knockout.length,

            fixtures: knockout

        });

    } catch (error) {

        console.error(
            "Failed to fetch knockout fixtures:",
            error
        );

        res.status(500).json({
            error: "Server error"
        });

    }

});


/* =========================
   START SERVER
   ========================= */

app.listen(PORT, () => {

    console.log(
        `Backend running on http://localhost:${PORT}`
    );

});