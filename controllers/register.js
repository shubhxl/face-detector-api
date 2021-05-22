const handleRegister = (req, res, knex) => {
   
    const {email, password, name } = req.body
    knex.transaction(trx => {
        trx.insert({
            email: email,
            hash: password
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
         return trx('users')
         .returning('*')
         .insert({
             email: loginEmail[0],
             name: name,
             joined: new Date()
         })
         .then(user => {
                 res.json(user[0])
         })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    }) 
   
    .catch(
        err => {
            res.status(400).json('couldn\'t register')
        })
     
 }


 module.exports = {
     handleRegister: handleRegister
 };