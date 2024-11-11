"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var AttemptsCountSuccessRate_module_css_1 = __importDefault(require("./AttemptsCountSuccessRate.module.css"));
var ExportButton_1 = __importDefault(require("../../../components/ExportButton/ExportButton"));
var AttemptsCountSuccessRate = function () {
    var _a = (0, react_1.useState)("All"), selectedTest = _a[0], setSelectedTest = _a[1];
    var _b = (0, react_1.useState)(""), searchTerm = _b[0], setSearchTerm = _b[1];
    var testNames = ["Math Test", "Science Quiz", "History Exam"];
    var attemptData = [
        {
            studentName: "Student A",
            testName: "Math Test",
            attempts: 3,
            grades: [80, 85, 90],
        },
        {
            studentName: "Student B",
            testName: "Science Quiz",
            attempts: 2,
            grades: [75, 80],
        },
        {
            studentName: "Student C",
            testName: "History Exam",
            attempts: 1,
            grades: [88],
        },
        {
            studentName: "Student D",
            testName: "Math Test",
            attempts: 4,
            grades: [60, 70, 75, 85],
        },
    ];
    var filteredData = attemptData.filter(function (data) {
        var matchesTest = selectedTest === "All" || data.testName === selectedTest;
        var matchesSearch = data.studentName
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesTest && matchesSearch;
    });
    var exportData = filteredData.map(function (data) { return ({
        studentName: data.studentName,
        testName: data.testName,
        attempts: data.attempts,
        grades: data.grades.join(", "),
        averageGrade: (data.grades.reduce(function (a, b) { return a + b; }, 0) / data.grades.length).toFixed(2),
    }); });
    var columns = [
        "Student Name",
        "Test Name",
        "Attempts",
        "Grades",
        "Average Grade",
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { className: AttemptsCountSuccessRate_module_css_1.default.container, children: [(0, jsx_runtime_1.jsx)("h2", { children: "Attempts Count and Success Rate" }), (0, jsx_runtime_1.jsxs)("div", { className: AttemptsCountSuccessRate_module_css_1.default.filtersContainer, children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "testSelect", children: "Select Test: " }), (0, jsx_runtime_1.jsxs)("select", { id: "testSelect", value: selectedTest, onChange: function (e) { return setSelectedTest(e.target.value); }, className: AttemptsCountSuccessRate_module_css_1.default.filterSelect, children: [(0, jsx_runtime_1.jsx)("option", { value: "All", children: "All" }), testNames.map(function (test, index) { return ((0, jsx_runtime_1.jsx)("option", { value: test, children: test }, index)); })] }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "searchInput", children: "Search Student: " }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "searchInput", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, placeholder: "Search by student name", className: AttemptsCountSuccessRate_module_css_1.default.searchInput })] }), (0, jsx_runtime_1.jsxs)("table", { className: AttemptsCountSuccessRate_module_css_1.default.attemptsTable, children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Student Name" }), (0, jsx_runtime_1.jsx)("th", { children: "Test Name" }), (0, jsx_runtime_1.jsx)("th", { children: "Attempts" }), (0, jsx_runtime_1.jsx)("th", { children: "Grades" }), (0, jsx_runtime_1.jsx)("th", { children: "Average Grade" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: filteredData.map(function (data, index) { return ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: data.studentName }), (0, jsx_runtime_1.jsx)("td", { children: data.testName }), (0, jsx_runtime_1.jsx)("td", { children: data.attempts }), (0, jsx_runtime_1.jsx)("td", { children: data.grades.join(", ") }), (0, jsx_runtime_1.jsx)("td", { children: (data.grades.reduce(function (a, b) { return a + b; }, 0) / data.grades.length).toFixed(2) })] }, index)); }) })] }), (0, jsx_runtime_1.jsx)("div", { className: AttemptsCountSuccessRate_module_css_1.default.exportButtonContainer, children: (0, jsx_runtime_1.jsx)(ExportButton_1.default, { data: exportData, columns: columns, fileName: "Attempts_Success_Rate_Report" }) })] }));
};
exports.default = AttemptsCountSuccessRate;
