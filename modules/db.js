// Mongoose
// ==========================================================================
const mongoose = require('mongoose');

const url =
  'mongodb+srv://dbUser:' +
  process.env.MONGO_PW +
  '@cluster0.dq3y7.mongodb.net/' +
  process.env.MONGO_DB;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log('Database ready'))
  .catch((err) => {
    console.error('😱Connection to MongoDB went wrong : ' + err);
  });

// ==========================================================================

// Users
// ==========================================================================

// const userSchema = mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   profilePic: String,
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
