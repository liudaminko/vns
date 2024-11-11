"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSidebar = exports.SidebarProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var SidebarContext = (0, react_1.createContext)(undefined);
var SidebarProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(false), isSidebarOpen = _b[0], setIsSidebarOpen = _b[1];
    var toggleSidebar = function () { return setIsSidebarOpen(function (prev) { return !prev; }); };
    var closeSidebar = function () { return setIsSidebarOpen(false); };
    return ((0, jsx_runtime_1.jsx)(SidebarContext.Provider, { value: { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar, closeSidebar: closeSidebar }, children: children }));
};
exports.SidebarProvider = SidebarProvider;
var useSidebar = function () {
    var context = (0, react_1.useContext)(SidebarContext);
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};
exports.useSidebar = useSidebar;
