const User = require("../../models/userSchema");
const Inventory = require("../../models/inventorySchema");
const Joi = require("joi");

const Schema = new Joi.object({
  quantity: Joi.number().required(),
});

module.exports = async (req, res) => {
  try {
    const { body } = req;
    const { error, value } = Schema.validate(body);
    console.log(error);
    if (error) {
      return res.json({ error: { message: error.details[0].message } });
    }
    const by = req.user._id;
    const prodId = req.params.id;

    const user = await User.findOneAndUpdate(
      { _id: prodId },
      {
        $push: { cart: { product: value.quantity} },
        $inc: {
          "cart.quantity": 1,
        },
      },
      { new: true }
    );
    if(user){
      const inventory = await Inventory.findOneAndUpdate(
        { _id: prodId },
        {
          $pull: { quantity: { quantity: value.quantity } },
        },
        { new: true }
      );
      
    }
    
    // console.log(product);
    return res.status(201).json({cartItem: user.cart});
  } catch (error) {
    return res.status(500).json({ error: { message: error } });
  }
};
