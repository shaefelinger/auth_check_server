exports.getAuthHome = (req, res, next) => {
  res.send('>>Auth root!');
};

///////////////////// List of ALL users
exports.get('/list', (req, res, next) => {
  User.find((err, foundUsers) => {
    console.log('GET all Users');
    if (!err) {
      res.send(foundUsers);
    } else {
      res.send(err);
    }
  });
});
