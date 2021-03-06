const joi = require('joi')

const validateInventorySchema = (data) =>{
    const schema = new joi.object({
        name: joi.string().required().min(3),
        price: joi.number().required().default(0),
        quantity: joi.number().required().default(1),
    })

    return schema.validate(data)
}

module.exports = validateInventorySchema