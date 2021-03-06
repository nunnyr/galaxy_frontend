
let galaxyContainer = document.getElementById("galaxy-container")
let cardGroupRow1 = document.querySelector("#row-1")
let cardGroupRow2 = document.querySelector("#row-2")
let cardGroupRow3 = document.querySelector("#row-3")
let tripButton = document.getElementById("book-trip-btn")
let userForm = document.getElementById("user-form-one")
let tripForm = document.getElementById("trip-form-two")
let galaxyTitle = document.getElementById("title")
let planetsArray = ["Venus", "Earth", "Mars", "Jupiter", "Uranus", "Neptune", "Saturn", "Pluto", "Mercury"]
let confirmBox = document.getElementById("confirmation-container")
let universeQuote = document.getElementById("universe-quote")
let aboutMe = document.getElementById("its-me")

let viewAgain = document.getElementById("view-again")

let globalUser = {}


fetch("http://localhost:3000/planets")
    .then(res => res.json())
    .then(planetArr => {
        // cardGroupDiv.innerHTML = ""
        planetArr.forEach( (planetObj, index) => {
            console.log("we are in this fetch 🐶")
            turnPlanetToCard(planetObj, index)
        })
    })

    let turnPlanetToCard = (planet, index) => {
        let planetDiv = document.createElement("div")
            planetDiv.className = "card mx-3"
            // planetDiv.innerText = planet.name 


        let planetImg = document.createElement("img")
            planetImg.className = "card-img-top"
            planetImg.id = "card-id-style"
            planetImg.src = planet.image
            planetImg.alt = `Image of ${planet.name} from NASA`
            planetDiv.append(planetImg)

        let cardBody = document.createElement("div")
            cardBody.className = "card-body"
            planetDiv.append(cardBody)

        let cardTitle = document.createElement("h5")
            cardTitle.className = "card-title"
            cardTitle.innerText = planet.name
            cardBody.append(cardTitle)

        let cardText = document.createElement("p")
            cardText.className = "card-text"
            cardText.innerText = planet.facts
            cardBody.append(cardText)

        if (index < 3) {
            cardGroupRow1.append(planetDiv)
        } else if (index >= 3 && index <= 5) {
            cardGroupRow2.append(planetDiv)
        } else if (index > 5) {
            cardGroupRow3.append(planetDiv)
        }
    }

//////////////////////////////////////// FORM JS ///////////////////////////////////////////
tripButton.addEventListener("click", (evt) => {
    hidingTripButton()
    renderUserRegistration()
    // our renderFormProcess will clear the galaxyContainer or hide it...
    // building out our form
        // adding things to the DOM dynamically
        // when this form is submitted, that's another eventListener
})

let hidingTripButton = trip => {
    let buttonOne = tripButton
    buttonOne.className = "hiding-elem"
}

