import express from 'express'
import {
    getCost,
    getKota,
    getProvinsi,
    createEwalletCharge,
    ewallet_payment_success_callback,
    create_virtual_banking_charge,
    virtual_banking_payment_success_callback,
    virtual_banking_payment_expired_callback,
    simulate_virtual_banking_payment,
    successRedirectUrl,
    failedRedirectUrl,
    create_qrcode,
    qrcode_payment_success
} from '../controller/userContoller.js'


const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
    next();
})

userRouter.get('/getCost/:dari/:ke/:berat/:kurir', getCost);
userRouter.get('/getKota/:provinsi', getKota);
userRouter.get('/getProvinsi', getProvinsi);
userRouter.get('/success_redirect_url', successRedirectUrl);
userRouter.get('/failed_redirect_url', failedRedirectUrl);
userRouter.post('/create_ewallet_charge', createEwalletCharge);
userRouter.post('/ewallet_payment_success_callback', ewallet_payment_success_callback);
userRouter.post('/create_virtual_banking_charge', create_virtual_banking_charge);
userRouter.post('/simulate_virtual_banking_payment', simulate_virtual_banking_payment);
userRouter.post('/virtual_banking_payment_success_callback', virtual_banking_payment_success_callback)
userRouter.post('/virtual_banking_payment_expired_callback', virtual_banking_payment_expired_callback)
userRouter.post('/create_qrcode', create_qrcode)
userRouter.post('/qrcode_payment_success', qrcode_payment_success)

export default userRouter;