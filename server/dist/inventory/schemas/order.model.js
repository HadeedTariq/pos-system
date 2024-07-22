"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    requester_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['pending', 'reached', 'delivered', 'cancel'],
        default: 'pending',
    },
    productQuantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
//# sourceMappingURL=order.model.js.map