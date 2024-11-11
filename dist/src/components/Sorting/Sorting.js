"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Sorting_module_css_1 = __importDefault(require("./Sorting.module.css"));
var react_i18next_1 = require("react-i18next");
var sortingOptions = [
    "Year (Ascending)",
    "Year (Descending)",
    "Course (A-Z)",
    "Course (Z-A)",
    "Grade (Highest to Lowest)",
    "Grade (Lowest to Highest)",
];
var Sorting = function (_a) {
    var setSorting = _a.setSorting;
    var _b = (0, react_1.useState)(false), isDropdownOpen = _b[0], setIsDropdownOpen = _b[1];
    var _c = (0, react_1.useState)(null), selectedSorting = _c[0], setSelectedSorting = _c[1];
    var t = (0, react_i18next_1.useTranslation)().t;
    var handleToggleDropdown = function () {
        setIsDropdownOpen(function (prev) { return !prev; });
    };
    var handleOptionClick = function (option) {
        setSelectedSorting(option);
        setSorting(option);
        setIsDropdownOpen(false); // Close dropdown after selection
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: Sorting_module_css_1.default.sortingContainer, children: [(0, jsx_runtime_1.jsxs)("button", { className: Sorting_module_css_1.default.sortingButton, onClick: handleToggleDropdown, children: [t("sort"), (0, jsx_runtime_1.jsx)("img", { src: "/sort.png", height: "16px", alt: "Sort" })] }), isDropdownOpen && ((0, jsx_runtime_1.jsx)("div", { className: Sorting_module_css_1.default.dropdown, children: sortingOptions.map(function (option, index) { return ((0, jsx_runtime_1.jsx)("div", { className: "".concat(Sorting_module_css_1.default.option, " ").concat(selectedSorting === option ? Sorting_module_css_1.default.selected : ""), onClick: function () { return handleOptionClick(option); }, children: t("sort_".concat(option.replace(/\s+/g, "_").toLowerCase())) }, index)); }) })), selectedSorting && ((0, jsx_runtime_1.jsx)("div", { className: Sorting_module_css_1.default.selectedSorting, children: (0, jsx_runtime_1.jsxs)("h4", { children: [t("current_sorting"), ":", " ", t("sort_".concat(selectedSorting.replace(/\s+/g, "_").toLowerCase()))] }) }))] }));
};
exports.default = Sorting;
