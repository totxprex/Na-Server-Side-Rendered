let backendserver = `https://shielded-scrubland-82465.herokuapp.com`

if (localStorage.getItem('natoursname')) {
  document.location.href = `${backendserver}/vprofile?${localStorage.getItem('natoursname')}`
}
else {
  document.location.href = `https://shielded-scrubland-82465.herokuapp.com/`
}
