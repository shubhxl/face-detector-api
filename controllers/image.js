const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '868f58b0dcaf4e099f629cd3c13fa93b'
   });

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
              .then(data => { res.json(data)})
              .catch(err => { res.status(400).json('Unable to connect with API')})
}


const handleImage = (req, res, knex) => {
    const {id} = req.body;

    knex('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => {
        res.status(400).json('Unable to update entries')
    })
}

module.exports ={ handleImage, handleApiCall };