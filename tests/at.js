const clib = require('./lib/lib.js')

clib.alltags().then(tags => {
  console.log(tags)
})