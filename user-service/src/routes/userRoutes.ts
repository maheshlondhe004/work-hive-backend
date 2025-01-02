const User = require('../models/User'); // Adjust the path as necessary
// const { Request, Response } = require('express');

const router = express.Router();

// Create a new user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all users
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a user by ID
router.get('/users/:id', async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a user by ID
router.patch('/users/:id', async (req: Request, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password']; // Adjust fields as necessary
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    updates.forEach(update => (user[update] = req.body[update]));
    await user.save();

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;