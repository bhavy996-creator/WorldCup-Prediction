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

    const total = FIXTURES.length;

    const percent =
        (completed / total) * 100;

    document.getElementById("progressText")
        .textContent =
        `${completed} / ${total}`;

    document.getElementById("progressFill")
        .style.width =
        percent + "%";

}