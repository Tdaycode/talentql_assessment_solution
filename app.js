require('dotenv').config();
const express = require('express');
const httpStatus = require('http-status');
const passport = require('passport');
const cors = require("cors");
const { jwtStrategy } = require('./config/passport');
const AuthRoutes = require('./routes/auth.route');
const PostRoutes = require('./routes/post.route');
const DocsRoute = require('./routes/docs.route');
const ApiError = require('./utils/ApiError');
const { errorConverter, errorHandler } = require('./middleware/error');

var app = express();

// CORS
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    optionsSuccessStatus: 204,
};  
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1', PostRoutes);

// Documentation routes available only in development mode
if (process.env.NODE_ENV !== 'production') {
    app.use('/docs/v1', DocsRoute);
}

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;