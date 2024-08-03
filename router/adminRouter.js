import { Router } from "express";
import {
    hello,
    createAdmin,
    delAdmin,
    updateAdmin,
} from "../controller/adminContoller.js";

const adminRouter = Router();

adminRouter.get('/', (req, res, next) => {
    next()
});

adminRouter.get('/hello', hello)
adminRouter.post('/create', createAdmin)
adminRouter.get('/delete/:id', delAdmin)
adminRouter.post('/update/:id', updateAdmin)

export default adminRouter;
