const uuid = require('uuid')
const path = require('path')
const {Pet} = require('../models/models')

class petController {
    async create(req, res) {
        try{
            const {name, age, breedId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const pet = await Pet.create({name, age, breedId, typeId, img: fileName})
        
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    PetInfo.create({
                        title: i.title,
                        description: i.description,
                        petId: pet.id
                    })
                )
            }

            return res.json(pet)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    } 

    async getAll(req, res) {
        let {breedId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let pets;
        if (!breedId && !typeId) {
            pets = await Pet.findAndCountAll({limit, offset})
        }
        if (breedId && !typeId) {
            pets = await Pet.findAndCountAll({where:{breedId}, limit, offset})
        }
        if (!breedId && typeId) {
            pets = await Pet.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (breedId && typeId) {
            pets = await Pet.findAndCountAll({where:{typeId, breedId}, limit, offset})
        }
        return res.json(pets)
    }

    async getOne(req, res) {
        const {id} = req.params
        const pet = await Pet.findOne(
            {
                where: {id},
                include: [{model: PetInfo, as: 'info'}]
            },
        )
        return res.json(pet)
    }
}

module.exports = new petController()