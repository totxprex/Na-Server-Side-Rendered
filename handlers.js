
const deleteOneHandler = function (collection) {
  return function (req, res) {
    collection.findByIdAndDelete(req.params.id, {
      returnDocument: true
    }).then(function (data) {
      if (!data) {
        res.status(404).header({
          "content-type": "application/json"
        }).send({
          status: "Review Does Not Exist",
        })
      }
      else {
        res.status(200).header({
          "content-type": "application/json"
        }).send({
          status: "Review Deleted",
          data
        })
      }
    }).catch(function (err) {
      res.status(404).send(err.message)
    })
  }
}

module.exports = { deleteOneHandler }