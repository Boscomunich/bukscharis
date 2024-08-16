require ('dotenv').config()
import express from 'express';
export default express;
const cors = require('cors')
const Auth = require('./middleware/Auth')
const errorHandler = require('./middleware/Errors')

const client = process.env.CLIENT
const server = process.env.SERVER
const local = process.env.LOCAL
const localApi = process.env.LOCAL_API
const PORT = process.env.PORT
const allowedOrigins = [client, server, local, localApi]

const app = express()


app.use(cors({
    origin: allowedOrigins,
    credentials: true}));
app.use(express.json({}));
app.use(express.urlencoded({extended: true}))

app.use('/api/user', require('./routes/UserRoute'))
app.use('/api/admin', require('./routes/AdminRoutes'))
app.use('/api/product', Auth, require('./routes/ProductRoute'))
app.use('/api/order', Auth, require('./routes/OrdersRoute'))

app.use(errorHandler)

const start = async () => {
    app.listen(PORT, () => {
        console.log('listening to port', PORT)
    }) 
}
start()