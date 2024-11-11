"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Grades_module_css_1 = __importDefault(require("./Grades.module.css"));
function Grades() {
    return ((0, jsx_runtime_1.jsx)("div", { className: Grades_module_css_1.default.container, children: (0, jsx_runtime_1.jsx)("h1", { children: "GRADES PAGE" }) }));
}
exports.default = Grades;
