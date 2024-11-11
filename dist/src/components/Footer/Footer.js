"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var Footer_module_css_1 = __importDefault(require("./Footer.module.css"));
var Footer = function () {
    return ((0, jsx_runtime_1.jsxs)("footer", { className: Footer_module_css_1.default.footer, children: [(0, jsx_runtime_1.jsxs)("div", { className: Footer_module_css_1.default.footerContent, children: [(0, jsx_runtime_1.jsx)("p", { children: "Created by:" }), (0, jsx_runtime_1.jsxs)("ul", { className: Footer_module_css_1.default.studentList, children: [(0, jsx_runtime_1.jsx)("li", { children: "\u0413\u0443\u043A \u0410. \u041C." }), (0, jsx_runtime_1.jsx)("li", { children: "\u041C\u0438\u043D\u0430 \u041C. \u0410." }), (0, jsx_runtime_1.jsx)("li", { children: "\u041C\u0456\u043D\u044C\u043A\u043E\u0432\u0435\u0446\u044C \u041B. \u0412." }), (0, jsx_runtime_1.jsx)("li", { children: "\u041C\u043E\u0440\u043E\u0437 \u0412. \u041E." })] })] }), (0, jsx_runtime_1.jsxs)("nav", { className: Footer_module_css_1.default.footerNav, children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/home", className: Footer_module_css_1.default.navLink, children: "Home" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/about", className: Footer_module_css_1.default.navLink, children: "About" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/contact", className: Footer_module_css_1.default.navLink, children: "Contact" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/support", className: Footer_module_css_1.default.navLink, children: "Support" })] })] }));
};
exports.default = Footer;
