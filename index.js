const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


let rides = [];
let rideIdCounter = 1;


app.post('/book-ride', (req, res) => {
  const { user, pickupLocation, dropLocation } = req.body;

  if (!user || !pickupLocation || !dropLocation) {
    return res.status(400).json({ message: 'Missing required fields!' });
  }

  const ride = {
    id: rideIdCounter++,
    user,
    pickupLocation,
    dropLocation,
    status: 'Booked',
  };

  rides.push(ride);

  res.status(201).json({
    message: 'Ride booked successfully!',
    ride,
  });
});


app.get('/rides', (req, res) => {
  res.json({ rides });
});


app.get('/ride/:id', (req, res) => {
  const rideId = parseInt(req.params.id);
  const ride = rides.find((r) => r.id === rideId);

  if (!ride) {
    return res.status(404).json({ message: 'Ride not found!' });
  }

  res.json({ ride });
});


app.delete('/ride/:id', (req, res) => {
  const rideId = parseInt(req.params.id);
  const rideIndex = rides.findIndex((r) => r.id === rideId);

  if (rideIndex === -1) {
    return res.status(404).json({ message: 'Ride not found!' });
  }

  rides.splice(rideIndex, 1);

  res.json({ message: 'Ride canceled successfully!' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


