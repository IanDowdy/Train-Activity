
$(document).ready(function() {
// Set up Firebase Databse variable
let database = firebase.database();
let converted;


let today = moment().format('hh:mm');
console.log(today);

function clearForm() {      //Function Called after submission attempts.
  $("#trainName").val("");
  $("#destination").val("");
  $("#frequency").val("");
  $("#firstArrival").val("");
}

function randomGif() {      //Just because.
  $(".closest").empty();
  
  let i = Math.floor(Math.random() * 14);
  let gifSource = "assets/images/train-gif" + [i] + ".gif";
  let gif = $("<img width='400' height='400'>");
  gif.attr("src", gifSource );

  $(".closest").append(gif);
  console.log("working");
}



//CANT SEEM TO GET THIS TO WORK THE WAY I WANT, UNSURE HOW TO GET PROPERLY USE THAT SNIPPET ANDREW SENT OUT ON SATURDAY
function nextTrainArrival(arg1, arg2) {

  let tFrequency = arg1; 
  let FirstArrival = arg2;

  //let convertArrTime = moment(FirstArrival, "hmm").format("h:mm A");
  //console.log(convertArrTime);

  let differenceTimes = moment().diff(FirstArrival, "minutes");
  let tRemainder = differenceTimes % tFrequency;    //Specifically I really don't understand how the modulus is supposed to be used here.
  tMinutes = tFrequency - tRemainder;
  tArrival = moment().add(tMinutes, "m").format("hh:mm A");

  console.log(differenceTimes, tFrequency, FirstArrival, tRemainder, tMinutes, tArrival);

  return [tMinutes, tArrival]
}

  

    // Capture Button Click
    $("#choochoo").on("click", function(event) {
      event.preventDefault();
      
    let trainName = "";
    let trainDestination = "";
    let frequency = 0;
    let firstArrival = "";

      // Grabbed values from text boxes
      trainName = $("#trainName").val().trim();
      trainDestination = $("#destination").val().trim();
      frequency = $("#frequency").val().trim();
      firstArrival = $("#firstArrival").val().trim();

if( trainName && trainDestination && frequency && firstArrival){  //All forms must contain content
      // Code for handling the push
      database.ref().push({
        Train: trainName,
        Destination: trainDestination,
        Frequency: frequency,
        FirstArrival: firstArrival,
        DateAdded: today
      });

      clearForm();
    } 
    else {
      console.log("Try again")
      clearForm();
    }
    });

    // When a child (element? Key? Value? Data? Object i think..) is changed a snapshot is taken
    database.ref().on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      let sv = snapshot.val();


      // Console.logging the last user's data
      console.log(sv.Train);
      console.log(sv.Destination);
      console.log(sv.Frequency);
      console.log(sv.FirstArrival);


      //Function to change the user's input into the correct format to be displayed.
      function convertFirstArr() {
        converted = moment(sv.FirstArrival, "hmm").format("h:mm A");
        console.log(converted);
        
        return converted;
      }

      //add values captured on Firebase to DOM
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

    //Play a random train gif everytime submit button is clicked
$(document).on("click", "#choochoo", randomGif);


  });
