const http = require('http')
const app = require('./app')
const logger = require('./utils/logger')
const { PORT } = require('./utils/config.js')

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`server runnig at port ${PORT}`)
})
