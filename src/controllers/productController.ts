import type { Request, Response } from "express";
import Product from "../database/models/productModel.js";
import Category from "../database/models/categoryModel.js";

interface ProductRequest extends Request {
  file?: {
    filename: string;
  };
}

class ProductController {
  async createProduct(req:ProductRequest, res:Response):Promise<void> {
    const { productName, productDescription, productPrice, productTotalStock, discount, categoryId } = req.body;
    const filename = req.file ? req.file.filename : "https://static.vecteezy.com/system/resources/previews/022/058/960/large_2x/no-image-available-icon-vector.jpg"
    
    if ( !productName || !productDescription || !productPrice || !productTotalStock || !categoryId ) {
      res.status(400).json({
        message: "Please prvide product name, description, price, total stock, discount",
      });
      return;
    }
    await Product.create({
      productName,
      productDescription,
      productPrice,
      productTotalStock,
      discount: discount || 0,
      categoryId,
      productImageUrl: filename,
    });
    res.status(200).json({
      message: "Product created successfully",
    });
  }

  async getAllProduct(req:Request, res:Response):Promise<void> {
    const datas = await Product.findAll({
      include: [
        {
          model: Category,
        },
      ],
    });
    res.status(200).json({
      message: "Product fetched successfully",
      data: datas,
    });
  }

  async getSingleProduct(req:Request, res:Response):Promise<void> {
    const { id } = req.params;
    const datas = await Product.findAll({
      where: {
        id: id,
      },
      include: [
        {
          model: Category,
        },
      ],
    });
    res.status(200).json({
      message: "Product fetched successfully",
      data: datas,
    });
  }

  async deleteProduct(req:Request, res:Response):Promise<void> {
    const {id} = req.params
    const datas = await Product.findAll({
      where : {
        id : id
      }
    })
    if(datas.length === 0){
      res.status(404).json({
        message : "No product with this id"
      })
    }else{
      await Product.destroy({
        where : {
          id : id
        }
      })
      res.status(200).json({
        message : "Product deleted successfully",
        data : datas
      })
    }
  }
}


export default new ProductController