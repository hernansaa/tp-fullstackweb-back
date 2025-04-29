const Product = require('../models/productsModel.js');

async function getProducts(req, res) {
          
    Product.find({})
        .then(products => {
            if(products.length) return res.status(200).send({products})
            return res.status(204).send({message: 'No Content'});
        }).catch(err => res.status(500).send({err}))
}

async function getProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.status(200).send(product);
    } catch (err) {
        res.status(500).send({ error: 'Error fetching product', details: err.message });
    }
}

async function createProduct(req, res) {
    const { name, category, requiresHelmet, requiresLifeJacket, capacity, durationPerSlot, isForKids } = req.body;

    // Create a new product instance with the data from the request body
    const newProduct = new Product({
        name,
        category,
        requiresHelmet,
        requiresLifeJacket,
        capacity,
        durationPerSlot,
        isForKids
    });

    // Save the product to the database
    newProduct.save()
        .then(product => res.status(201).send({ message: 'Product created', product }))
        .catch(err => res.status(500).send({ message: 'Error creating product', err }));
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const updated = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updated) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.status(200).send(updated);
    } catch (err) {
        res.status(500).send({ error: 'Something went wrong', details: err.message });
    }
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
}



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

