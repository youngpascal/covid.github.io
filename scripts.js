const app = document.getElementById('root')

var request = new XMLHttpRequest()
request.open('GET', 'https://covid-scraper.herokuapp.com', true)
request.onload = function() {
    var txt = ""
  // Begin accessing JSON data here
  var data = JSON.parse(this.response) 
    if (request.status >= 200 && request.status < 400) {
        txt += "<h1>" + data[3].date_updated + "</h1>";
        //txt += "<h2> Total cases: " + data[0].total_covid_cases + "</h2>"
        //txt += "<h2> Total deaths: " + data[0].total_covid_deaths + "</h2>"
        //txt += "<h2> Total recovered: " + data[0].total_covid_recovered + "</h2>"
        txt += "<div class = 'table-responsive'>";
        txt += "<table id='mainTable' class = 'table table-bordered table-hover dataTable no-footer' data-toggle='table'>";
        txt += " <thead><th>Country</th><th>Total Cases</th><th>New Cases</th><th>Total Deaths</th><th>New Deaths</th><th>Active Cases</th><th>Total Recovered</th><th>Total in Serious/Critical Condition</th><th>% Increase of New Cases</th><th>% Increase of New Deaths</th></thead>";
        txt += "<tbody>"

        for (x in data) {
            if (data[x].name != null){
                txt += "<tr>"
                txt += "<td>" + data[x].name + "</td>";
                txt += "<td>" + data[x].total_cases + "</td>";
                if (data[x].new_cases != 0){
                    txt += "<td style='background-color:#FFEEAA;'> +" + data[x].new_cases + "</td>";
                } else {
                    txt += "<td> " + data[x].new_cases + "</td>";
                }
                txt += "<td>" + data[x].total_deaths + "</td>";
                if (data[x].new_deaths != 0){
                    txt += "<td style='background-color:#FF0033;'> +" + data[x].new_deaths + "</td>";
                } else {
                    txt += "<td> " +data[x].new_deaths + "</td>";
                }
                txt += "<td>" + data[x].active_cases + "</td>";
                txt += "<td>" + data[x].total_recovered + "</td>";
                txt += "<td>" + data[x].condition + "</td>";
                if (data[x].percentage_changed_cases.toFixed(2) != 0.00){
                    txt += "<td style='background-color:#FF0033;'> +" + data[x].percentage_changed_cases.toFixed(2) + "% </td>";
                } else {
                    txt += "<td> " + data[x].percentage_changed_cases.toFixed(2) + "% </td>";
                }
                if (data[x].percentage_changed_deaths.toFixed(2) != 0.00){
                    txt += "<td style='background-color:#FF0033;'> +" + data[x].percentage_changed_deaths.toFixed(2) + "% </td>";
                } else {
                    txt += "<td> " + data[x].percentage_changed_deaths.toFixed(2) + "% </td>";
                }
                txt += "</tr>" } 
        }
        txt += "</tbody>"
        txt += "</table>" 
        txt += "</div>"
        document.getElementById("root").innerHTML = txt;
    }  else {
        txt += "<h1> Unknown error occured. Please notify www.github.com/youngpascal </h1>";
        document.getElementById("root").innerHTML = txt;
      }
}

request.send()
