const app = require('./config/express')();
const PORT = process.env.PORT || 3050;

app.listen(PORT, () => {
  console.log(`Service is running on port ${PORT}`)
})
