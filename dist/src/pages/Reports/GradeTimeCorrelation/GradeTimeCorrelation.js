"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_datepicker_1 = __importDefault(require("react-datepicker"));
require("react-datepicker/dist/react-datepicker.css");
var chart_js_1 = require("chart.js");
var react_chartjs_2_1 = require("react-chartjs-2");
var ExportButton_1 = __importDefault(require("../../../components/ExportButton/ExportButton"));
var GradeTimeCorrelation_module_css_1 = __importDefault(require("./GradeTimeCorrelation.module.css"));
chart_js_1.Chart.register(chart_js_1.ScatterController, chart_js_1.LinearScale, chart_js_1.PointElement, chart_js_1.Tooltip, chart_js_1.Legend);
var GradeTimeCorrelation = function () {
    var _a = (0, react_1.useState)("All"), selectedCourse = _a[0], setSelectedCourse = _a[1];
    var _b = (0, react_1.useState)(""), selectedStudent = _b[0], setSelectedStudent = _b[1];
    var _c = (0, react_1.useState)(undefined), startDate = _c[0], setStartDate = _c[1];
    var _d = (0, react_1.useState)(undefined), endDate = _d[0], setEndDate = _d[1];
    var data = [
        {
            studentName: "Student A",
            course: "Math",
            grade: 85,
            timeSpent: 5,
            date: new Date("2023-09-15"),
        },
        {
            studentName: "Student B",
            course: "Science",
            grade: 78,
            timeSpent: 7,
            date: new Date("2023-09-20"),
        },
        // Add more data points as needed
    ];
    var filteredData = data.filter(function (d) {
        var matchesCourse = selectedCourse === "All" || d.course === selectedCourse;
        var matchesStudent = !selectedStudent || d.studentName.includes(selectedStudent);
        var matchesDate = (!startDate || d.date >= startDate) && (!endDate || d.date <= endDate);
        return matchesCourse && matchesStudent && matchesDate;
    });
    console.log("Filtered Data:", filteredData); // Debugging line
    var chartData = {
        datasets: [
            {
                label: "Time vs Grade",
                data: filteredData.map(function (d) { return ({ x: d.timeSpent, y: d.grade }); }),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };
    // Calculations for Average Grade, Average Time, and Correlation Coefficient
    var calculateAverage = function (values) {
        return values.reduce(function (sum, value) { return sum + value; }, 0) / values.length;
    };
    var averageGrade = filteredData.length > 0
        ? calculateAverage(filteredData.map(function (d) { return d.grade; }))
        : 0;
    var averageTimeSpent = filteredData.length > 0
        ? calculateAverage(filteredData.map(function (d) { return d.timeSpent; }))
        : 0;
    var calculateCorrelation = function (data) {
        if (data.length < 2)
            return 0; // Not enough data to calculate correlation
        var grades = data.map(function (d) { return d.grade; });
        var times = data.map(function (d) { return d.timeSpent; });
        var avgGrade = calculateAverage(grades);
        var avgTime = calculateAverage(times);
        var numerator = data.reduce(function (sum, d) { return sum + (d.grade - avgGrade) * (d.timeSpent - avgTime); }, 0);
        var gradeDiffSquared = data.reduce(function (sum, d) { return sum + Math.pow(d.grade - avgGrade, 2); }, 0);
        var timeDiffSquared = data.reduce(function (sum, d) { return sum + Math.pow(d.timeSpent - avgTime, 2); }, 0);
        return gradeDiffSquared && timeDiffSquared
            ? numerator / Math.sqrt(gradeDiffSquared * timeDiffSquared)
            : 0;
    };
    var correlationCoefficient = calculateCorrelation(filteredData);
    var columns = ["Student Name", "Course", "Grade", "Time Spent", "Date"];
    return ((0, jsx_runtime_1.jsxs)("div", { className: GradeTimeCorrelation_module_css_1.default.container, children: [(0, jsx_runtime_1.jsx)("h2", { children: "Grade to Time Correlation" }), (0, jsx_runtime_1.jsxs)("div", { className: GradeTimeCorrelation_module_css_1.default.filters, children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Search by student name", value: selectedStudent, onChange: function (e) { return setSelectedStudent(e.target.value); } }), (0, jsx_runtime_1.jsxs)("select", { value: selectedCourse, onChange: function (e) { return setSelectedCourse(e.target.value); }, children: [(0, jsx_runtime_1.jsx)("option", { value: "All", children: "All Courses" }), (0, jsx_runtime_1.jsx)("option", { value: "Math", children: "Math" }), (0, jsx_runtime_1.jsx)("option", { value: "Science", children: "Science" })] }), (0, jsx_runtime_1.jsx)(react_datepicker_1.default, { selected: startDate, onChange: function (date) { return setStartDate(date || undefined); }, selectsStart: true, startDate: startDate, endDate: endDate, placeholderText: "Start Date" }), (0, jsx_runtime_1.jsx)(react_datepicker_1.default, { selected: endDate, onChange: function (date) { return setEndDate(date || undefined); }, selectsEnd: true, startDate: startDate, endDate: endDate, minDate: startDate, placeholderText: "End Date" })] }), (0, jsx_runtime_1.jsx)("div", { className: GradeTimeCorrelation_module_css_1.default.chartContainer, children: (0, jsx_runtime_1.jsx)(react_chartjs_2_1.Scatter, { data: chartData, options: { maintainAspectRatio: false } }) }), (0, jsx_runtime_1.jsxs)("div", { className: GradeTimeCorrelation_module_css_1.default.stats, children: [(0, jsx_runtime_1.jsxs)("p", { children: ["Average Grade: ", averageGrade.toFixed(2)] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Average Time Spent: ", averageTimeSpent.toFixed(2), " hours"] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Correlation Coefficient: ", correlationCoefficient.toFixed(2)] })] }), (0, jsx_runtime_1.jsx)(ExportButton_1.default, { data: filteredData, columns: columns, fileName: "Grade_Time_Correlation" })] }));
};
exports.default = GradeTimeCorrelation;
