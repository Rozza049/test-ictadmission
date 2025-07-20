const displayElement = document.getElementById('json-data');
fetch('./sample-data/entries.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  })
    .then(data => {
        displayElement.innerHTML = JSON.stringify(data, null, 2)})
