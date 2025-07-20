const displayElement = document.getElementById('json-data');
displayElement.style.fontSize = '18px';
fetch('./sample-data/data.json')
.then(response => response.json())
.then(data => {
    console.log(data);
    let text = "";
    while (data.length>0)
    {
        let newestDate = new Date("1990-01-01");
        let currentData;
        for (let i = 0; i<=data.length-1; i++)
        {
            if (newestDate.getTime()<new Date(data[i].isoTime).getTime())
            {
                currentData=i;
                newestDate=new Date(data[i].isoTime);
            }
        }
        text += `<h4><br>${data[currentData].title}</h4><p>${data[currentData].body}<br>Time: ${new Date(data[currentData].isoTime).toString()}<br>Latitude: ${data[currentData].lat}<br>Longitude: ${data[currentData].lon}<br></p>`;
        data.splice(currentData, 1);
    }
    displayElement.innerHTML = text;
})

var modal = document.getElementById("inputModal");
var btn = document.getElementById("modalButton");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
