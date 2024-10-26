const fieldsDeleteUpdate = (req, res, next) => {

  const fildsDelete = ['email', 'password']

  fildsDelete.forEach((field) => {
    return delete req.body[field]
  })

  next()

}

module.exports = fieldsDeleteUpdate
