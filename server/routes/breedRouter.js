const Router = require('express')
const router = new Router()
const breedController = require('../controllers/breedController')

router.post('/', breedController.create)
router.get('/',breedController.getAll)

module.exports = router