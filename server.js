var vhost = require('vhost');
var express = require('express')
var apiApp =require('./api/server')
var mentorsApp =require('./mentorPortal/server')
var frontendApp = require('./frontend/server')

var app =express()

//local
// app.use(vhost('api.lvh.me', apiApp.app))
// .use(vhost('mentors.lvh.me', mentorsApp.app))
// .use(vhost('lvh.me', frontendApp.app))

//prod
app.use(vhost('api.menos.id', apiApp.app))
.use(vhost('mentors.menos.id', mentorsApp.app))
.use(vhost('menos.id', frontendApp.app))
.use(vhost('www.menos.id', frontendApp.app))

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
