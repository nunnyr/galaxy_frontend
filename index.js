
let heading = document.querySelector("h1")


$(document).ready(function () {

    $("#sidebar").mCustomScrollbar({
         theme: "minimal"
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

});

fetch("http://localhost:3000/planets")
    .then(res => res.json())
    .then(planetArr => {
        planetArr.forEach(planetObj => {
            console.log("we are in this fetch 🐶")
            turnPlanetToDiv(planetObj)
        })
    })


    let turnPlanetToDiv = planet => {
        let planetDiv = document.createElement("div")
            planetDiv.className = "planet-class"
            planetDiv.innerText = planet.name 


        heading.append(planetDiv)


//add IMG TO MIGRATION FOR PLANET
    }