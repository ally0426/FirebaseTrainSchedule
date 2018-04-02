var config = {
    apiKey: "AIzaSyDHug7m04rQrNRr-gcPIrtZBIPpDPV7nQo",
    authDomain: "train-schedule-78474.firebaseapp.com",
    databaseURL: "https://train-schedule-78474.firebaseio.com",
    projectId: "train-schedule-78474",
    storageBucket: "train-schedule-78474.appspot.com",
    messagingSenderId: "979306719986"
  };
  firebase.initializeApp(config);

  var database = firebase.database()

  var now = moment().format('hh:mm');
  console.log(now)
  var childNumber = 0;

$("#submit-button").on("click", function () {
    

    let trainName = $("#inputName").val()
    let destination = $("#inputDestination").val()
    let firstTime = $("#inputStartTime").val()
    let frequency = $("#inputFrequency").val()
    
    console.log(trainName)
    console.log(destination) 

    database.ref().push({
        name: trainName,
        destination: destination,
        firstTrain: firstTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP       
    });  


})


database.ref().on("child_added", function(snapshot){
    
console.log(snapshot.key)

    childNumber ++
    var firstTimeConverted = moment(snapshot.val().firstTrain, "hh:mm").subtract(1, "years");
    
    var currentTime = moment();
    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    var tRemainder = diffTime % snapshot.val().frequency;
    
    var tMinutesTillTrain = snapshot.val().frequency - tRemainder;
    
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
    let newTR = $("<tr>").attr("id", childNumber)
    
    let newTrain = $("<td>").text(snapshot.val().name)
    let newDestination = $("<td>").text(snapshot.val().destination)
    let newFrequency = $("<td>").text(snapshot.val().frequency)
    let nextArrival = $("<td>").text(moment(nextTrain).format("h:mm"))
    let minutes = $("<td>").text(tMinutesTillTrain)
    let removeButton = $("<button>").addClass("remove btn btn-primary").text("Remove train")
    removeButton.attr("data-childkey", snapshot.key)
    removeButton.attr("data-order", childNumber)

    newTR.append(newTrain, newDestination, newFrequency, nextArrival, minutes, removeButton)
    $("#table-body").append(newTR)

})

$("#table-body").on("click", "button", function() {
    var childKey = $(this).attr("data-childkey")
    var rowNumber = $(this).attr("data-order")
    database.ref().child(childKey).remove()
    $(`#${rowNumber}`).empty()
})
