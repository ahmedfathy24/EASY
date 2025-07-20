import  express from 'express'
import { dbConnection } from './db/dbconnection.js' ;
import cors from 'cors'
import userRoutes from './src/modules/users/user_routes.js';
import productRoutes from './src/modules/products/product_routes.js';
import cartRoutes from './src/modules/cart/cart_routes.js';
import orderRoutes from './src/modules/orders/order_routes.js';

const app = express()
app.use(cors())
app.use(express.json());

await dbConnection();

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/admin/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})