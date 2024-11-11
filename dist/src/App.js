"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
// App.tsx
require("./App.css");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var Header_1 = __importDefault(require("./components/Header/Header"));
var Footer_1 = __importDefault(require("./components/Footer/Footer"));
var Home_1 = __importDefault(require("./pages/Home/Home"));
var Auth_1 = __importDefault(require("./pages/Auth/Auth"));
var PersonalCabinet_1 = __importDefault(require("./pages/PersonalCabinet/PersonalCabinet"));
var Grades_1 = __importDefault(require("./pages/Grades/Grades"));
var Reports_1 = __importDefault(require("./pages/Reports/Reports"));
var mockUsers_1 = require("./mockUsers");
var SidebarContext_1 = require("./SidebarContext");
function App() {
    var _a = (0, react_1.useState)(mockUsers_1.mockUsers[1]), currentUser = _a[0], setCurrentUser = _a[1];
    var handleVerifyCode = function (code) {
        // Handle the verification logic
        console.log("Verification code:", code);
    };
    return ((0, jsx_runtime_1.jsx)(SidebarContext_1.SidebarProvider, { children: (0, jsx_runtime_1.jsx)("div", { className: "App", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, { children: [(0, jsx_runtime_1.jsx)(Header_1.default, { user: currentUser }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Home_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/auth", element: (0, jsx_runtime_1.jsx)(Auth_1.default, { onVerify: handleVerifyCode }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/profile", element: (0, jsx_runtime_1.jsx)(PersonalCabinet_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/grades", element: (0, jsx_runtime_1.jsx)(Grades_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/reports", element: (0, jsx_runtime_1.jsx)(Reports_1.default, {}) })] }), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }) }) }));
}
exports.default = App;
