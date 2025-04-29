const Product = require('../models/productsModel.js');

function getProducts(req, res) {
          
    Product.find({})
        .then(products => {
            if(products.length) return res.status(200).send({products})
            return res.status(204).send({message: 'No Content'});
        }).catch(err => res.status(500).send({err}))
}

function createProduct(req, res) {
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


function handleRental(req, res) {
    // lógica para manejar el alquiler
    res.send({ message: "Rental handled" });
}

module.exports = {
    getProducts,
    createProduct,
    handleRental,
}



// exports.handleRental = (req, res) => {
//     const { productType, turns, paymentMethod } = req.body;

//     // Example of business logic
//     const pricePerTurn = 50;
//     let total = pricePerTurn * turns;

//     if (turns > 1) {
//         total *= 0.9; // Apply 10% discount
//     }

//     if (paymentMethod === 'cash') {
//         // maybe add logic to require early payment
//     }

//     res.json({ success: true, total });
// };


// exports.getProducts = (req, res) => {
//     const products = [
//         { id: 1, name: 'JetSki', requires: ['helmet', 'life jacket'] },
//         { id: 2, name: 'Cuatriciclo', requires: ['helmet'] },
//         { id: 3, name: 'Buceo', requires: [] },
//         { id: 4, name: 'Tabla de surf - Niños', requires: [] },
//         { id: 5, name: 'Tabla de surf - Adultos', requires: [] }
//     ];

//     res.json(products);
// };
