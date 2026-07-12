const FIXTURES = [
    {
        home: "Germany",
        away: "Mexico",
        date: "2026-06-28",
        round: "R32"
    },

    {
        home: "Argentina",
        away: "Switzerland",
        date: "2026-06-29",
        round: "R32"
    },
    {
        home: "France",
        away: "Portugal",
        date: "2026-06-30",
        round: "R32"
    },
    {
        home: "Spain",
        away: "Uruguay",
        date: "2026-07-01",
        round: "R32"
    },
    {
        home: "Brazil",
        away: "Japan",
        date: "2026-07-02",
        round: "R32"
    },
    {
        home: "England",
        away: "Netherlands",
        date: "2026-07-03",
        round: "R32"
    }
];

const strength = {
    Germany: {
        attack: 2.6,
        defense: 0.6
    },

    England: {
        attack: 0.7,
        defense: 1.9
    },

    France: {
        attack: 1.4,
        defense: 1.3
    },

    Spain: {
        attack: 1.3,
        defense: 1.4
    },

    Argentina: {
        attack: 1.7,
        defense: 1.0
    },

    Brazil: {
        attack: 1.6,
        defense: 1.1
    },

    Mexico: {
    attack: 1.2,
    defense: 1.3
},

Switzerland: {
    attack: 1.1,
    defense: 1.0
},

Portugal: {
    attack: 1.8,
    defense: 0.9
},

Uruguay: {
    attack: 1.4,
    defense: 1.2
},

Japan: {
    attack: 1.3,
    defense: 1.1
},

Netherlands: {
    attack: 1.7,
    defense: 1.0
}
};

const RESULTS = {

    "Germany|Mexico": {
        home:2,
        away:1
    },

    "Argentina|Switzerland": {
        home:2,
        away:0
    },

    "France|Portugal":{
        home:1,
        away:1
    },

    "Spain|Uruguay":{
        home:3,
        away:1
    },

    "Brazil|Japan":{
        home:2,
        away:0
    },

    "England|Netherlands":{
        home:1,
        away:2
    }

};