"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModule = void 0;
const common_1 = require("@nestjs/common");
const inventory_service_1 = require("./inventory.service");
const auth_module_1 = require("../auth/auth.module");
const inventory_controller_1 = require("./inventory.controller");
const product_service_1 = require("./services/product/product.service");
const order_service_1 = require("./services/order/order.service");
const seller_service_1 = require("./services/seller/seller.service");
const jwt_1 = require("@nestjs/jwt");
let InventoryModule = class InventoryModule {
};
exports.InventoryModule = InventoryModule;
exports.InventoryModule = InventoryModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, jwt_1.JwtModule],
        controllers: [inventory_controller_1.InventoryController],
        providers: [inventory_service_1.InventoryService, product_service_1.ProductService, order_service_1.OrderService, seller_service_1.SellerService],
        exports: [jwt_1.JwtModule],
    })
], InventoryModule);
//# sourceMappingURL=inventory.module.js.map