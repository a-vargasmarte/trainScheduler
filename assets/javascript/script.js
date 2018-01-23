$(document).ready(function() {

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCWFGnEGroLvgvRFy_P4_vsPZ8M5XQ-dIc",
    authDomain: "trainscheduler-b205d.firebaseapp.com",
    databaseURL: "https://trainscheduler-b205d.firebaseio.com",
    projectId: "trainscheduler-b205d",
    storageBucket: "trainscheduler-b205d.appspot.com",
    messagingSenderId: "598288166111"
  };

firebase.initializeApp(config);

const database = firebase.database();
console.log(database);

let trainVars = {
    trainName : "",
    destination : "",
    firstTime : "",
    frequency : "",
    tableHeaders : ["Train Name", "Destination", "Frequency (min)", "Next Arrival", "Minutes Away"]
};

// we declare a function that adds a header with relevant fields to our #schedule-table

function addHeader() {
    // let's create a variable that stores our row for headers
    let headerRow = $("<tr>")

    // for each index of the tableHeaders array...
    for (let i = 0; i < trainVars.tableHeaders.length; i++) {
        // create a table header
        let header = $("<th>");
        // use .text() to assign captured values
        header.text(trainVars.tableHeaders[i]);
        // append each header to headerRow
        headerRow.append(header);
    }

    // append the headerRow to our table
    $("#schedule-table").append(headerRow);
}

// and we invoke addHeader!
addHeader();

// Now we declare a function that adds a row full of the data captured
function addRow() {
    // first we create a row
    let tableRow = $("<tr>");
    // then we create an array of the captured data
    let dataArray = [trainName, destination, firstTime, frequency];

    // for every index of dataArray...
    for (let i = 0; i < dataArray.length; i++) {
        // we create a table data element
        let dataCell = $("<td>");
        // we add our indices as text
        dataCell.text(dataArray[i]);
        // we append dataCell to our tableRow
        tableRow.append(dataCell);
    }

    // we append our tableRow to our #schedule-table
    $("#schedule-table").append(tableRow);
}

// store database reference in newly declared variable
const dbRef = firebase.database().ref('trainSchedule');
console.log(dbRef);

// capture button click
$("#run-submit").click(function(event) {
    event.preventDefault();

    // get inputs
    trainVars.trainName = $("#name-input").val().trim();
    trainVars.destination = $("#destination-input").val().trim();
    trainVars.firstTime = $("#time-input").val().trim();
    trainVars.frequency = $("#frequency-input").val().trim();
    
    // push inputs
    dbRef.set({
        trainName: trainVars.trainName,
        destination: trainVars.destination,
        firstTime: trainVars.firstTime,
        frequency: trainVars.frequency
    });
});

// on value event
dbRef.on("value", function(snapshot) {
    console.log(snapshot.val());
    trainName = snapshot.val().trainName;
    destination = snapshot.val().destination;
    firstTime = snapshot.val().firstTime;
    frequency = snapshot.val().frequency;
    // we invoke our function addRow
    addRow();
});

});