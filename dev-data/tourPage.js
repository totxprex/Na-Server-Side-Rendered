'use strict'

let tour = document.querySelector(`.title`).textContent.replaceAll(` `, `-`)

const serverUrl = `http://127.0.0.1:5500`

let map_container = document.querySelector('map_cont')

let map = L.map('map').setView([51.505, -0.09], 1, {
  animate: true
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


document.querySelector('.screen3_image_gallery').innerHTML = ``

document.querySelector('.tour_guides_lists').innerHTML = ``

document.querySelector('.each_rev_cont').innerHTML = ``


fetch(`${serverUrl}/tours/1680/${localStorage.getItem('natourstoken')}/${tour}`).then(function (e) {
  return e.json()
}).then(function (data) {
  let tourObj = data.data
  document.querySelector('.image_large').style = `background-image: url(/img/tours/${tourObj?.imageCover});`
  document.querySelector('.div1').style = `  opacity: 1;`

  tourObj.images.forEach(function (e) {
    document.querySelector('.screen3_image_gallery').insertAdjacentHTML(`beforeend`, `<img src="/img/tours/${e}" alt="${e}">`)
  })

  tourObj.guides.forEach(function (e) {
    document.querySelector('.tour_guides_lists').insertAdjacentHTML("beforeend", `<li class="list_tour">
    <img class="tourGuide_img" src="/img/users/${e.photo}" alt=""> ${e.role.toUpperCase()} <span style="color: rgb(99, 96, 96);">
      ${e.name}</span>
  </li>`)
  })

  tourObj.reviewsArr.forEach(function (e, i) {
    document.querySelector('.each_rev_cont').insertAdjacentHTML("beforeend", `<div class="each_reviews">
    <img class="review_img" src="/img/users/user-${i + 1}.jpg" alt="">
    <h5 class="b">Arya Stark</h5>
    <p class="a">
      ${e.review.trim()}
    </p>  
    <img class="review_star" src="/img/${Math.round(Number(e.rating))}_star.png" alt="">
  </div>`)
  })

  tourObj.locations.forEach(function (e) {
    map.setView([e.coordinates[1], e.coordinates[0]], 13)
    L.marker([e.coordinates[1], e.coordinates[0]]).addTo(map)
      .bindPopup(`${e.description}`, {
        autoClose: false,
        keepOpen: true
      }).openPopup()
  })
})


document.querySelector('.screen_title').addEventListener('click', function () {
  document.location.href = `http://127.0.0.1:5500/`
})

document.querySelector('.login_Btn').addEventListener('click', function () {
  document.location.href = `http://127.0.0.1:5500/vlogin`
})

document.querySelector('.signup_Btn').addEventListener('click', function () {
  document.location.href = `http://127.0.0.1:5500/vsignup`
})

if (localStorage.getItem('natourstoken')) {
  fetch(`${serverUrl}/users/1680/${localStorage.getItem('natourstoken')}/${localStorage.getItem('natoursname')}`).then(function (e) {
    return e.json()
  }).then(function (data) { document.querySelector('.profileImg ').src = `${serverUrl}/img/users/${data.data.photo}` })
  document.querySelector('.login_Btn').classList.add('hide')
  document.querySelector('.signup_Btn').classList.add('hide')
}

document.querySelector('.profileImg ')?.addEventListener('click', function(){
  document.location.href = `${serverUrl}/vprofile?${localStorage.getItem('natoursname').replaceAll(` `, `-`)}`
})

document.querySelector('.signout_Btn').addEventListener('click', function () {
  document.location.href = `http://127.0.0.1:5500/`
  localStorage.removeItem('natourstoken')
})
