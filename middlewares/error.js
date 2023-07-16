const handler404 = (req, res) => {
    res.status(404).render('404')
}
  
const handlerServerErrors = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).render('500')
}
  
module.exports = {
    handler404,
    handlerServerErrors,
}
  