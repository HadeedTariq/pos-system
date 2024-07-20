import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import mongoose from 'mongoose';
import { CustomException } from 'src/custom.exception';
import { OrderProductDto } from 'src/inventory/dto/inventory.dto';
import { Order } from 'src/inventory/schemas/order.model';
import { ProductNotification } from 'src/inventory/schemas/productNotification.model';
import { Product } from 'src/inventory/schemas/products.model';
import Stripe from 'stripe';

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

    const totalPrice = order.productQuantity * product.price;

    const newOrder = await Order.create({
      productId: product._id,
      requester_id: user.id,
      productQuantity: order.productQuantity,
      totalPrice,
    });
    await ProductNotification.create({
      sender: user.id,
      receiver: product.creator,
      message: `${user.name} request for ${order.productQuantity} ${product.name}`,
      productId: product._id,
      orderId: newOrder._id,
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
      orderId: updateOrder._id,
    });

    return { message: 'Order deleivered successfully' };
  }

  async cancelOrderBySeller(req: Request, orderId: string) {
    const user: any = req.user;

    const updateOrder = await Order.findByIdAndUpdate(orderId, {
      status: 'cancel',
    });

    if (!updateOrder) {
      throw new CustomException('Order not found', 404);
    }

    if (updateOrder.status === 'cancel') {
      throw new CustomException('Order already canceled', 200);
    }

    await Product.findByIdAndUpdate(updateOrder.productId, {
      $inc: { stock: updateOrder.productQuantity },
    });

    await ProductNotification.create({
      sender: user.id,
      receiver: updateOrder.requester_id,
      message: `Your order canceled`,
      productId: updateOrder.productId,
      orderId: updateOrder._id,
    });

    return { message: 'Order canceled successfully' };
  }

  async cancelOrderByUser(req: Request, orderId: string) {
    const user: any = req.user;

    const { status } = await Order.findOne({
      _id: orderId,
    });

    if (status && status === 'delivered') {
      return { message: "Your order is deleiverd You cann't Cancel it" };
    }

    const updateOrder = await Order.findByIdAndUpdate(orderId, {
      status: 'cancel',
    });

    if (!updateOrder) {
      throw new CustomException('Order not found', 404);
    }

    if (updateOrder.status === 'cancel') {
      throw new CustomException('Order already canceled', 200);
    }
    const product = await Product.findByIdAndUpdate(updateOrder.productId, {
      $inc: { stock: updateOrder.productQuantity },
    });

    await ProductNotification.create({
      sender: user.id,
      receiver: product.creator,
      message: `User cancel the order of ${product.name}`,
      productId: updateOrder.productId,
      orderId: updateOrder._id,
    });

    return { message: 'Order canceled successfully' };
  }

  async getMyOrders(req: Request) {
    const user: any = req.user;

    const myOrders = await Order.aggregate([
      {
        $match: {
          requester_id: new mongoose.Types.ObjectId(user.id),
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product',
          pipeline: [
            {
              $project: {
                name: 1,
                image: 1,
                price: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: '$product',
      },
    ]);

    return myOrders;
  }

  async handleEvent(event: Stripe.Event) {
    console.log('event called');

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(paymentIntent, 'paymentIntent');
        break;
      case 'identity.verification_session.created':
        const verificationCreated = event.data.object;
        console.log(verificationCreated, 'verificationCreated');
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return { message: 'Request accepted' };
  }
}
