const {Breed} = require('../models/models')
const ApiError = require('../error/ApiError');

class BreedController {
    async create(req, res) {
        const {name} = req.body
        const breed = await Breed.create({name})
        return res.json(breed)
    }

    async getAll(req, res) {
        const breeds = await Breed.findAll()
        return res.json(breeds)
    }
}

module.exports = new BreedController()