'use strict'

if (!localStorage.getItem('natourstoken')) {
  document.querySelector('body').remove()
  setTimeout(function () {
    alert('You are not logged in')
  }, 1000)
}

else {

  let backendserver = `http://127.0.0.1:5500`

  document.querySelector('.screen_title').addEventListener('click', function () {
    document.location.href = `http://127.0.0.1:5500/`
  })
  document.querySelector('.signout_Btn').addEventListener('click', function () {
    document.location.href = `http://127.0.0.1:5500/`
    localStorage.removeItem('natourstoken')
  })

  let username = document.location.href.split(`?`)[1]

  fetch(`${backendserver}/users/1680/${localStorage.getItem('natourstoken')}/${username}`).then(function (e) {
    return e.json()
  }).then(function (data) {
    let user = data.data
    document.querySelector('.profileImg2').src = `${backendserver}/img/users/${user.photo}`
    document.querySelector('.profileImg ').src = `${backendserver}/img/users/${user.photo}`
    document.querySelector('.pSignupName').setAttribute('placeholder', `${user.name}`)
    document.querySelector('.pSignupEmail').setAttribute('placeholder', `${user.email}`)

    document.querySelector('.photoInput_profile').addEventListener('click', function () {
      document.querySelector('.pSignupName').value = user.name
      document.querySelector('.pSignupName').style = `opacity: 0.4`
    })

    //Password change
    document.querySelector('.pbtn2').addEventListener('click', function (e) {
      e.preventDefault()
      if (!document.querySelector('.currPass').value || !document.querySelector('.newPass').value || !document.querySelector('.confirmPass').value || document.querySelector('.newPass').value !== document.querySelector('.confirmPass').value) return alert('Error, please correctly fill the fields')
      let obj = {
        password: document.querySelector('.newPass').value,
        oldPassword: document.querySelector('.currPass').value,
        email: user.email
      }

      fetch(`${backendserver}/p/1680/${localStorage.getItem('natourstoken')}`, {
        "method": "PATCH",
        "headers": {
          "content-type": "application/json"
        },
        "body": JSON.stringify(obj)
      }).then(function (res) {
        if (res.status == 404) return alert("Error changing password")
        document.querySelector('.pbtn2').textContent = `Success`
        setTimeout(function () {
          document.location.reload()
        }, 2000)
      }).catch(function () {
        alert("Error changing password")
      })
    })

    document.querySelector('.pbtn').addEventListener('click', function (e) {
      e.preventDefault()
      let form = new FormData()
      form.append("name", localStorage.getItem('natoursname'))
      form.append("photo", document.querySelector('.photoInput_profile').files[0])
      fetch(`${backendserver}/file/upload`, {
        method: "POST",
        headers: {
          "enctype": "multipart/form-data"
        },
        body: form
      }).then(function (e) {
        return e.json()
      }).then(function (data) {
        alert("File Updated Successfully.")
      })
    })

  }).catch(function (err) {
    alert("Failed To Load Resource")
    document.location.reload()
  })
}


