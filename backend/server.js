const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3000;

const WORLD_CUP_SEASON = 2022;

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/api/world-cup/fixtures", async (req, res) => {
    try {
        const url =
            `https://v3.football.api-sports.io/fixtures?` +
            `league=1&season=${WORLD_CUP_SEASON}`;

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

        const fixtures = data.response.map(match => ({
            id: match.fixture.id,
            home: match.teams.home.name,
            away: match.teams.away.name,
            date: match.fixture.date,
            status: match.fixture.status.short,
            homeScore: match.goals.home,
            awayScore: match.goals.away
        }));

        res.json({
            season: WORLD_CUP_SEASON,
            count: fixtures.length,
            fixtures
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Server error"
        });
    }
});

app.listen(PORT, () => {
    console.log(
        `Backend running on http://localhost:${PORT}`
    );
});