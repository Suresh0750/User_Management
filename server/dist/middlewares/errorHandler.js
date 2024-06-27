"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.log('errorHandler', error.message);
    let errorMessage = error.message || "An unexpected error";
    res.status(404).send(errorMessage);
};
exports.errorHandler = errorHandler;
