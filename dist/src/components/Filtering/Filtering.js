"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var rc_slider_1 = __importDefault(require("rc-slider"));
require("rc-slider/assets/index.css");
var Filtering_module_css_1 = __importDefault(require("./Filtering.module.css"));
var react_i18next_1 = require("react-i18next");
var availableFilters = {
    Year: ["2024", "2023", "2022"],
    Course: ["Math", "Science", "History"],
    Group: ["Group A", "Group B", "Group C"],
    Student: ["Student A", "Student B", "Student C"],
};
var Filtering = function (_a) {
    var setFilters = _a.setFilters, setGradeRange = _a.setGradeRange, gradeRange = _a.gradeRange;
    var _b = (0, react_1.useState)([]), selectedFilters = _b[0], setSelectedFilters = _b[1];
    var _c = (0, react_1.useState)(false), isDropdownOpen = _c[0], setIsDropdownOpen = _c[1];
    var t = (0, react_i18next_1.useTranslation)().t;
    var handleToggleDropdown = function () {
        setIsDropdownOpen(function (prev) { return !prev; });
    };
    var handleOptionClick = function (type, value) {
        var existingIndex = selectedFilters.findIndex(function (filter) { return filter.type === type && filter.value === value; });
        if (existingIndex > -1) {
            var updatedFilters = selectedFilters.filter(function (_, index) { return index !== existingIndex; });
            setSelectedFilters(updatedFilters);
            setFilters(updatedFilters);
        }
        else {
            var newFilter_1 = { type: type, value: value };
            setSelectedFilters(function (prev) { return __spreadArray(__spreadArray([], prev, true), [newFilter_1], false); });
            setFilters(__spreadArray(__spreadArray([], selectedFilters, true), [newFilter_1], false));
        }
    };
    var isSelected = function (type, value) {
        return selectedFilters.some(function (filter) { return filter.type === type && filter.value === value; });
    };
    var handleGradeRangeChange = function (range) {
        if (Array.isArray(range)) {
            setGradeRange([range[0], range[1]]);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: Filtering_module_css_1.default.filterContainer, children: [(0, jsx_runtime_1.jsxs)("button", { className: Filtering_module_css_1.default.filterButton, onClick: handleToggleDropdown, children: [t("filter"), (0, jsx_runtime_1.jsx)("img", { src: "/filter.png", height: "16px", alt: "Filter" })] }), isDropdownOpen && ((0, jsx_runtime_1.jsxs)("div", { className: Filtering_module_css_1.default.dropdown, children: [Object.keys(availableFilters).map(function (category, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: Filtering_module_css_1.default.filterCategory, children: [(0, jsx_runtime_1.jsx)("h4", { children: t(category.toLowerCase()) }), (0, jsx_runtime_1.jsx)("div", { className: Filtering_module_css_1.default.optionsContainer, children: availableFilters[category].map(function (option, idx) { return ((0, jsx_runtime_1.jsx)("div", { className: "".concat(Filtering_module_css_1.default.option, " ").concat(isSelected(category, option) ? Filtering_module_css_1.default.selected : ""), onClick: function () { return handleOptionClick(category, option); }, children: option }, idx)); }) })] }, index)); }), (0, jsx_runtime_1.jsxs)("div", { className: Filtering_module_css_1.default.filterCategory, children: [(0, jsx_runtime_1.jsx)("h4", { children: t("grade_range") }), (0, jsx_runtime_1.jsxs)("div", { className: Filtering_module_css_1.default.sliderContainer, children: [(0, jsx_runtime_1.jsx)(rc_slider_1.default, { range: true, min: 0, max: 100, value: gradeRange, onChange: handleGradeRangeChange, allowCross: false }), (0, jsx_runtime_1.jsxs)("div", { className: Filtering_module_css_1.default.rangeValues, children: [(0, jsx_runtime_1.jsx)("span", { children: gradeRange[0] }), " - ", (0, jsx_runtime_1.jsx)("span", { children: gradeRange[1] })] })] })] })] }))] }));
};
exports.default = Filtering;
