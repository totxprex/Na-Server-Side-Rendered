let backendserver = `http://127.0.0.1:5500`

if (localStorage.getItem('natoursname')) {
  document.location.href = `${backendserver}/vprofile?${localStorage.getItem('natoursname')}`
}
else {
  document.location.href = `http://127.0.0.1:5500/`
}
