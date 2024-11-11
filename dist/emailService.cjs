"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
exports.createTransporter = createTransporter;
var nodemailer_1 = __importDefault(require("nodemailer"));
var googleapis_1 = require("googleapis");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
var REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
var REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
var EMAIL_USER = process.env.EMAIL_USER;
var oauth2Client = new googleapis_1.google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
function createTransporter() {
  return __awaiter(this, void 0, void 0, function () {
    var accessToken, transporter, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          _c.trys.push([0, 2, , 3]);
          return [4 /*yield*/, oauth2Client.getAccessToken()];
        case 1:
          accessToken = _c.sent();
          if (accessToken.token) {
            console.log("Access Token:", accessToken.token);
          } else {
            console.error(
              "Failed to obtain access token:",
              (_b =
                (_a = accessToken.res) === null || _a === void 0
                  ? void 0
                  : _a.data) !== null && _b !== void 0
                ? _b
                : "No response data"
            );
          }
          transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: process.env.EMAIL_USER,
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
              accessToken: accessToken.token,
            },
          });
          return [2 /*return*/, transporter];
        case 2:
          error_1 = _c.sent();
          console.error("Failed to create transporter:", error_1);
          return [3 /*break*/, 3];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function sendEmail(to, subject, text) {
  return __awaiter(this, void 0, void 0, function () {
    var transporter, mailOptions, error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, createTransporter()];
        case 1:
          transporter = _a.sent();
          mailOptions = {
            from: "Your App <".concat(process.env.EMAIL_USER, ">"),
            to: to,
            subject: subject,
            text: text,
          };
          if (!transporter) {
            console.error("Transporter is not defined");
            return [2 /*return*/];
          }
          _a.label = 2;
        case 2:
          _a.trys.push([2, 4, , 5]);
          return [4 /*yield*/, transporter.sendMail(mailOptions)];
        case 3:
          _a.sent();
          console.log("Email sent successfully");
          return [3 /*break*/, 5];
        case 4:
          error_2 = _a.sent();
          console.error("Error sending email:", error_2);
          return [3 /*break*/, 5];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}