let renderUserRegistration = info => {
    //first we want to create a new user
    galaxyContainer.innerHTML = ""
    galaxyTitle.innerText = "Make An Account"

    // let userImg = document.createElement("img")
    //     userImg.className = "galaxy-png"
    //     userImg.src = img/astronaut.png
    //     userForm.append(userImg)

    let labelPronouns = document.createElement("label")
        labelPronouns.for = "pronouns"
        labelPronouns.innerText = "Please select your pronouns:"
        userForm.append(labelPronouns)

    let selectPronouns = document.createElement("select")
        selectPronouns.className = "pronouns-class"
        selectPronouns.id = "pronounsSelect"
        selectPronouns.name = "prounounsList"
        selectPronouns.form = "pronounsForm"
        userForm.append(selectPronouns)
    
    let pronounsArray = ["She/Her/Hers", "He/Him/His", "They/Them/Theirs", "Ze/Hir/Hirs", "Name Only", "Choose Not to Disclose"]
    let turnPronounToOption = info => {
        pronounsArray.forEach(pronoun => {
            let optionPronouns = document.createElement("option")
                optionPronouns.value = pronoun
                optionPronouns.innerText = pronoun
                selectPronouns.append(optionPronouns)
        })
    }

    turnPronounToOption()

    let labelFirstName = document.createElement("label")
        labelFirstName.for = "fname"
        labelFirstName.innerText = "First Name:"
        userForm.append(labelFirstName)

    let inputFirstName = document.createElement("input")
        inputFirstName.type = "text"
        inputFirstName.id = "fname"
        inputFirstName.name = "fname"
        userForm.append(inputFirstName)


    let labelLastName = document.createElement("label")
        labelLastName.for = "lname"
        labelLastName.innerText = "Last Name:"
        userForm.append(labelLastName)

    let inputLastName = document.createElement("input")
        inputLastName.type = "text"
        inputLastName.id = "lname"
        inputLastName.name = "lname"
        userForm.append(inputLastName)
    
    let labelAge = document.createElement("label")
        labelAge.for = "age"
        labelAge.innerText = "Age:"
        userForm.append(labelAge)

    let inputAge = document.createElement("input")
        inputAge.type = "text"
        inputAge.id = "ageInput"
        inputAge.name = "ageInput"
        userForm.append(inputAge)

    let labelEmail = document.createElement("label")
        labelEmail.for = "email"
        labelEmail.innerText = "Email:"
        userForm.append(labelEmail)

    let inputEmail = document.createElement("input")
        inputEmail.type = "text"
        inputEmail.id = "emailInput"
        inputEmail.name = "emailInput"
        userForm.append(inputEmail)

    let firstSubmit = document.createElement("button")
        firstSubmit.className = "submit-btn"
        firstSubmit.type = "submit"
        firstSubmit.innerText = "Booking Details"
        userForm.append(firstSubmit)
}

userForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    // console.log("WE ARE IN THE FIRST SUBMIT EVENT LISTENER")
    // debugger
    let userPronouns = evt.target.pronounsSelect.value
    let userFirstName = evt.target.fname.value
    let userLastName = evt.target.lname.value
    let userAge = evt.target.ageInput.value
    let userEmail = evt.target.emailInput.value
    let userFriendlyNeighbor

    fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pronouns: userPronouns,
            first_name: userFirstName,
            last_name: userLastName,
            age: userAge,
            email: userEmail,
            // friendly_neighbor:
        })
    })
    .then(res => res.json())
    .then(newUserObj => {
        // We don't know the user's overall purpose.... :/
        console.log("What is the:", newUserObj)
        evt.target.reset()
        globalUser = newUserObj
        renderTripDetails()
    })
})

