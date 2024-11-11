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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bcrypt_1 = __importDefault(require("bcrypt"));
var Users_1 = __importDefault(require("../models/Users"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var crypto_1 = __importDefault(require("crypto"));
var emailService_1 = require("../emailService");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var router = (0, express_1.Router)();
var transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
router.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, generateHashedPassword, isMatch, twoFactorCode, twoFactorExpires, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                console.log("Received email:", email);
                return [4 /*yield*/, Users_1.default.findOne({ email: email })];
            case 2:
                user = _b.sent();
                console.log("User found:", user);
                generateHashedPassword = function (plainPassword) { return __awaiter(void 0, void 0, void 0, function () {
                    var saltRounds, hashedPassword;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                saltRounds = 10;
                                return [4 /*yield*/, bcrypt_1.default.hash(plainPassword, saltRounds)];
                            case 1:
                                hashedPassword = _a.sent();
                                console.log("Hashed Password:", hashedPassword);
                                return [2 /*return*/];
                        }
                    });
                }); };
                generateHashedPassword("28.09.2003");
                if (!user)
                    return [2 /*return*/, res.status(400).json({ message: "User not found" })];
                console.log("EMAIL_USER:", process.env.EMAIL_USER);
                console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
                console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
                console.log("GOOGLE_REFRESH_TOKEN:", process.env.GOOGLE_REFRESH_TOKEN);
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 3:
                isMatch = _b.sent();
                if (!isMatch)
                    return [2 /*return*/, res.status(400).json({ message: "Incorrect password" })];
                twoFactorCode = crypto_1.default.randomInt(100000, 999999).toString();
                twoFactorExpires = new Date(Date.now() + 5 * 60 * 1000);
                user.twoFactorCode = twoFactorCode;
                user.twoFactorExpires = twoFactorExpires;
                return [4 /*yield*/, user.save()];
            case 4:
                _b.sent();
                return [4 /*yield*/, (0, emailService_1.sendEmail)(email, "Your Two-Factor Authentication Code", "Your verification code is: ".concat(twoFactorCode))];
            case 5:
                _b.sent();
                res.status(200).json({ message: "2FA code sent to email" });
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                console.error("Error during login:", error_1);
                res.status(500).json({ message: "Server error" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
router.post("/verify-2fa", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, code, user, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, code = _a.code;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Users_1.default.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).json({ message: "User not found" })];
                if (user.twoFactorCode !== code ||
                    !user.twoFactorExpires ||
                    user.twoFactorExpires.getTime() < Date.now()) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid or expired code" })];
                }
                user.twoFactorCode = null;
                user.twoFactorExpires = null;
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                token = "dummy-jwt-token";
                res.status(200).json({ message: "Authentication successful", token: token });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.error("Error during verification:", error_2);
                res.status(500).json({ message: "Server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
