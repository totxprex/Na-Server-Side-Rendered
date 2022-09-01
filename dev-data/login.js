'use strict'

document.querySelector('.screen_title').addEventListener('click', function () {
  document.location.href = `https://shielded-scrubland-82465.herokuapp.com/`
})

document.querySelector('.signup_Btn').addEventListener('click', function () {
  document.location.href = `https://shielded-scrubland-82465.herokuapp.com/vsignup`
})

let backendserver = `https://shielded-scrubland-82465.herokuapp.com`

let emailField = document.querySelector('.in')
let passField = document.querySelector('.in2')

document.querySelector('.lbtn').addEventListener('click', function (e) {
  e.preventDefault()

  fetch(`${backendserver}/login/1680/${emailField.value}/${passField.value}`).then(function (e) {
    return e.json()
  }).then(function (data) {
    if (data.token) {
      document.querySelector('.lbtn').textContent = `Success`
      localStorage.setItem('natourstoken', data.token)
      localStorage.setItem('natoursname', data.name.replaceAll(` `, `-`))
      setTimeout(function () {
        document.location.href = `${backendserver}/vprofile?${data.name}`
      }, 2000)
    }
    else {
      document.querySelector('.lbtn').textContent = `Error`
      setTimeout(function () {
        document.querySelector('.lbtn').textContent = `Log In`
      }, 2000)
    }
  }).catch(function () {
    document.querySelector('.lbtn').textContent = `Error`
    setTimeout(function () {
      document.querySelector('.lbtn').textContent = `Log In`
    }, 2000)
  })
})

document.querySelector('.forgot').addEventListener('click', function (e) {
  e.preventDefault()
  document.querySelector('.login_cont').classList.add('hide')
  document.querySelector('.resetPass_cont').classList.remove('hide')

  document.querySelector('.resetbtn').addEventListener('click', function (e) {
    e.preventDefault()
    if (!document.querySelector('.resetIn').value) return
    fetch(`${backendserver}/reset/1680/`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ email: document.querySelector('.resetIn').value })
    }).then(function () {
      document.querySelector('.stat').textContent = `Password reset link sent to your email...`
      document.querySelector('.resetIn').value = ``
    }).catch(function (err) {
      alert("An Error Occured. Please Try Again...")
    })
  })
})


document.querySelector('.login_Btn').addEventListener('click', function () {
  document.location.reload()
})