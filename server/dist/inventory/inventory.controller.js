"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const inventory_dto_1 = require("./dto/inventory.dto");
const auth_guard_1 = require("../auth/auth.guard");
const custom_exception_1 = require("../custom.exception");
const inventory_service_1 = require("./inventory.service");
const product_service_1 = require("./services/product/product.service");
const order_service_1 = require("./services/order/order.service");
const seller_service_1 = require("./services/seller/seller.service");
const stripe_1 = require("stripe");
let InventoryController = class InventoryController {
    constructor(inventoryService, productService, orderService, sellerService) {
        this.inventoryService = inventoryService;
        this.productService = productService;
        this.orderService = orderService;
        this.sellerService = sellerService;
    }
    async createProduct(file, req, product) {
        if (!file) {
            throw new custom_exception_1.CustomException('Product main image required', 404);
        }
        const result = await this.productService.uploadProductImage(file);
        const extraImages = JSON.parse(product.extraImages);
        return this.productService.createProduct({
            ...product,
            image: result.secure_url,
            price: +product.price,
            stock: +product.stock,
            extraImages,
        }, req);
    }
    deleteProduct(req, { productId }) {
        return this.productService.deleteProduct(productId, req);
    }
    async editProduct(editedProduct, req) {
        if (String(editedProduct.outOfStock) === 'true' &&
            Number(editedProduct.stock) > 0) {
            throw new custom_exception_1.CustomException('Please set the value of stock to zero', 404);
        }
        const extraImages = editedProduct.extraImages;
        return this.productService.editProduct({
            ...editedProduct,
            price: +editedProduct.price,
            stock: +editedProduct.stock,
            extraImages,
        }, req);
    }
    getProducts(req) {
        return this.productService.getProducts(req);
    }
    orderProduct(order, req) {
        return this.orderService.orderProduct(order, req);
    }
    deleiverProduct({ orderId }, req) {
        return this.orderService.deleiverProduct(req, orderId);
    }
    cancelOrderBySeller({ orderId }, req) {
        return this.orderService.cancelOrderBySeller(req, orderId);
    }
    cancelOrderByUser({ orderId }, req) {
        return this.orderService.cancelOrderByUser(req, orderId);
    }
    getSellerSales(req) {
        return this.sellerService.getSellerSales(req);
    }
    getSellerProducts(req) {
        return this.sellerService.getSellerProducts(req);
    }
    getSellerPendingOrders(req) {
        return this.sellerService.getSellerPendingOrders(req);
    }
    getSellerNotification(req) {
        return this.sellerService.getSellerNotification(req);
    }
    getMyOrders(req) {
        return this.orderService.getMyOrders(req);
    }
    async stripeWebHook(req) {
        const stripe = new stripe_1.default(process.env.STRIPE_SECRET);
        const sig = req.headers['stripe-signature'];
        const rawBody = req.rawBody;
        let event;
        try {
            event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
            await this.orderService.handleEvent(event);
        }
        catch (err) {
            console.log(err, 'handleWebhook');
            throw new common_1.HttpException(`Webhook Error: ${err.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('createProduct'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, inventory_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createProduct", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('deleteProduct'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, inventory_dto_1.DeleteProductDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('editProduct'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_dto_1.EditProductDto, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "editProduct", null);
__decorate([
    (0, common_1.Get)('/products'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "getProducts", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('orderProduct'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_dto_1.OrderProductDto, Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "orderProduct", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('seller/deleiverProduct'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_dto_1.DeleiverProductDto, Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "deleiverProduct", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('seller/cancelOrder'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_dto_1.CancelOrderDto, Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "cancelOrderBySeller", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('user/cancelOrder'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_dto_1.CancelOrderDto, Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "cancelOrderByUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('seller/sales'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "getSellerSales", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('seller/products'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "getSellerProducts", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('seller/pendingOrders'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "getSellerPendingOrders", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('seller/notifications'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "getSellerNotification", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('myOrders'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "getMyOrders", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "stripeWebHook", null);
exports.InventoryController = InventoryController = __decorate([
    (0, common_1.Controller)('inventory'),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService,
        product_service_1.ProductService,
        order_service_1.OrderService,
        seller_service_1.SellerService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map