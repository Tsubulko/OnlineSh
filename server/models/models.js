const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define( 'user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define( 'basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketPet = sequelize.define( 'basket_pet', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Pet = sequelize.define( 'pet', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},  // allowNull - допускается ли отсутствие значения.
    age: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    
})

const Breed = sequelize.define( 'breed', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const PetInfo = sequelize.define( 'pet_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

const Adopter = sequelize.define( 'adopter', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: false},
})

const TypeBreed = sequelize.define( 'type_breed', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketPet)
BasketPet.belongsTo(Basket)

Breed.hasMany(Pet)
Pet.belongsTo(Breed)

Type.hasMany(Pet)
Pet.belongsTo(Type)

Pet.hasOne(Adopter)
Adopter.belongsTo(Pet)

Pet.hasMany(BasketPet)
BasketPet.belongsTo(Pet)

Pet.hasMany(PetInfo, {as: 'info'})
PetInfo.belongsTo(Pet)

Type.belongsToMany(Breed, {through: TypeBreed})
Breed.belongsToMany(Type, {through: TypeBreed})

module.exports = {
    User,
    Basket,
    BasketPet,
    Pet,
    PetInfo,
    Type,
    Breed,
    TypeBreed
}