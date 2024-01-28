const elForm = document.querySelector('.form')
const elFormEmail = document.querySelector('.email__form')
const elFormPasword = document.querySelector('.pasword__form')

elForm.addEventListener("click", (evt) => {
    evt.preventDefault()

    ValueEmail = elFormEmail.value.trim()
    ValuePasword = elFormPasword.value.trim()


    fetch("https://reqres.in/api/login", {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: ValueEmail,
            password: ValuePasword,
        }),
    }) .then((res) => res.json()) 
       .then((data) => {
        if(data?.token){
            window.localStorage.setItem('token', data.token),
            window.location.replace('index.html')
        }
    })
})