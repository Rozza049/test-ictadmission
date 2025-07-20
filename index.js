const displayElement = document.getElementById('json-data');
displayElement.style.fontSize = '18px';
fetch('./sample-data/entries.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  })
    .then(data => {
        console.log(data)})
