function updateProgress(){

    const inputs =
        document.querySelectorAll(".score-inputs input");

    let completed = 0;

    for(let i = 0; i < inputs.length; i += 2){

        if(
            inputs[i].value !== "" &&
            inputs[i + 1].value !== ""
        ){
            completed++;
        }

    }

    const total = Tournament.currentFixtures.length;

    const percent =
        total > 0
            ? (completed / total) * 100
            : 0;

    document.getElementById("progressText")
        .textContent =
        `${completed} / ${total}`;

    document.getElementById("progressFill")
        .style.width =
        percent + "%";

}