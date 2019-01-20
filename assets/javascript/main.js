var config = {
    apiKey: "AIzaSyAdo6N3hMWZGkpSw0bfYEkos4xDfytv-ys",
    authDomain: "traintimee.firebaseapp.com",
    databaseURL: "https://traintimee.firebaseio.com",
    projectId: "traintimee",
    storageBucket: "traintimee.appspot.com",
    messagingSenderId: "70499967044"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var connections = database.ref("/connections");
  var connected = database.ref(".info/connected")
 
      
    console.log(database.ref('.info/'));
    connected.on("value", function(snap) {

        // If they are connected..
        if (snap.val()) {
      
          // Add user to the connections list.
          var con = connections.push(true);
      
          // Remove user from the connection list when they disconnect.
          con.onDisconnect().remove();
        }
      });
    
    
    
    $("#submit-btn").on("click", function(event){
            event.preventDefault();
            
           var trainName = $("#trainName").val().trim();
           var destination = $("#destination").val().trim();
           var firstTrainTime = $("#firstTrainTime").val().trim();
        //    var firstTt = moment(firstTrainTime).format("hh:mm a");
           var frequency = $("#frequency").val().trim();

           var timeToMins = moment(firstTrainTime, "HH:mm").subtract(1, "years");
           var timeDifferent = moment().diff(moment(timeToMins), "minutes");
           var remainder = timeDifferent % frequency;
           var minTillTrain = frequency - remainder;
           var nextTrain = moment().add(minTillTrain, "minutes");
           var nextTrainTime = moment(nextTrain).format("hh:mm a");       
                
            if(trainName === ""){

                alert("Please Enter Train Name")
                alert("Please Enter Destination")
                alert("Please Enter Train Time")
                alert("Please Enter Frequency")
            
            }
            else if (destination === ""){
                alert("Please Enter Destination")
                alert("Please Enter Train Time")
                alert("Please Enter Frequency")
            
            }
            else if (firstTrainTime === ""){
                alert("Please Enter Train Time")
                alert("Please Enter Frequency")
            }
            else if (frequency === ""){
                alert("Please Enter Frequency")

            }
            else{

            var addRow = "<tr><td>"+ trainName +"</td><td>" + destination + "</td><td>" + firstTrainTime + "</td><td>" + nextTrainTime + "</td><td>" + frequency + "</td><td>" + minTillTrain +"</td></tr>"
        
                $("table tbody").append(addRow);
            }
        
            database.ref("/traintime").set({
                tName: trainName,
                dest: destination,
                nextTT: nextTrainTime,
                freq: frequency,
                maway: minTillTrain
            })
    })
