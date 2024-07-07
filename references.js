let referenceData = {};

// Function to save reference data
function saveReference() {
    const form = document.getElementById('referenceForm');
    const formData = new FormData(form);

    const startNumber = formData.get('startNumber');
    referenceData[startNumber] = {
        ageGroup: formData.get('ageGroup'),
        discipline: formData.get('discipline'),
        club: formData.get('club'),
        starterName: formData.get('starterName')
    };

    updateReferenceTable();
    form.reset();
}

// Function to update the reference table
function updateReferenceTable() {
    const tableBody = document.querySelector('#referenceTable tbody');
    tableBody.innerHTML = '';

    for (const startNumber in referenceData) {
        const ref = referenceData[startNumber];
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${startNumber}</td>
            <td>${ref.ageGroup}</td>
            <td>${ref.discipline}</td>
            <td>${ref.club}</td>
            <td>${ref.starterName}</td>
        `;

        tableBody.appendChild(row);
    }
}

// Function to save reference data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('referenceData', JSON.stringify(referenceData));
}

// Function to load reference data from localStorage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('referenceData');
    if (savedData) {
        referenceData = JSON.parse(savedData);
        updateReferenceTable();
    }
}

// Load data from localStorage on page load
window.onload = loadFromLocalStorage;
window.onbeforeunload = saveToLocalStorage;
