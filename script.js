let entries = [];
let startersData = {}; // Object to store starters data

// Function to fetch starters data from another page or API
async function fetchStartersData() {
    // Simulate fetching data from an external source
    startersData = {
        "1": { club: "Verein A", name: "Starter A" },
        "2": { club: "Verein B", name: "Starter B" },
        "3": { club: "Verein C", name: "Starter C" }
        // Add more data as needed
    };
}

function saveEntry() {
    const form = document.getElementById('entryForm');
    const formData = new FormData(form);
    const startNumber = formData.get('startNumber');
    const starterInfo = startersData[startNumber] || { club: "", name: "" };

    const entry = {
        tournament: formData.get('tournament'),
        ageGroup: formData.get('ageGroup'),
        discipline: formData.get('discipline'),
        startNumber: startNumber,
        club: starterInfo.club,
        starterName: starterInfo.name,
        scores: []
    };

    formData.getAll('score').forEach(score => {
        if (score) {
            entry.scores.push(parseInt(score));
        }
    });

    const sortedScores = [...entry.scores].sort((a, b) => a - b);
    entry.lowestScore = sortedScores[0];
    entry.highestScore = sortedScores[sortedScores.length - 1];
    entry.pointScore = entry.scores.reduce((a, b) => a + b, 0) - entry.lowestScore - entry.highestScore;
    entry.totalScore = entry.scores.reduce((a, b) => a + b, 0);

    entries.push(entry);
    updateResultsTable();

    // Retain tournament, ageGroup, and discipline; increment startNumber
    form.querySelector('#startNumber').value = parseInt(startNumber) + 1;
}

function updateResultsTable() {
    const tableBody = document.querySelector('#resultsTable tbody');
    tableBody.innerHTML = '';

    entries.sort((a, b) => b.pointScore - a.pointScore);

    entries.forEach((entry, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.tournament}</td>
            <td>${entry.ageGroup}</td>
            <td>${entry.discipline}</td>
            <td>${entry.startNumber}</td>
            <td>${entry.club}</td>
            <td>${entry.starterName}</td>
            <td>${entry.scores.join(', ')}</td>
            <td>${entry.lowestScore}, ${entry.highestScore}</td>
            <td>${entry.pointScore}</td>
            <td>${entry.totalScore}</td>
        `;

        tableBody.appendChild(row);
    });
}

function nextInput(event) {
    if (event.key === "Enter") {
        const formElements = Array.from(event.target.form.elements);
        const index = formElements.indexOf(event.target);
        if (index > -1 && index < formElements.length - 1) {
            formElements[index + 1].focus();
        }
        event.preventDefault();
    }
}

// Fetch starters data on page load
window.onload = fetchStarters
