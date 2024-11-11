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
require("rc-slider/assets/index.css");
var UserGrades_module_css_1 = __importDefault(require("./UserGrades.module.css"));
var Filtering_1 = __importDefault(require("../../../components/Filtering/Filtering"));
var Sorting_1 = __importDefault(require("../../../components/Sorting/Sorting"));
var ExportButton_1 = __importDefault(require("../../../components/ExportButton/ExportButton"));
var react_i18next_1 = require("react-i18next");
var UserGrades = function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    var _a = (0, react_1.useState)([
        {
            studentName: "Student A",
            course: "Math",
            grade: 85,
            year: 2023,
            group: "Group A",
        },
        {
            studentName: "Student B",
            course: "Science",
            grade: 78,
            year: 2023,
            group: "Group B",
        },
        {
            studentName: "Student C",
            course: "History",
            grade: 92,
            year: 2024,
            group: "Group C",
        },
        {
            studentName: "Student D",
            course: "Math",
            grade: 67,
            year: 2022,
            group: "Group A",
        },
        {
            studentName: "Student E",
            course: "Science",
            grade: 88,
            year: 2021,
            group: "Group B",
        },
        {
            studentName: "Student F",
            course: "History",
            grade: 73,
            year: 2023,
            group: "Group C",
        },
    ]), grades = _a[0], setGrades = _a[1];
    var _b = (0, react_1.useState)([]), filters = _b[0], setFilters = _b[1];
    var _c = (0, react_1.useState)(null), sorting = _c[0], setSorting = _c[1];
    var _d = (0, react_1.useState)([0, 100]), gradeRange = _d[0], setGradeRange = _d[1];
    var handleGradeRangeChange = function (range) {
        setGradeRange(range);
    };
    var filteredGrades = grades.filter(function (entry) {
        var matchesFilters = filters.every(function (filter) {
            if (filter.type === "Course")
                return entry.course === filter.value;
            if (filter.type === "Year")
                return entry.year.toString() === filter.value;
            if (filter.type === "Group")
                return entry.group === filter.value;
            if (filter.type === "Mark") {
                var gradeLetter = entry.grade >= 90
                    ? "A"
                    : entry.grade >= 80
                        ? "B"
                        : entry.grade >= 70
                            ? "C"
                            : "D";
                return gradeLetter === filter.value;
            }
            return true;
        });
        var withinGradeRange = entry.grade >= gradeRange[0] && entry.grade <= gradeRange[1];
        return matchesFilters && withinGradeRange;
    });
    var sortedGrades = __spreadArray([], filteredGrades, true).sort(function (a, b) {
        if (!sorting)
            return 0;
        switch (sorting) {
            case "Year (Ascending)":
                return a.year - b.year;
            case "Year (Descending)":
                return b.year - a.year;
            case "Course (A-Z)":
                return a.course.localeCompare(b.course);
            case "Course (Z-A)":
                return b.course.localeCompare(a.course);
            case "Grade (Highest to Lowest)":
                return b.grade - a.grade;
            case "Grade (Lowest to Highest)":
                return a.grade - b.grade;
            default:
                return 0;
        }
    });
    var columns = [
        t("student_name"),
        t("course"),
        t("group"),
        t("grade"),
        t("year"),
    ];
    var exportData = sortedGrades.map(function (entry) {
        var _a;
        return (_a = {},
            _a[t("student_name")] = entry.studentName,
            _a[t("course")] = entry.course,
            _a[t("group")] = entry.group,
            _a[t("grade")] = entry.grade,
            _a[t("year")] = entry.year,
            _a);
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: UserGrades_module_css_1.default.container, children: [(0, jsx_runtime_1.jsx)("h2", { children: t("students_grades") }), (0, jsx_runtime_1.jsxs)("div", { className: UserGrades_module_css_1.default.controlsContainer, children: [(0, jsx_runtime_1.jsx)("div", { className: UserGrades_module_css_1.default.filterContainer, children: (0, jsx_runtime_1.jsx)(Filtering_1.default, { setFilters: setFilters, setGradeRange: setGradeRange, gradeRange: gradeRange }) }), (0, jsx_runtime_1.jsx)("div", { className: UserGrades_module_css_1.default.sortContainer, children: (0, jsx_runtime_1.jsx)(Sorting_1.default, { setSorting: setSorting }) })] }), (0, jsx_runtime_1.jsx)("div", { className: UserGrades_module_css_1.default.selectedFilters, children: filters.map(function (filter, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: UserGrades_module_css_1.default.filterTag, children: [t(filter.type), ": ", filter.value, (0, jsx_runtime_1.jsx)("img", { src: "/close.png", height: "8px", className: UserGrades_module_css_1.default.removeIcon, onClick: function () {
                                var updatedFilters = filters.filter(function (_, i) { return i !== index; });
                                setFilters(updatedFilters);
                            } })] }, index)); }) }), (0, jsx_runtime_1.jsxs)("table", { className: UserGrades_module_css_1.default.gradesTable, children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: t("student_name") }), (0, jsx_runtime_1.jsx)("th", { children: t("course") }), (0, jsx_runtime_1.jsx)("th", { children: t("group") }), (0, jsx_runtime_1.jsx)("th", { children: t("grade") }), (0, jsx_runtime_1.jsx)("th", { children: t("year") })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: sortedGrades.map(function (entry, index) { return ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: entry.studentName }), (0, jsx_runtime_1.jsx)("td", { children: entry.course }), (0, jsx_runtime_1.jsx)("td", { children: entry.group }), (0, jsx_runtime_1.jsx)("td", { children: entry.grade }), (0, jsx_runtime_1.jsx)("td", { children: entry.year })] }, index)); }) })] }), (0, jsx_runtime_1.jsx)("div", { className: UserGrades_module_css_1.default.exportButtonContainer, children: (0, jsx_runtime_1.jsx)(ExportButton_1.default, { data: exportData, columns: columns, fileName: "User_Grades_Report" }) })] }));
};
exports.default = UserGrades;
