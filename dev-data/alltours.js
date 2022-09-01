'use strict'

const serverUrl = `https://shielded-scrubland-82465.herokuapp.com`

document.querySelectorAll('.details_Btn').forEach(function (e) {
  e.addEventListener('click', function (btn) {
    if (!localStorage.getItem('natourstoken')) return alert("Please login to view tour")
    btn.preventDefault()
    let tourName = e.closest('.each_res_footer').closest('.each_search_res').children[1].textContent.trim().replaceAll(` `, `-`)
    document.location.href = `${serverUrl}/viewtour?tourname=${tourName}`
  })
})



document.querySelector('.login_Btn').addEventListener('click', function () {
  document.location.href = `${serverUrl}/vlogin`
})

document.querySelector('.signup_Btn').addEventListener('click', function () {
  document.location.href = `${serverUrl}/vsignup`
})


if (localStorage.getItem('natourstoken')) {
  fetch(`${serverUrl}/users/1680/${localStorage.getItem('natourstoken')}/${localStorage.getItem('natoursname')}`).then(function (e) {
    return e.json()
  }).then(function (data) { document.querySelector('.profileImg ').src = `${serverUrl}/img/users/${data.data.photo}` })
  document.querySelector('.login_Btn').classList.add('hide')
  document.querySelector('.signup_Btn').classList.add('hide')
}

else{
  document.querySelector('.signout_Btn ').classList.add('hide')
}

document.querySelector('.profileImg ')?.addEventListener('click', function(){
  document.location.href = `${serverUrl}/vprofile?${localStorage.getItem('natoursname').replaceAll(` `, `-`)}`
})


document.querySelector('.signout_Btn').addEventListener('click', function () {
  document.location.href = `https://shielded-scrubland-82465.herokuapp.com/`
  localStorage.removeItem('natourstoken')
})