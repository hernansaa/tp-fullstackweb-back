const Product = require('../models/productsModel.js');
const { TimeSlot } = require('../models/timeSlotModels.js')

async function getProducts(req, res) {

  Product.find({})
    .then(products => {
      if (products.length) return res.status(200).send({ products })
      return res.status(204).send({ message: 'No Content' });
    }).catch(err => res.status(500).send({ err }))
};

async function getProduct(req, res) {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200).send(product);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching product', details: err.message });
  }
};

async function createProduct(req, res) {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json({ message: 'Product created', product: savedProduct });
  } catch (err) {
    res.status(400).json({ message: 'Error creating product', error: err.message });
  }
};


async function updateProduct(req, res) {
  try {
    const { productId } = req.params; // use `productId` to match route param
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated', product: updatedProduct });
  } catch (err) {
    res.status(400).json({ message: 'Error updating product', error: err.message });
  }
};


async function deleteProduct(req, res) {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
};



async function getProductTimeSlots(req, res) {
  const { productId } = req.params;

  try {
    const timeslots = await TimeSlot.find({ product: productId }).sort('startTime');

    if (timeslots.length === 0) {
      return res.status(204).json({ message: 'No timeslots found for this product.' });
    }

    res.status(200).json({ timeslots });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



async function getProductsWithTimeSlots(req, res) {
  try {
    const products = await Product.find({});

    const productsWithSlots = await Promise.all(
      products.map(async (product) => {
        const timeSlots = await TimeSlot.find({ product: product._id }).sort('startTime');
        return {
          ...product.toObject(),
          timeSlots,
        };
      })
    );

    res.status(200).json({ products: productsWithSlots });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductTimeSlots,
  getProductsWithTimeSlots,
};
