export default {
  jwtSecret: process.env.JWT_SECRET || 'f13gK!#op*12f9$',
  port: process.env.PORT || 8080,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/iot-platform',
  rabbitUrl: process.env.RABBIT_URL || 'amqp://admin:admin@localhost:5672',
  queues: ['broker-connection', 'topic-subscription']
}
