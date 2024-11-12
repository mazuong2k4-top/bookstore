require('dotenv').config()
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const cors = require('cors')
const cookieParser = require('cookie-parser');
const Redis = require('ioredis'); // Import ioredis




const app = express()
app.use(morgan("dev"));
app.use(helmet());
app.use(
	compression({
		level: 6,
		threshold: 100 * 1000, // if file is compressed when storage > 100kb
	}),
);
const whitelist = ['http://localhost:3000', process.env.REACT_APP_URL, process.env.REACT_APP_URL_1]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

const connectMongoDB = require('./db')
connectMongoDB()

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const routes = require('./routes')
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

routes(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, function () {
  console.log(`Server đang chạy PORT ${PORT}`)

  const redis = new Redis({
    host: '127.0.0.1', // Hoặc 'localhost'
    port: 6379,
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    connectTimeout: 20000,
  });


  // Kiểm tra kết nối Redis
  redis.on('connect', () => {
    console.log('Kết nối tới Redis thành công');
  });

  redis.on('error', (err) => {
    console.error('Lỗi kết nối Redis:', err);
  });
});
