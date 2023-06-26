const perfume = require('../models/perfumeModel');

const addPerfume = async (req, res) => {
  try {
    const { perfume_name,perfume_category, price, description, perfume_picture } = req.body;

    const newPerfume = new perfume({
      perfume_name: perfume_name,
      perfume_category: perfume_category,
      price: price,
      description: description,
      perfume_picture: perfume_picture,
    });

    newPerfume.save();

    res.status(200).json('perfume added successfully');
  } catch (error) {
    res.status(500).json({ error: 'Failed to add perfume' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, ratings, quantity } = req.body;
    const productID = req.params.id;

    const update = await Product.findOneAndUpdate(
      { _id: productID },
      {
        name: name,
        description: description,
        price: price,
        category: category,
        ratings: ratings,
        quantity: quantity,
      }
    );

    res.status(201).json('product updated successfully ');
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

const getPerfumes = async (req, res) => {
  try {
    const products = await perfume.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'cannot get products' });
  }
};

module.exports = {
  addPerfume,
  updateProduct,
  getPerfumes,
};
