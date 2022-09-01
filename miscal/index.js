'use strict'

let apiRoute = `http://127.0.0.1:5500`

document.querySelector('.search_res').innerHTML = ``

fetch(`${apiRoute}/tours/1680`).then(function (e) {
  return e.json()
}).then(function (data) {
  let tours = data.data
  tours.forEach(function (e, i) {
    let str = ` <div class="each_search_res">
    <img src="/img/tours/tour-${i + 1}-1.jpg" class="each_res_img">
    <div class="tour_name_cont">
      ${e.name.trim()}
    </div>
    <p class="difficulty_duration">
      ${e.difficulty} ${e.duration}-DAY TOUR
    </p>
    <p class="tour_title">
      ${e.summary}
    </p>
    <div class="tour_details">
      <p>🌍 &nbsp; &nbsp; ${e.startLocation.description}</p>
      <p>📆 &nbsp; &nbsp; Miami, Us</p>
      <p>🚩 &nbsp; &nbsp; Miami, Us</p>
      <p>🙎 &nbsp; &nbsp; ${e.guides.length} Guide(s)</p>
    </div>
    <div class="each_res_footer">
      <div>
        <p class="dt"><b>$${e.price}</b>&nbsp; per person</p>
        <p class="dt"><b>${e.ratingsAverage} </b>&nbsp; rating (5)</p>
      </div>
      <button class="details_Btn">Details</button>
    </div>
  </div>`

    document.querySelector('.search_res').insertAdjacentHTML("beforeend", str)
  })
})

