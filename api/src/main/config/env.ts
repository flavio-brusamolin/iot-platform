export default {
  port: process.env.PORT || 8080,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/iot-platform',
  jwtSecret: process.env.JWT_SECRET || 'f13gK!#op*12f9$'
}
