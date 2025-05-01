const Product = require('../models/productsModel.js');
const { TimeSlot } = require('../models/timeSlotModels.js')

async function getProducts(req, res) {
          
    Product.find({})
        .then(products => {
            if(products.length) return res.status(200).send({products})
            return res.status(204).send({message: 'No Content'});
        }).catch(err => res.status(500).send({err}))
}

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
}

async function createProduct(req, res) {
    const { name, category, requiresHelmet, requiresLifeJacket, capacity, durationPerSlot, isForKproductIDs } = req.body;

    // Create a new product instance with the data from the request body
    const newProduct = new Product({
        name,
        category,
        requiresHelmet,
        requiresLifeJacket,
        capacity,
        durationPerSlot,
        isForKproductIDs
    });

    // Save the product to the database
    newProduct.save()
        .then(product => res.status(201).send({ message: 'Product created', product }))
        .catch(err => res.status(500).send({ message: 'Error creating product', err }));
}

async function updateProduct(req, res) {
    try {
        const { productID } = req.params;
        const updated = await Product.findByproductIDAndUpdate(productID, req.body, { new: true, runValproductIDators: true });

        if (!updated) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.status(200).send(updated);
    } catch (err) {
        res.status(500).send({ error: 'Something went wrong', details: err.message });
    }
}


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
  }



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
  }
  


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    getProductTimeSlots,
    getProductsWithTimeSlots,
};



// exports.handleRental = (req, res) => {
//     const { productType, turns, paymentMethod } = req.body;

//     const pricePerTurn = 50;
//     let total = pricePerTurn * turns;

//     if (turns > 1) {
//         total *= 0.9; // Apply 10% discount
//     }

//     if (paymentMethod === 'cash') {
//         // payment logic
//     }

//     res.json({ success: true, total });
// };

