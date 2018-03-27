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

$("#submit-button").on("click", function () {

    // event.preventDefault();
    
    let trainName = $("#inputName").val()
    let destination = $("#inputDestination").val()
    let firstTime = $("#inputStartTime").val()
    let frequency = $("#inputFrequency").val()


    // let minutesAway = nextArrival - now;
    







    

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
    
    let newTR = $("<tr>")
    
    let newTrain = $("<td>").text(snapshot.val().name)
    let newDestination = $("<td>").text(snapshot.val().destination)
    let newStartTime = $("<td>").text(snapshot.val().firstTrain)
    // let newPayRate = $("<td>").text(snapshot.val().rate)

    newTR.append(newTrain)
    newTR.append(newDestination)
    newTR.append(newStartTime)
    newTR.append("<td class='next-arrival'>")
    newTR.append("<td class='minutes-away'>")
    $("#table-body").append(newTR)

})
