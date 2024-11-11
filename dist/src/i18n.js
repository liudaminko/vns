"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var i18next_1 = __importDefault(require("i18next"));
var react_i18next_1 = require("react-i18next");
var i18next_browser_languagedetector_1 = __importDefault(require("i18next-browser-languagedetector"));
var i18next_http_backend_1 = __importDefault(require("i18next-http-backend"));
i18next_1.default
    .use(i18next_http_backend_1.default) // Load translations using HTTP backend
    .use(i18next_browser_languagedetector_1.default) // Detect user language
    .use(react_i18next_1.initReactI18next) // Pass the i18n instance to react-i18next
    .init({
    fallbackLng: "en",
    debug: true,
    interpolation: {
        escapeValue: false, // Not needed for React as it already escapes
    },
    backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to translation files
    },
});
exports.default = i18next_1.default;
