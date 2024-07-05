import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CustomException } from 'src/custom.exception';
import { OrderProductDto } from 'src/inventory/dto/inventory.dto';
import { Order } from 'src/inventory/schemas/order.model';
import { ProductNotification } from 'src/inventory/schemas/productNotification.model';
import { Product } from 'src/inventory/schemas/products.model';

@Injectable()
export class OrderService {
  async orderProduct(order: OrderProductDto, req: Request) {
    const user: any = req.user;
    const product = await Product.findOne({
      _id: order.productId,
      stock: { $gte: order.productQuantity },
      creator: { $ne: user.id },
    });

    if (!product) {
      throw new CustomException(
        'Product not found or Your provided quantity is not available',
        404,
      );
    }

    await Order.create({
      productId: product._id,
      requester_id: user.id,
      productQuantity: order.productQuantity,
    });
    await ProductNotification.create({
      sender: user.id,
      receiver: product.creator,
      message: `${user.name} request for ${order.productQuantity} ${product.name}`,
      productId: product._id,
    });

    const remainingStock = product.stock - order.productQuantity;

    await Product.findByIdAndUpdate(product._id, {
      stock: remainingStock,
    });

    return { message: 'Order Successfully.Your order is pending' };
  }

  async deleiverProduct(req: Request, orderId: string) {
    const user: any = req.user;

    const updateOrder = await Order.findByIdAndUpdate(orderId, {
      status: 'reached',
    });

    if (!updateOrder) {
      throw new CustomException('Order not found', 404);
    }

    await ProductNotification.create({
      sender: user.id,
      receiver: updateOrder.requester_id,
      message: `Your order reached`,
      productId: updateOrder.productId,
    });

    return { message: 'Order deleivered successfully' };
  }
}
