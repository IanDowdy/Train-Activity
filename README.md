# Train-Activity

Welcome to __Train Scheduler__!  

This simple application allows you to track the names, destinations and the times of arrival
accross America!

Please use military time filling out the form! :)

I could not for the life of me get the time to display correctly,
I tinkered with moment() for a long while but I'm not certain I understand how that bit of code
Andrew slacked out calculates the correct time:

// Calculate the minutes until arrival using hardcore math
// To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
// and find the modulus between the difference and the frequency.
var differenceTimes = moment().diff(trainTime, "minutes");
var tRemainder = differenceTimes % tFrequency;
tMinutes = tFrequency - tRemainder;
// To calculate the arrival time, add the tMinutes to the current time
tArrival = moment().add(tMinutes, "m").format("hh:mm A");

