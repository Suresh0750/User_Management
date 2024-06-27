"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const formValidation_1 = require("../helpers/formValidation");
exports.default = {
    signupPost: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const validate = (0, formValidation_1.signupValidator)(req.body);
            console.log("validate", validate);
            if (!validate)
                throw new Error("Invalid Data");
            console.log(req.body, 'req body');
            // res.send('developer')
            res.status(200).send('back end working');
        }
        catch (error) {
            next(error);
        }
    })
};
