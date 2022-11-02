const express = require('express');
const connectToMongo = require('./db');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const clientRouter = require('./routes/clientRoute');
const canteenRouter = require('./routes/canteenRoute');
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');
// const reviewRouter = require('./routes/reviewRoute');

const app = express();
const port = process.env.PORT;

connectToMongo();

app.use(express.json());

app.get('/api/call', (req, res)=>{
    res.send('hello world');
})

// simple middleware - this widdleware function will invoke every-each and one request
// app.use((req, res, next) => {
//     console.log("hello from the Middleware!");
//     next();
// });

// Availble Routes | URLs | Recourse
app.use('/api/v1/users', userRouter);
app.use('/api/v1/clients', clientRouter);
app.use('/api/v1/canteens', canteenRouter);
app.use('/api/v1/products', productRouter);
// app.use('/api/v1/reviews', reviewRouter);
console.log('ChaiNasta is Working')

// * means all URL
app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on this server!`
    // })

    // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    // err.status = 'fail';
    // err.statusCode = 400;

    // next(err);
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));

})

// MIDDLEWARE FUNCTION, for global error handling
app.use(globalErrorHandler)


app.listen(port, () => {
    console.log(`ChaiNasta App listening on ${port}`);
});