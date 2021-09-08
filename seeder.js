import mongoose from 'mongoose';
import User from './models/userModel.js';
import Score from './models/scoreModel.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    let user = {
      name: 'Wild Boars',
      photo_url: 'https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_1/v1614591873/harareintlschoolcom/gl3siqrb9bvatt8szxlx/HISlogo-BrandSystem-14.jpg',
      email: 'john@email.com',
      password: '123456789',
    };

    let score = {
        score: 0,
    };

    User.insertMany(user);
    Score.insertMany(score);

    console.log('Data sucessfully sent to MongoDB');
  });
