const handleSignin =(req, res, knex) => {
    
    knex.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            if(req.body.password === data[0].hash){
                return knex.select('*').from('users')
                .where('email', '=', req.body.email )
                .then(user => {
                    console.log(user)
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('Couldn\'t signin'))
            }
            else{
                res.status(400).json('Wrong credentials')
            }
        })
        .catch(err => res.status(400).json('Wrong credentials'))
}

module.exports = {
    handleSignin: handleSignin
};