

//Saving user after they finish Account Details

// let loginEmail = document.getElementById("login-form")
// let loginPassword = document.getElementById("login-password")

// loginEmail.addEventListener(("submit", handleUserLogin))


// // loginPassword.addEventListener("click", (evt) => {
// //     console.log("login click 👻" )
// // })

// let handleUserLogin = taco => {
//     evt.preventDefault()
    
//     console.log("👻👻👻👻👻👻👻👻")
//     debugger
//     let emailUser = evt.target.email.value


//     fetch("http://localhost:3000/login", {
//         method: "POST",
//         headers: {
//             "content-type": "application/json"
//         },
//         body: JSON.stringify({
//             theUserNameFromFrontEnd: emailUser
//         })
//     })
//         .then(res => res.json())
//         .then(something => {
//             // if(response.id){
//             //     showTeacherInformation(response)
//             //     console.log(response);
//             // } else {
//             //     console.error(response)
//             // }
//             console.log("this is what 👻", something)
//         })
// }