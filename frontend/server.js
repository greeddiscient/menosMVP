// server/app.js
const express = require('express');
const path = require('path');



var app = express();
app.use('/',express.static(path.resolve(__dirname, 'build')));

app.use('/mentorportal',express.static(path.resolve(__dirname, '../mentorPortal', 'build')));

app.get('/mentorportal/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../mentorPortal', 'build', 'index.html'));
});

// Always return the main index.html, so react-router render the route in the client
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
// const PORT = process.env.PORT || 9000;
// 
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });





exports.app = app
