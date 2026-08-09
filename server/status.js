function updateMatchStatus(index, points){

    const status =
        document.getElementById(`status-${index}`);

    status.className = "match-status";

    if(points === 5){

        status.innerHTML =
        `<span class="status-pill exact">
            ✓ Exact • +5 pts
        </span>`;

    }

    else if(points === 2){

        status.innerHTML =
        `<span class="status-pill correct">
            ✓ Correct • +2 pts
        </span>`;

    }

    else{

        status.innerHTML =
        `<span class="status-pill wrong">
            ✕ Wrong • +0 pts
        </span>`;

    }

}