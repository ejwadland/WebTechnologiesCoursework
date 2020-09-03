//delay binding click event to button

window.onload = function(){
    document.getElementById('select-button').addEventListener('click', jsonGetter);
}
//function that will get JSON data
function jsonGetter() {

    //variable that will create the start of the table and headings

    var tablestarter = "<table><tr><th>Year</th><th>Tournament</th><th>Winner</th><th>Runner-Up</th></tr>"

    var gender = document.querySelector('#genderSelector').value;

    var name = document.getElementById("nameSelector").value;
    var condition = document.querySelector('#conditionSelector').value;

    var resultse = document.querySelector('#resultSelector').value;

    var yearof = document.getElementById("yearSelector").value;
    var yearspec = document.querySelector('#yearSpecificSelector').value;

    var tournamentof = document.querySelector('#tournamentSelector').value;

    //selecting the male or female JSON data 

    if (gender === "fe") {var filename = "womens-grand-slam-winners.json"}
    else if (gender === "ma") {var filename = "mens-grand-slam-winners.json"}

    $.getJSON(filename, function(json) {
        $.each(json.result, function(index, value) {

            //looping through the JSON file to see if data meets the correct conditions

            var searchName = false;
            var searchYear = false;
            var searchTour = false;
            
            if(resultse === "ru") {
                if ((condition === "no") || ((condition === "eq") && (name === value['runner-up'])) || ((condition === "co") && (value['runner-up'].indexOf(name) !== -1))) {
                    searchName = true;
                }
            }

            else if (resultse === "wi") {
                if ((condition === "no") || ((condition === "eq") && (name === value.winner)) || ((condition === "co") && (value.winner.indexOf(name) !== -1))) {
                    searchName = true;
                }

            }
            else if (resultse === "ei") {
                if (((condition === "no") || ((condition === "eq") && (name === value.winner)) || ((condition === "co") && (value.winner.indexOf(name) !== -1))) || ((condition = "eq") && ( name === value['runner-up'])) || ((condition = "co") && (value['runner-up'].indexOf(name) !== -1)))  {
                    searchName = true; 
                }
            }
            
            if (((yearspec === "equ") && (yearof == value.year)) || ((yearspec === "gt") && (value.year > yearof)) || ((yearspec === "lt") && (value.year < yearof)) || (yearof === "")) {
                searchYear = true;
            }

            if ((tournamentof === "Any") || ((tournamentof === "Australian Open") && (tournamentof === value.tournament)) || ((tournamentof === "French Open") && (tournamentof === value.tournament))|| ((tournamentof === "Wimbledon") && (tournamentof === value.tournament)) || ((tournamentof === "U.S. Open") && (tournamentof === value.tournament))) {
                searchTour = true;
            }

            //if data matches, searchName, searchYear and searchTour should return true


            
            if (searchName && searchYear && searchTour){
                var finalWinner = value.winner;
                var finalRunnerup = value['runner-up'];
                var finalYear = value.year;
                var finalTour = value.tournament;

                //compare the variables to see if they are all true

                //adding to earlier variable that starts table off - now adding data


                tablestarter += "<tr><td>" + finalYear + "</td><td>" + finalTour + "</td><td>" + finalWinner + "</td><td>" + finalRunnerup + "</td></tr>";
                
            }



        })
        //final table is sent to <div> section in the index.html file.
        document.getElementById('resultArea').innerHTML = tablestarter + "</table>";
        

    
    })
   

   

}
    