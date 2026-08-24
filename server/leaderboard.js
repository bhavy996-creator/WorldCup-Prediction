function renderLeaderboard(rows) {
    const board = document.getElementById("leaderboard");
    if (!board) return;

    board.innerHTML = "";

    rows.forEach((player, index) => {
        const row = document.createElement("div");
        row.className = "leaderboard-row";

        let rank;

        if (index === 0) {
            rank = "🥇";
        } else if (index === 1) {
            rank = "🥈";
        } else if (index === 2) {
            rank = "🥉";
        } else {
            rank = index + 1;
        }

        row.innerHTML = `
            <div class="leaderboard-left">
                <span class="rank">${rank}</span>
                <span>${player.name}</span>
            </div>
            <div class="leaderboard-score">${player.total}pts</div>
        `;

        board.appendChild(row);
    });
}

function saveAndRank(entries) {
    const raw = localStorage.getItem(KEY);
    const previous = JSON.parse(raw || "[]");

    entries.forEach(entry => {
        const existing = previous.find(
            player => player.name === entry.name
        );

        if (existing) {
            existing.total += entry.total;
        } else {
            previous.push({
                name: entry.name,
                total: entry.total,
                type: entry.type
            });
        }
    });

    previous.sort((a, b) => b.total - a.total);

    localStorage.setItem(KEY, JSON.stringify(previous));

    renderLeaderboard(previous);
}