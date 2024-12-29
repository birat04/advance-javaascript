const express = require('express');
const app = express();
app.use(express.json());


let kidneys = [
    { id: 1, health: 'Healthy' },
    { id: 2, health: 'Healthy' }
];

// 1. GET - Check how many kidneys the user has and their health
app.get('/kidneys', (req, res) => {
    res.json({
        count: kidneys.length,
        kidneys: kidneys
    });
});

// 2. POST - Add a new kidney
app.post('/kidneys', (req, res) => {
    const newKidney = {
        id: kidneys.length + 1,
        health: req.body.health || 'Healthy' 
    };
    kidneys.push(newKidney);
    res.status(201).json({
        message: 'New kidney added successfully',
        kidney: newKidney
    });
});

// 3. PUT - Replace a kidney, make it healthy
app.put('/kidneys/:id', (req, res) => {
    const kidneyId = parseInt(req.params.id);
    const kidneyIndex = kidneys.findIndex(k => k.id === kidneyId);

    if (kidneyIndex === -1) {
        return res.status(404).json({ message: 'Kidney not found' });
    }

    kidneys[kidneyIndex] = { id: kidneyId, health: 'Healthy' };
    res.json({
        message: `Kidney with ID ${kidneyId} replaced and made healthy`,
        kidney: kidneys[kidneyIndex]
    });
});

// 4. DELETE - Remove a kidney
app.delete('/kidneys/:id', (req, res) => {
    const kidneyId = parseInt(req.params.id);
    const kidneyIndex = kidneys.findIndex(k => k.id === kidneyId);

    if (kidneyIndex === -1) {
        return res.status(404).json({ message: 'Kidney not found' });
    }

    const removedKidney = kidneys.splice(kidneyIndex, 1);
    res.json({
        message: `Kidney with ID ${kidneyId} removed successfully`,
        kidney: removedKidney[0]
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
