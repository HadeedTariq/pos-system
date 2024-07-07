import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as mongoose from 'mongoose';
import { Product } from 'src/inventory/schemas/products.model';

@Injectable()
export class SellerService {
  async getSellerSales(req: Request) {
    const user: any = req.user;

    const sellerSales = await Product.aggregate([
      {
        $match: {
          creator: new mongoose.Types.ObjectId(user.id),
        },
      },
      {
        $lookup: {
          from: 'orders',
          foreignField: 'productId',
          localField: '_id',
          as: 'productSales',
          pipeline: [
            {
              $match: {
                status: 'delivered',
              },
            },
            {
              $group: {
                _id: '$productQuantity',
                totalSaledStock: { $sum: '$productQuantity' },
              },
            },
          ],
        },
      },
      {
        $unwind: '$productSales',
      },
      {
        $project: {
          productSales: 1,
          price: 1,
          totalSale: {
            $multiply: ['$productSales.totalSaledStock', '$price'],
          },
        },
      },
    ]);

    return sellerSales;
  }
}