// ################################# Starting Trip Details Form ################################################
let renderTripDetails = info => {
    // ADD NEW FORM ON HTML FIRST
    galaxyContainer.innerHTML = ""
    userForm.innerHTML = ""
    aboutMe.innerHTML = ""
    galaxyTitle.innerText = "Mission Details"
    // USER NOW CHOOSE PLANET(S) && TRIP DATES
        // ONE date input && TWO planet drop down forms (ONE WAY)
        // ADVANCED GOAL: SEATING CHART
        // Our occupancy is now our price
            // Let priceTag = document.createElement("p")
            // priceTag.innerText = `$${planet.occupancy}.00`
        // Confirm Trip Button: You are not able to make changes

    let labelDepartingPlanet = document.createElement("label")
        labelDepartingPlanet.for = "departing planet"
        labelDepartingPlanet.innerText = "Please select your departing planet:"
        tripForm.append(labelDepartingPlanet)

    let selectDepartingPlanet = document.createElement("select")
        selectDepartingPlanet.className = "departing-planet-class"
        selectDepartingPlanet.id = "departingPlanetSelect"
        selectDepartingPlanet.name = "departingList"
        selectDepartingPlanet.form = "departingPlanetForm"
        tripForm.append(selectDepartingPlanet)

    let turnPlanetToDepartOption = info => {
        planetsArray.forEach( (planet, index) => {
            let optionDepartingPlanet = document.createElement("option")
                optionDepartingPlanet.value = index
                optionDepartingPlanet.innerText = planet
                selectDepartingPlanet.append(optionDepartingPlanet)
        })
    }
        
    turnPlanetToDepartOption()

    let labelArrivalPlanet = document.createElement("label")
        labelArrivalPlanet.for = "arrival planet"
        labelArrivalPlanet.innerText = "Please select your arrival planet:"
        tripForm.append(labelArrivalPlanet)

    let selectArrivalPlanet = document.createElement("select")
        selectArrivalPlanet.className = "arrival-planet-class"
        selectArrivalPlanet.id = "arrivalPlanetSelect"
        selectArrivalPlanet.name = "arrivalList"
        selectArrivalPlanet.form = "arrivalPlanetForm"
        tripForm.append(selectArrivalPlanet)

    let turnPlanetToArrivalOption = info => {
        planetsArray.forEach((planet, index) => {
            let optionArrivalPlanet = document.createElement("option")
                optionArrivalPlanet.value = index
                optionArrivalPlanet.innerText = planet
                selectArrivalPlanet.append(optionArrivalPlanet)
        })
    }

    turnPlanetToArrivalOption()

    let labelDate = document.createElement("label")
        labelDate.for = "date"
        labelDate.innerText = "Travel Date:"
        tripForm.append(labelDate)

    let inputDate = document.createElement("input")
        inputDate.type = "date"
        inputDate.id = "date"
        inputDate.name = "date"
        tripForm.append(inputDate)

    let secondSubmit = document.createElement("button")
        secondSubmit.className = "submit-btn"
        secondSubmit.type = "submit"
        secondSubmit.innerText = "Confirmation Page"
        tripForm.append(secondSubmit)
}

// ################################ End Trip Details Form #############################################
tripForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let departingPlanet = evt.target.departingPlanetSelect.value
    let arrivalPlanet = evt.target.arrivalPlanetSelect.value
    let tripDate = evt.target.date.value
    fetch("http://localhost:3000/trips", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: globalUser,
            date: tripDate,
            depart_planet_id: departingPlanet,
            arrival_planet_id: arrivalPlanet
        })
    })
    .then(res => res.json())
    .then(newTripObj => {
        // We don't know the user's overall purpose.... :/
        console.log("What is the tripObj 👻:", newTripObj)
        evt.target.reset()
        // globalUser = newUserObj
        // debugger
        renderConfirmation(newTripObj)
    })
})
// WE NOW HAVE TO HANDLE THE TRIP BEING CREATED
// Confirmation form
// then we need to clear everything again && showcase "MY TRIPS"


let renderConfirmation = info => {
    tripForm.innerHTML = ""
    galaxyTitle.innerText = "Confirmation Details"
    confirmBox.className = "showing"
    universeQuote.className = "show-quote"

    //we need to match the index by iterating through the planets
    //
    let chosenDepartPlanet = info.depart_planet_id
    let chosenArrivalPlanet  = info.arrival_planet_id
    
    
    
    let confirmDepartPlanet = planetsArray[chosenDepartPlanet]
    let confirmArrivalPlanet = planetsArray[chosenArrivalPlanet]
    
    let confirmDate = info.date
    
    let universeDiv = document.createElement("div")
        universeDiv.className = "show-quote"
        universeDiv.innerText = `“Everything amazing about the universe is inside of you, and the two are inseparable.” — Carl Sagan`
        universeQuote.append(universeDiv)

    let confirmDiv = document.createElement("div")
        confirmDiv.className = "inner-confirm"
        confirmDiv.innerText = `     You are leaving from ${confirmDepartPlanet} to ${confirmArrivalPlanet} \n on ${confirmDate} `
          
        confirmBox.append(confirmDiv)

        // let universeDiv = document.createElement("div")
        //     // universeDiv.className = "showing"
        //     universeDiv.innerText = `“Everything amazing about the universe is inside of you, and the two are inseparable.” — Carl Sagan`
        //     universeQuote.append(universeDiv)

        let makeViewButton = document.createElement("button")
            makeViewButton.className = "new-view-after-booking"
            makeViewButton.id = "new-view-btn"
            makeViewButton.innerText = "View Upcoming Trips"
            viewAgain.append(makeViewButton)

            makeViewButton.addEventListener("click", evt => {
                 confirmBox.innerHTML = ""
                 universeQuote.innerHTML = ""
                 makeViewButton.className = "hiding-elem"
                 console.log("who are you: 😭", globalUser)
                 showMe(globalUser)





            })
        

}


