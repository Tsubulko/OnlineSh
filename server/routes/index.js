const Router = require('express')
const router = new Router()
const petRouter = require('./petRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const breedRouter = require('./breedRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/breed', breedRouter)
router.use('/pet', petRouter)

module.exports = router