const perfume = require("../models/perfumeModel");

const addPerfume = async (req, res) => {
  try {
    const { perfume_name, gender, category, price, description } = req.body;

    const imagePath = req.file.path;

    const newPerfume = new perfume({
      perfume_name: perfume_name,
      perfume_category: category,
      gender: gender,
      price: price,
      description: description,
      perfume_picture: imagePath,
    });

    newPerfume.save();

    res.status(200).json("perfume added successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to add perfume" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const productID = req.params.id;
    console.log(name);
    console.log(productID);
    const imagePath = req.file.path;

    const update = await perfume.findByIdAndUpdate(productID, {
      perfume_name: name,
      description: description,
      price: price,
      perfume_category: category,
      perfume_picture: imagePath,
    });
    console.log(update);
    res.status(201).json("product updated successfully ");
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

const getPerfumes = async (req, res) => {
  try {
    const products = await perfume.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "cannot get products" });
  }
};

module.exports = {
  addPerfume,
  updateProduct,
  getPerfumes,
};