/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
  
/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}






//###################################login #########################################
let loginEmail = document.getElementById("login-form")
let loginPassword = document.getElementById("login-password")

loginEmail.addEventListener("submit", (evt) => {

    evt.preventDefault()
    

    // console.log("👻👻👻👻👻👻👻👻")
    // debugger
    let emailUser = evt.target.email.value
    // let you = user.id


    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            theUserNameFromFrontEnd: emailUser,
            
        })
    })
        .then(res => res.json())
        .then(foundUserObj => {
            evt.target.reset()
            console.log("this is what 👻", foundUserObj)
           
            globalUser = foundUserObj.user
             
            showMe(foundUserObj)
        })
})


let showMe = user => {
    galaxyContainer.innerHTML = ""
    // globalUser = user
    // confirmBox.className = "hiding-elem"
    // quoteUniverse.className = "hiding-elem"
                // confirmBox.innerHTML = ""
                // quoteUniverse.innerHTML = ""
                // viewAgain.className = "hiding-elem"
    tripButton.className = "hiding-elem"
    galaxyTitle.innerText = "My Upcoming Galaxy Mission"

    debugger

    let upcomingTrips = user.trips
    let makeTripDiv

    let nameDiv = document.createElement("div")
        
        nameDiv.className = "my-trips"
        nameDiv.innerText = `Hello ${user.user.first_name},`
        aboutMe.append(nameDiv)


    let upcomingDiv = document.createElement("div")
        upcomingDiv.className = "my-upcoming"
        aboutMe.append(upcomingDiv)
        // aboutMe.append(breakStyle)

    let nameP = document.createElement("p")
        nameP.className = "upcoming-name"
        // nameP.innerText = `Hello ${user.user.first_name},  `
        upcomingDiv.append(nameP)

    upcomingTrips.forEach(trip => {
        

        //calling this Leaving bc we have variables named closely
        //these will only exist here
        let chosenLeavingPlanet = trip.depart_planet_id
        let chosenToPlanet  = trip.arrival_planet_id
        let chosenDate = trip.date
        let upcomingLeavingPlanet = planetsArray[chosenLeavingPlanet]
        let upcomingToPlanet = planetsArray[chosenToPlanet]

            makeTripDiv = document.createElement("div")
            makeTripDiv.className = "test-styling"
            // aboutMe.append(makeTripDiv)

            let upcomingLi = document.createElement("li")
            upcomingLi.className = "upcoming-li"
            upcomingLi.innerText = `${upcomingLeavingPlanet} to ${upcomingToPlanet} on ${chosenDate}`
        
            // makeTripDiv.append(upcomingLi)
            
            // let upcomingP = document.createElement("p")
            //     upcomingP.className = "upcoming-p"
                // upcomingP.innerText = `${upcomingLeavingPlanet} to ${upcomingToPlanet} on ${chosenDate}`
                // upcomingLi.append(upcomingP)
                
                // upcomingLi.append(upcomingP)
                makeTripDiv.append(upcomingLi)
                aboutMe.append(makeTripDiv)
            
    })

        let makeTripButton = document.createElement("button")
            makeTripButton.className = "new-trip-after-login"
            makeTripButton.id = "upcoming-btn-style"
            makeTripButton.innerText = "Book Another Trip"
            makeTripDiv.append(makeTripButton)
            debugger

    makeTripButton.addEventListener("click", evt => {
        upcomingDiv.className = "hiding-elem"
        makeTripButton.className = "hiding-elem"
        renderTripDetails()
    })



}

