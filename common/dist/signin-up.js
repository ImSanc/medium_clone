"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpInput = exports.signInInput = void 0;
const zod_1 = require("zod");
exports.signInInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
exports.signUpInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    name: zod_1.z.string().optional()
});
