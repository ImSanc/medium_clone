"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlog = exports.createBlog = void 0;
const zod_1 = require("zod");
exports.createBlog = zod_1.z.object({
    title: (0, zod_1.string)(),
    content: (0, zod_1.string)(),
    published: (0, zod_1.boolean)()
});
exports.updateBlog = zod_1.z.object({
    title: (0, zod_1.string)(),
    content: (0, zod_1.string)(),
    published: (0, zod_1.boolean)(),
    id: (0, zod_1.string)()
});
