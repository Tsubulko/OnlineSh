const Router = require('express')
const router = new Router()
const petController = require('../controllers/petController')

router.post('/', petController.create)
router.get('/', petController.getAll)
router.get('/:id', petController.getOne)

module.exports = router