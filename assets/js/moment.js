
$(document).ready(function() {
// Set up Firebase Databse variable
let database = firebase.database();
let converted;


let today = moment().format('hh:mm');
console.log(today);

let nextTrain = 0;
let tArrTime = 0;


function clearForm() {
  $("#trainName").val("");
  $("#destination").val("");
  $("#frequency").val("");
  $("#firstArrival").val("");
}

function randomGif() {
  $(".closest").empty();
  
  let i = Math.floor(Math.random() * 14);
  let gifSource = "assets/images/train-gif" + [i] + ".gif";
  let gif = $("<img width='400' height='400'>");
  gif.attr("src", gifSource );

  $(".closest").append(gif);
  console.log("working");
}



//CANT SEEM TO GET THIS TO WORK THE WAY I WANT. TINKERED FOR A LONG TIME 
function nextTrainArrival(arg1, arg2) {

  let tFrequency = arg1;
  let FirstArrival = arg2;

  let convertArrTime = moment(FirstArrival, "hmm").format("h:mm A");
  console.log(convertArrTime);

  let differenceTimes = moment().diff(convertArrTime, "minutes");
  let tRemainder = differenceTimes % tFrequency;
  tMinutes = tFrequency - tRemainder;
  tArrival = moment().add(tMinutes, "m").format("hh:mm A");

  return [tMinutes, tArrival]
}

  

    // Capture Button Click
    $("#choochoo").on("click", function(event) {
      event.preventDefault();
      
    var trainName = "";
    var trainDestination = "";
    var frequency = 0;
    var firstArrival = "";

      // Grabbed values from text boxes
      trainName = $("#trainName").val().trim();
      trainDestination = $("#destination").val().trim();
      frequency = $("#frequency").val().trim();
      firstArrival = $("#firstArrival").val().trim();

if( trainName && trainDestination && frequency && firstArrival){
      // Code for handling the push
      database.ref().push({
        Train: trainName,
        Destination: trainDestination,
        Frequency: frequency,
        FirstArrival: firstArrival,
        DateAdded: today
      });

      clearForm();s
    } 
    else {
      console.log("Try again")
      clearForm();
    }
    });

    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();


      // Console.loging the last user's data
      console.log(sv.Train);
      console.log(sv.Destination);
      console.log(sv.Frequency);
      console.log(sv.FirstArrival);

      function convertFirstArr() {
        converted = moment(sv.FirstArrival, "hmm").format("h:mm A");
        console.log(converted);
        
        return converted;
      }


      $("#trainSchedule").append(`
            <tr>
                <td>${snapshot.val().Train}</td>
                <td>${snapshot.val().Destination}</td>
                <td>${snapshot.val().Frequency}</td>
                <td>${convertFirstArr()}</td>
                <td>${nextTrainArrival(snapshot.val().Frequency, snapshot.val().FirstArrival)[0]}
            </tr>
           `);


      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

$(document).on("click", "#choochoo", randomGif);


  });
