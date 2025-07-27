const displayElement = document.getElementById('json-data');
displayElement.style.fontSize = '18px';

var modal = document.getElementById("inputmodal");
var entrBtn = document.getElementById("acceptentry")
var modBtn = document.getElementById("modalbutton");
var span = document.getElementsByClassName("close")[0];
var error = document.getElementById("entryerror");

var title = document.getElementById("title");
var desc = document.getElementById("description");
var lat = document.getElementById("latitude");
var lon = document.getElementById("longitude");
lon.value = "";
lat.value = "";
title.value = "";
desc.value = "";

let count = 1;

fetch('./sample-data/data.json')
.then(response => response.json())
.then(data => listEntries(data))

function listEntries(entries) {
    let text = "";
    count += entries;
    let newestDate;
    let currentData;
    while (entries.length>0) //iterate through the entries
    {
        newestDate = new Date("1990-01-01"); //despite the IDs being in chronological order already, it would be good practice to make sure of this
        for (let i = 0; i<=entries.length-1; i++)
        {
            if (newestDate.getTime()<new Date(entries[i].isoTime).getTime())
            {
                currentData=i;
                newestDate=new Date(entries[i].isoTime);
            }
        }
        text += `<h4><br>${entries[currentData].title}</h4><p>${entries[currentData].body}<br>Time: ${new Date(entries[currentData].isoTime).toString()}<br>Latitude: ${entries[currentData].lat}<br>Longitude: ${entries[currentData].lon}<br></p>`; //The format for new entries
        entries.splice(currentData, 1);

    }
    text += displayElement.innerHTML
    displayElement.innerHTML = text;
}

modBtn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
    lon.value = "";
    lat.value = "";
    title.value = "";
    desc.value = "";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        lon.value = "";
        lat.value = "";
        title.value = "";
        desc.value = "";
    }
}

entrBtn.onclick = function() {
    var date = Date.now();
    var newEntry;
    if (title.value == "" || desc.value == "" || (!(lon.value == "" && lat.value == "") && !(lon.value != "" && lat.value != "" && !isNaN(lat.value) && !isNaN(lon.value) && lon.value < 180 && lon.value > -180 && lat.value < 90 && lat.value > -90))) { //checks for valid values including the range of values for latitude and longitude
        error.innerHTML = "Error, invalid input";
    } else {
        error.innerHTML = "";
        if (lon.value == "")
        {
            lon.value = "null";
            lat.value = "null";
        }
        count = count + 1;
        newEntry={"id": count, "title": title.value, "body": desc.value, "isoTime": date, "lat": lat.value, "lon": lon.value};
        let text = `<h4><br>${newEntry.title}</h4><p>${newEntry.body}<br>Time: ${new Date(newEntry.isoTime).toString()}<br>Latitude: ${newEntry.lat}<br>Longitude: ${newEntry.lon}<br></p>` + displayElement.innerHTML; //the format for new entries
        displayElement.innerHTML = text;
        modal.style.display = "none"; //reset the modal
        lon.value = "";
        lat.value = "";
        title.value = "";
        desc.value = "";
    }
}
