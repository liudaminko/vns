"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var recharts_1 = require("recharts");
var GradePrediction_module_css_1 = __importDefault(require("./GradePrediction.module.css"));
var studentMockData = [
    {
        studentName: "Student A",
        grades: [
            { subject: "Math", grade: 85, timeSpent: 120, date: "2023-01-15" },
            { subject: "Math", grade: 87, timeSpent: 130, date: "2023-02-10" },
            { subject: "Science", grade: 90, timeSpent: 110, date: "2023-03-05" },
        ],
    },
    // Additional students as needed
];
var GradePrediction = function () {
    var _a = (0, react_1.useState)(""), searchTerm = _a[0], setSearchTerm = _a[1];
    var _b = (0, react_1.useState)([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = (0, react_1.useState)(null), selectedStudent = _c[0], setSelectedStudent = _c[1];
    var _d = (0, react_1.useState)("All"), selectedCourse = _d[0], setSelectedCourse = _d[1];
    // Handle input change and filter suggestions
    var handleInputChange = function (event) {
        var term = event.target.value;
        setSearchTerm(term);
        if (term.length > 1) {
            setSuggestions(studentMockData.filter(function (student) {
                return student.studentName.toLowerCase().includes(term.toLowerCase());
            }));
        }
        else {
            setSuggestions([]);
        }
    };
    var handleStudentSelect = function (student) {
        setSelectedStudent(student);
        setSearchTerm(student.studentName);
        setSuggestions([]);
        setSelectedCourse("All"); // Reset course filter on new student selection
    };
    var handleCourseSelect = function (event) {
        setSelectedCourse(event.target.value);
    };
    var filteredGrades = selectedStudent
        ? selectedStudent.grades.filter(function (g) { return selectedCourse === "All" || g.subject === selectedCourse; })
        : [];
    var predictGrade = function () {
        if (!filteredGrades.length)
            return 0;
        var averageGrade = filteredGrades.reduce(function (sum, g) { return sum + g.grade; }, 0) /
            filteredGrades.length;
        return Math.round(averageGrade);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: GradePrediction_module_css_1.default.container, children: [(0, jsx_runtime_1.jsx)("h2", { children: "Grade Prediction" }), (0, jsx_runtime_1.jsxs)("div", { className: GradePrediction_module_css_1.default.searchContainer, children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Search by student name", value: searchTerm, onChange: handleInputChange, className: GradePrediction_module_css_1.default.searchInput }), suggestions.length > 0 && ((0, jsx_runtime_1.jsx)("ul", { className: GradePrediction_module_css_1.default.suggestions, children: suggestions.map(function (student, index) { return ((0, jsx_runtime_1.jsx)("li", { onClick: function () { return handleStudentSelect(student); }, className: GradePrediction_module_css_1.default.suggestionItem, children: student.studentName }, index)); }) }))] }), selectedStudent && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: GradePrediction_module_css_1.default.courseFilter, children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "courseSelect", children: "Filter by Course: " }), (0, jsx_runtime_1.jsxs)("select", { id: "courseSelect", value: selectedCourse, onChange: handleCourseSelect, className: GradePrediction_module_css_1.default.courseSelect, children: [(0, jsx_runtime_1.jsx)("option", { value: "All", children: "All Courses" }), Array.from(new Set(selectedStudent.grades.map(function (g) { return g.subject; }))).map(function (course, index) { return ((0, jsx_runtime_1.jsx)("option", { value: course, children: course }, index)); })] })] }), (0, jsx_runtime_1.jsxs)("h3", { children: ["Predicted Grade for ", selectedStudent.studentName, " in", " ", selectedCourse === "All" ? "all courses" : selectedCourse, ":", " ", predictGrade()] }), (0, jsx_runtime_1.jsxs)("div", { className: GradePrediction_module_css_1.default.chartsContainer, children: [(0, jsx_runtime_1.jsx)("h4", { children: "Grade Trend Over Time" }), (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: 300, children: (0, jsx_runtime_1.jsxs)(recharts_1.LineChart, { data: filteredGrades, children: [(0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }), (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: "date" }), (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}), (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}), (0, jsx_runtime_1.jsx)(recharts_1.Line, { type: "monotone", dataKey: "grade", stroke: "#8884d8", activeDot: { r: 8 } })] }) })] })] }))] }));
};
exports.default = GradePrediction;
