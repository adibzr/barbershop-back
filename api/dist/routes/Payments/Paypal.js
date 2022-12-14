"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = require("express");
const purchaseOrder_1 = __importDefault(require("../../models/purchaseOrder"));
const checkStock_1 = require("../../middlewares/checkStock");
const router = (0, express_1.Router)();
router.post("/create-order", checkStock_1.checkStock, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
<<<<<<< HEAD
    const { purchase_units, products } = req.body;
    try {
        const order = {
            intent: "CAPTURE",
            purchase_units,
=======
    const { user, compra } = req.body;
    let value = compra.reduce((acc, curr) => {
        return acc["price"] + curr["price"];
    });
    let productos = compra.map((obj) => {
        return { id: obj["id"], quantity: obj["cantidad"] };
    });
    const newOrder = new purchaseOrder_1.default({
        user: { id: user["user"] },
        products: productos,
    });
    newOrder.save();
    const idOrder = newOrder["_id"];
    try {
        const order = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    reference_id: `${idOrder}`,
                    amount: {
                        currency_code: "USD",
                        value: value,
                    },
                },
            ],
>>>>>>> 84d769f531ccf4fc1a1e2a486aa9abaa189b1ae5
            application_context: {
                brand_name: "Henry BarberShop",
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                return_url: "https://barbershop-roan.vercel.app/payments/capture-order",
                cancel_url: "https://barbershop-roan.vercel.app/payments/cancel-order",
            },
        };
        const response = yield axios_1.default.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders`, order, {
            auth: {
                username: "AVwlVSANTKRUrYDVQ0bmVEjUqaC9-RHw8qn3uRVp-xr4SzQae-1GmM4-B-V4y_bP2tCw7gKH2S8SfeKx",
                password: "EG_ZGG1BcPvJhGKbU0HafZRgg1mFMRGk0kZVULdRAL-ECDr5IYVzvA1aWNPXiWQHcSRHqxooNZnyoy6Z",
            },
        });
        //                  ACA DEBERIA CAMBIAR EL ESTADO DE LA ORDEN DE CAPTURANDO - PAGADA - ENVIADA
<<<<<<< HEAD
        // deleteStock(products);
=======
        //deleteStock(products);
        console.log("NEW ORDER", newOrder);
        console.log(response.data);
>>>>>>> 84d769f531ccf4fc1a1e2a486aa9abaa189b1ae5
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
router.get("/capture-order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
<<<<<<< HEAD
    const { token, PayerID } = req.query;
=======
    const { token } = req.query;
    console.log(token);
>>>>>>> 84d769f531ccf4fc1a1e2a486aa9abaa189b1ae5
    const response = yield axios_1.default.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: "AVwlVSANTKRUrYDVQ0bmVEjUqaC9-RHw8qn3uRVp-xr4SzQae-1GmM4-B-V4y_bP2tCw7gKH2S8SfeKx",
            password: "EG_ZGG1BcPvJhGKbU0HafZRgg1mFMRGk0kZVULdRAL-ECDr5IYVzvA1aWNPXiWQHcSRHqxooNZnyoy6Z",
        },
    });
<<<<<<< HEAD
    console.log(response.data);
=======
    console.log("PURCHASE", response.data.purchase_units[0].shipping);
>>>>>>> 84d769f531ccf4fc1a1e2a486aa9abaa189b1ae5
    res.status(200).send("capture");
}));
router.get("/cancel-order", (req, res) => {
    res.redirect("https://barbershop-front.vercel.app/product");
});
exports.default = router;
