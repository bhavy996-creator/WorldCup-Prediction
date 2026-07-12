function collectPredictions(){
    const predictions = [];

    
    const cards = document.querySelectorAll(".match");
    cards.forEach((card, index)=>{
        const inputs = card.querySelectorAll("input");
        const fixture = FIXTURES[index];
        
        const prediction = {
        home: fixture.home,
        away: fixture.away,
        homeScore: Number(inputs[0].value),
        awayScore: Number(inputs[1].value)
    };
    predictions.push(prediction);
    });
    return predictions;

    
}

//loading the predictions
function savePredictions(predictions){
    localStorage.setItem("predictions", JSON.stringify(predictions));
}


function loadPredictions(){
    const raw = localStorage.getItem("predictions");
    return JSON.parse(raw || "[]");
}

function restorePrediction(){
    const predictions = loadPredictions();

    const cards = document.querySelectorAll(".match");
    cards.forEach((card, index)=>{

        if(!predictions[index] ) return;
        const inputs = card.querySelectorAll("input");

        inputs[0].value = predictions[index].homeScore;
        inputs[1].value = predictions[index].awayScore;

    })
}