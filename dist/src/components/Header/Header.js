"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Header_module_css_1 = __importDefault(require("./Header.module.css"));
var react_i18next_1 = require("react-i18next");
var SidebarContext_1 = require("../../SidebarContext");
var Header = function (_a) {
    var user = _a.user;
    var _b = (0, react_i18next_1.useTranslation)(), t = _b.t, i18n = _b.i18n;
    var toggleSidebar = (0, SidebarContext_1.useSidebar)().toggleSidebar;
    var _c = (0, react_1.useState)(false), dropdownVisible = _c[0], setDropdownVisible = _c[1];
    var _d = (0, react_1.useState)(false), languageDropdownVisible = _d[0], setLanguageDropdownVisible = _d[1];
    var toggleDropdown = function () { return setDropdownVisible(!dropdownVisible); };
    var toggleLanguageDropdown = function () {
        return setLanguageDropdownVisible(!languageDropdownVisible);
    };
    var changeLanguage = function (lng) {
        i18n.changeLanguage(lng);
        setLanguageDropdownVisible(false);
    };
    var dropdownItems = (function () {
        switch (user.role) {
            case "student":
                return [
                    { label: t("user_profile"), path: "/profile" },
                    { label: t("my_courses"), path: "/courses" },
                    { label: t("grades"), path: "/grades" },
                    { label: t("logout"), path: "/logout" },
                ];
            case "editor":
                return [
                    { label: t("user_profile"), path: "/profile" },
                    { label: t("edit_course"), path: "/edit-courses" },
                    { label: t("reports"), path: "/reports" },
                    { label: t("logout"), path: "/logout" },
                ];
            case "admin":
                return [
                    { label: t("user_profile"), path: "/profile" },
                    { label: t("user_management"), path: "/user-management" },
                    { label: t("settings"), path: "/settings" },
                    { label: t("logout"), path: "/logout" },
                ];
            default:
                return [];
        }
    })();
    var getInitials = function (name) {
        var _a = name.split(" "), firstName = _a[0], lastName = _a[1];
        return (firstName[0] + (lastName ? lastName[0] : "")).toUpperCase();
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: Header_module_css_1.default.container, children: [(0, jsx_runtime_1.jsxs)("div", { className: Header_module_css_1.default.headerLeft, children: [(0, jsx_runtime_1.jsx)("button", { className: Header_module_css_1.default.burgerButton, onClick: toggleSidebar, children: "\u2630" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", className: Header_module_css_1.default.logoLink, children: (0, jsx_runtime_1.jsx)("img", { src: "/logo.png", className: Header_module_css_1.default.logo, alt: "logo" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: Header_module_css_1.default.headerRight, children: [(0, jsx_runtime_1.jsxs)("div", { className: Header_module_css_1.default.languageSwitcher, children: [(0, jsx_runtime_1.jsx)("button", { onClick: toggleLanguageDropdown, className: Header_module_css_1.default.languageButton, children: i18n.language.toUpperCase() }), languageDropdownVisible && ((0, jsx_runtime_1.jsxs)("div", { className: Header_module_css_1.default.languageDropdown, children: [(0, jsx_runtime_1.jsxs)("button", { onClick: function () { return changeLanguage("en"); }, className: Header_module_css_1.default.language, children: [(0, jsx_runtime_1.jsx)("img", { src: "/flags/en.png", alt: "English", className: Header_module_css_1.default.flagIcon }), "English"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: function () { return changeLanguage("uk"); }, className: Header_module_css_1.default.language, children: [(0, jsx_runtime_1.jsx)("img", { src: "/flags/uk.png", alt: "Ukrainian", className: Header_module_css_1.default.flagIcon }), "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: function () { return changeLanguage("ger"); }, className: Header_module_css_1.default.language, children: [(0, jsx_runtime_1.jsx)("img", { src: "/flags/ger.png", alt: "German", className: Header_module_css_1.default.flagIcon }), "Deutsch"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: function () { return changeLanguage("es"); }, className: Header_module_css_1.default.language, children: [(0, jsx_runtime_1.jsx)("img", { src: "/flags/es.png", alt: "Spanish", className: Header_module_css_1.default.flagIcon }), "Espa\u00F1ol"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: function () { return changeLanguage("jp"); }, className: Header_module_css_1.default.language, children: [(0, jsx_runtime_1.jsx)("img", { src: "/flags/jp.png", alt: "Japanese", className: Header_module_css_1.default.flagIcon }), "\u65E5\u672C\u8A9E"] })] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: Header_module_css_1.default.userCompound, children: [(0, jsx_runtime_1.jsxs)("button", { className: Header_module_css_1.default.userButton, onClick: toggleDropdown, children: [(0, jsx_runtime_1.jsx)("span", { className: Header_module_css_1.default.userName, children: user.name }), user.profilePic ? ((0, jsx_runtime_1.jsx)("img", { src: user.profilePic, alt: "Profile", className: Header_module_css_1.default.profilePic })) : ((0, jsx_runtime_1.jsx)("div", { className: Header_module_css_1.default.initials, children: getInitials(user.name) })), (0, jsx_runtime_1.jsx)("img", { src: dropdownVisible ? "/up.png" : "/down.png", alt: dropdownVisible ? "Collapse" : "Expand", className: Header_module_css_1.default.arrowIcon })] }), dropdownVisible && ((0, jsx_runtime_1.jsx)("div", { className: Header_module_css_1.default.dropdownMenu, onClick: toggleDropdown, children: dropdownItems.map(function (item, index) { return ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: item.path, className: Header_module_css_1.default.dropdownItem, children: item.label }, index)); }) }))] })] })] }));
};
exports.default = Header;
