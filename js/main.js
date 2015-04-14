
var intervalID;
var east = 402130;
var west = 405231;
var west14 =403893;
var east14=401579;
var busLine = "http://bustime.mta.info/api/siri/stop-monitoring.json?key=key&callback=?&OperatorRef=MTA&MonitoringRef=";
var M23 = "&LineRef=MTA%20NYCT_M23";
var M14D = "&LineRef=MTA%20NYCT_M14D";
function StopData(stop, busName){
	$.getJSON(busLine + stop + busName,
		function(data){
			// debugger; //&MonitoringRef=402130 = east side bus stop
			// debugger;
    var parsedData = data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[0].MonitoredVehicleJourney;

	var latitude = parsedData.VehicleLocation.Latitude;
	var Longitude = parsedData.VehicleLocation.Longitude;		
	var GAstop = parsedData.MonitoredCall.StopPointName;
	var stopsFromGa = parsedData.MonitoredCall.Extensions.Distances.StopsFromCall;
	     console.log(stopsFromGa);	
	 var presentDist = parsedData.MonitoredCall.Extensions.Distances.PresentableDistance;
	 var busHead = parsedData.DestinationName;

		// $(".latitude").text("Latitude: " + latitude + ' ' + "Longitude: " + Longitude);
		// $(".GAstop").text(GAstop);
	    // console.log(presentDist);
	 updateStopData(busHead, stopsFromGa, presentDist);

}).fail(function(data){
	
});
 }		
// StopData();
function updateStopData(destination, numStops, distance, latitude, Longitude) {
   $(".stopsFromGa").text(numStops);
    $(".presentDist").text("The bus is " + ' ' + distance);
    $(".busHead").text(destination);
//updates html

}
//if button id = west 14 or eas =t 14 hide east west
function locChoice(){
	$(".userChc").click(function(){
		$(this).siblings().show();
		$(".busInfo").hide();
	})
}
function dirChc(){
	var streetChc;
	  $(".button").click(function(){
	  	streetChc = $(this).closest('div').attr('busST');
	  	if (streetChc==streetChc){
	      $(this).closest('div').siblings().show();
     } else {
 	    $(this).closest('div').siblings().hide();
       }
  // console.log(streetChc);
   });
     }
function hideNoChc(){
	var Chc1 =$("#cont17");
	var Chc2= $("#Cont21");

	$(Chc1).click(function(){
      $(Chc2).children().hide();
  })
	$(Chc2).click(function(){
		$(Chc1).children().hide();
	})

}
hideNoChc();
	
 $(document).ready(function(){
//adds to the html showing bus stop info
  $(".button").click(function(){
	 	var dir= $(this).attr('id');
	 	var stopID;
	 	var busID = M23;

    if (dir=="east"){
       stopID = east;
     } else if (dir=="east14"){
        stopID = east14;
        busID = M14D;
      } else if (dir =="west14"){
        stopID= west14;
        busID = M14D;
      } else {
 	   	stopID = west;
 	   }
     
    StopData(stopID, busID);
    
    if(intervalID) { 
		clearInterval(intervalID);
	}
//clears the reload timer when other button is clicked
 	intervalID = setInterval(function() {
	 	 	StopData(stopID, busID);	
	 	 }, 1000);
 	  });
     locChoice();
  dirChc();

});//end of docready










