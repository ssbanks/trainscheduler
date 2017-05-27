
//Set Initial Variable Values

var database = firebase.database();
var name ='';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';


$(document).ready(function() {

     $("#add-train").on("click", function() {
     	
         	name = $('#name-input').val().trim();
         	destination = $('#destination-input').val().trim();
         	firstTrainTime = $('#first-train-time-input').val().trim();
         	frequency = $('#frequency-input').val().trim();
          firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          tRemainder = diffTime % frequency;
          minutesTillTrain = frequency - tRemainder;
          nextTrain = moment().add(minutesTillTrain, "minutes");
          nextTrainFormatted = moment(nextTrain).format("hh:mm");

     	// Code for the push
       	var keyHolder = {
       		name: name,
       		destination: destination,
       		firstTrainTime: firstTrainTime,  
       		frequency: frequency,
          nextTrainFormatted: nextTrainFormatted,
          minutesTillTrain: minutesTillTrain
       	};

      database.ref().push(keyHolder);
          
        // Clears all of the text-boxes
          $('#name-input').val('');
         	$('#destination-input').val('');
         	$('#first-train-time-input').val('');
         	$('#frequency-input').val('');

     	return false;
     });
          
     database.ref().on("child_added", function(childSnapshot) {
	// full list of items to the well

		  $('.train-schedule').append("<tr class='table-row'>" + childSnapshot.val() +
               "<td class='col-xs-3'>" + childSnapshot.val().name +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().destination +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().frequency +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + // Next Arrival Formula ()
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + // Minutes Away Formula
               "</td>" +
              //Remove button- needs debugging
               //+"<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
              "</tr>");
  // Handle the errors
  }, function(errorObject){
	
    });
     //Remove button works, but unable to remove from DB without error
     //TO-DO fix
     //$("body").on("click", ".remove-train", function(){
     //$(this).closest ('tr').remove();
     //getKey = $(this).parent().parent().attr('id');
     //dataRef.child(getKey).remove();
    //});
    });



