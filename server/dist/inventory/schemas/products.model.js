"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    creator: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    details: { type: String, required: true },
    extraImages: {
        type: [String],
    },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    used: { type: Boolean, required: true },
    outOfStock: { type: Boolean, default: false },
    purchasers: [
        {
            user: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'User' },
            quantity: Number,
        },
    ],
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)('Product', productSchema);
//# sourceMappingURL=products.model.js.map