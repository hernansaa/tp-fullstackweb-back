exports.handleRental = (req, res) => {
    const { productType, turns, paymentMethod } = req.body;

    // Example of business logic
    const pricePerTurn = 50;
    let total = pricePerTurn * turns;

    if (turns > 1) {
        total *= 0.9; // Apply 10% discount
    }

    if (paymentMethod === 'cash') {
        // maybe add logic to require early payment
    }

    res.json({ success: true, total });
};


exports.getProducts = (req, res) => {
    const products = [
        { id: 1, name: 'JetSki', requires: ['helmet', 'life jacket'] },
        { id: 2, name: 'Cuatriciclo', requires: ['helmet'] },
        { id: 3, name: 'Buceo', requires: [] },
        { id: 4, name: 'Tabla de surf - Niños', requires: [] },
        { id: 5, name: 'Tabla de surf - Adultos', requires: [] }
    ];

    res.json(products);
};
