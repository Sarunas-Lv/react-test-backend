import express, { response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';

import User from './models/userModel.js';
import Score from './models/scoreModel.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Connecting DB (DONE)
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((response) => {
    console.log(`Connected to MongoDB`.blue.underline.bold);
    // Starting server (DONE)
    app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}...`.yellow.underline.bold)
    );
  })
  .catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => res.send('API is running...'));

// GET: all votes (DONE)
app.get('/api/votes', async (req, res) => {
  let users = await User.find({});
  let score = await Score.find({});

  let usersAndScore = users.reduce((total, user) => {
    let userScore = score.filter((vote) => vote.user_id === '' + user._id);

    total.push({ ...user.toObject(), votes: [...userScore] });
    return total;
  }, []);
  res.json(usersAndScore);
});

// GET: votes only
app.get('/votes', async (req, res) => {
  let score = await Score.find({});
  res.json(score);
});
// GET: get single user based on id (DONE)
app.get('/api/users/:id', async (req, res) => {
  let userId = req.params.id;

  let user = await User.findById(userId);
  let score = await Score.find({ user_id: userId });

  res.json({ ...user.toObject(), score: [...score] });
});

// POST: register new user (DONE)
app.post('/api/users/signup', (req, res) => {
  let user = req.body;

  User.find().then((result) => {
    const userExists = result.some(
      (userFromDB) => userFromDB.email === user.email
    );

    if (userExists) {
      res.json({
        registrationStatus: 'failed',
        message: 'User with given email already exists',
      });
    } else {
      user.score;

      const newUser = new User(user);

      newUser.save().then((result) => {
        let { _id } = result;
        res.json({
          registrationStatus: 'success',
          userId: _id,
        });
      });
    }
  });
});

// POST: Log in existing user (DONE)
app.post('/api/users/login', (req, res) => {
  let user = req.body;

  User.find().then((result) => {
    let userFounded = result.find(
      (userFromDB) =>
        userFromDB.email === user.email && userFromDB.password === user.password
    );

    if (userFounded) {
      let { _id } = userFounded;

      res.json({
        loginStatus: 'success',
        userId: _id,
      });
    } else {
      res.status(401).json({
        loginStatus: 'failed',
        message: 'Given email or password is incorrect',
      });
    }
  });
});

// // post: Add single vote (DONE)
app.post('/api/votes/add/', async (req, res) => {
  let scoreInfo = req.body;

  let userId = scoreInfo.user_id;

  let newScore = new Score(scoreInfo);

  newScore.save();
  ``;

  let user = await User.findById(userId);
  let votes = await Score.find({ user_id: userId });

  res.json({ ...user.toObject(), votes: [...votes] });
});

// // DELETE: Delete single car based on user_Id and score (for listed DB with multiple collections)
app.delete('/api/votes/delete/:id/:score', async (req, res) => {
  const userId = req.params.id;
  const voteScore = +req.params.score;
  const deletedVote = await Score.deleteOne({
    user_id: userId,
    score: voteScore,
  });
  const user = await User.findById(userId);
  const votes = await Score.find({ user_id: deletedVote.user_id });

  res.json({ ...user.toObject(), votes: [...votes] });
});

// --------------------------------------------------------------------
// REST API
/*
GET:     /api/cars              | Get all cars
         /api/users/:id         | Get single user based on id

POST:    /api/users/signup      | Register new user
         /api/users/login       | Log in existing user

PUT:     /api/cars/delete/:id   | Delete single car based on it's id (for embeded DB with one collention)
         /api/cars/add/:id      | Add single car to user based on his id

DELETE:  /api/cars/delete/:id   | Delete single car based on it's id (for listed DB with multiple collections)
*/
//---------------------------------------------------------------------
