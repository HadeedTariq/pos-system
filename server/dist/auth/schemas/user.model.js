"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
exports.userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
    },
    password: {
        type: String,
        required: false,
    },
    refreshToken: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ['Seller', 'User', 'Admin'],
        default: 'User',
    },
    provider: {
        type: String,
        enum: ['google', 'app'],
        default: 'app',
    },
}, {
    timestamps: true,
});
exports.userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
exports.userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};
exports.User = mongoose_1.default.model('User', exports.userSchema);
//# sourceMappingURL=user.model.js.map