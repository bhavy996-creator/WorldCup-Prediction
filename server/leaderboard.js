function renderLeaderboard(rows) {

    const board = document.getElementById("leaderboard");

    if (!board) return;

    board.innerHTML = "";

    rows.forEach((player, index) => {

        const row = document.createElement("div");
        row.className = "leaderboard-row";

        let rank;

        if(index === 0){
            rank = "🥇";
        }

        else if(index === 1){
            rank = "🥈";
        }

        else if(index === 2){
            rank = "🥉";
        }

        else{
            rank = index + 1;
        }
        
        let icon;

if (player.type === "user") {
    icon = "👤";
}
else if (player.type === "bot") {
    icon = "🤖";
}
else {
    icon = "🏆";
}
        row.innerHTML = `
            <div class ="leaderboard-left">
            <span class ="rank">${rank}</span>
            <span>${player.name}</span>
            </div>
            <div class ="leaderboard-score">${player.total}pts</div>
        `;

        board.appendChild(row);

    });

}

function saveAndRank(entries) {

    // Save leaderboard
    localStorage.setItem(KEY, JSON.stringify(entries));

    // Read leaderboard
    const raw = localStorage.getItem(KEY);

    const rows = JSON.parse(raw || "[]");

    // Sort highest score first
    rows.sort((a, b) => b.total - a.total);

    // Display leaderboard
    renderLeaderboard(rows);

}