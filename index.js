import { initializeApp } from 'firebase-admin/app';
import admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import adminRouter from './router/adminRouter.js';
import userRouter from './router/userRouter.js';
import bodyParser from 'body-parser';
import serviceAccount from './service-account-file.js';

const app = express();
const port = process.env.PORT || 3001;

initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://penjualan-7c9e9.firebaseio.com'
});

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.listen(port, () => {
    console.log('ready listening some request');
})

