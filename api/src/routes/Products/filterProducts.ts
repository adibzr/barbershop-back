import { Router } from "express";

import ProductModel from "../../models/products";

const router = Router();

router.get("/", async (req, res) => {
  let { filterBarberTools } = req.query;

  if (filterBarberTools) {
    try {
      const products = await ProductModel.find({
        categories: { $regex: ".*" + "barbertool" + ".*" },
      });
      res.send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

export default router;
