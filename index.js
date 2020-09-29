
let galaxyContainer = document.getElementById("galaxy-container")
let cardGroupDiv = document.querySelector("div.card-group")
let tripButton = document.getElementById("book-trip-btn")
let userForm = document.getElementById("user-form-one")

fetch("http://localhost:3000/planets")
    .then(res => res.json())
    .then(planetArr => {
        cardGroupDiv.innerHTML = ""
        planetArr.forEach(planetObj => {

            console.log("we are in this fetch 🐶")
            turnPlanetToCard(planetObj)
        })
    })

    let turnPlanetToCard = planet => {
        let planetDiv = document.createElement("div")
            planetDiv.className = "card mx-3"
            // planetDiv.innerText = planet.name 
            cardGroupDiv.append(planetDiv)

        let planetImg = document.createElement("img")
            planetImg.className = "card-img-top"
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
    }

//////////////////////////////////////// FORM JS ///////////////////////////////////////////
tripButton.addEventListener("click", (evt) => {
    renderUserRegistration()
    // our renderFormProcess will clear the galaxyContainer or hide it...
    // building out our form
        // adding things to the DOM dynamically
        // when this form is submitted, that's another eventListener
})

let renderUserRegistration = info => {
    //first we want to create a new user
    galaxyContainer.innerHTML = ""
    
    let labelFirstName = document.createElement("label")
        labelFirstName.for = "fname"
        labelFirstName.innerText = "First Name:"
        userForm.append(labelFirstName)

    let inputFirstName = document.createElement("input")
        inputFirstName.type = "text"
        inputFirstName.id = "fname"
        inputFirstName.name = "fname"
        userForm.append(inputFirstName)
    
    // WE NEED TO ADD BREAKS!!! HOW?!?!?!?!?!

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
        firstSubmit.type = "submit"
        firstSubmit.innerText = "Next! Choose Trip Details!"
        userForm.append(firstSubmit)
}

userForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    console.log("WE ARE IN THE FIRST SUBMIT EVENT LISTENER")
    debugger
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
        renderTripDetails()
        
    })
})

let renderTripDetails = info => {
    // ADDING NEW FORM
}