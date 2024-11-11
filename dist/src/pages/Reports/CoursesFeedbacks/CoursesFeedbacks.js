"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_datepicker_1 = __importDefault(require("react-datepicker"));
require("react-datepicker/dist/react-datepicker.css");
var react_i18next_1 = require("react-i18next");
var CoursesFeedbacks_module_css_1 = __importDefault(require("./CoursesFeedbacks.module.css"));
var ExportButton_1 = __importDefault(require("../../../components/ExportButton/ExportButton"));
var CoursesFeedbacks = function () {
    var _a = (0, react_1.useState)("All"), selectedCourse = _a[0], setSelectedCourse = _a[1];
    var _b = (0, react_1.useState)(null), startDate = _b[0], setStartDate = _b[1];
    var _c = (0, react_1.useState)(null), endDate = _c[0], setEndDate = _c[1];
    var _d = (0, react_1.useState)(null), expandedRow = _d[0], setExpandedRow = _d[1]; // Track expanded row
    var t = (0, react_i18next_1.useTranslation)().t;
    var feedbackData = [
        {
            studentName: "Student A",
            course: "Math",
            date: new Date("2023-03-15"),
            rating: 5,
            comment: t("kgjhwrg gwreoighrg wrgowrgtuhwerotuihwernt wretgouwrthwrkjbg efb jronoreu nojfwoju oeuurroj3eoj"),
        },
        {
            studentName: "Student B",
            course: "Science",
            date: new Date("2022-11-10"),
            rating: 4,
            comment: t("course_feedback.comment_good"),
        },
        {
            studentName: "Student C",
            course: "History",
            date: new Date("2023-01-25"),
            rating: 3,
            comment: t("course_feedback.comment_okay"),
        },
        {
            studentName: "Student D",
            course: "Math",
            date: new Date("2022-12-05"),
            rating: 4,
            comment: t("course_feedback.comment_informative"),
        },
    ];
    var courses = ["All", "Math", "Science", "History"];
    var filteredData = feedbackData.filter(function (feedback) {
        var matchesCourse = selectedCourse === "All" || feedback.course === selectedCourse;
        var matchesDateRange = (!startDate || feedback.date >= startDate) &&
            (!endDate || feedback.date <= endDate);
        return matchesCourse && matchesDateRange;
    });
    var handleRowClick = function (index) {
        setExpandedRow(expandedRow === index ? null : index); // Toggle expanded state
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: CoursesFeedbacks_module_css_1.default.container, children: [(0, jsx_runtime_1.jsx)("h2", { children: t("course_comments") }), (0, jsx_runtime_1.jsxs)("div", { className: CoursesFeedbacks_module_css_1.default.filtersContainer, children: [(0, jsx_runtime_1.jsxs)("label", { htmlFor: "courseSelect", children: [t("select_course"), ": "] }), (0, jsx_runtime_1.jsx)("select", { id: "courseSelect", value: selectedCourse, onChange: function (e) { return setSelectedCourse(e.target.value); }, className: CoursesFeedbacks_module_css_1.default.filterSelect, children: courses.map(function (course, index) { return ((0, jsx_runtime_1.jsx)("option", { value: course, children: course === "All" ? t("all_courses") : course }, index)); }) }), (0, jsx_runtime_1.jsxs)("label", { htmlFor: "startDate", children: [t("start_date"), ": "] }), (0, jsx_runtime_1.jsx)(react_datepicker_1.default, { selected: startDate, onChange: function (date) { return setStartDate(date); }, dateFormat: "yyyy-MM-dd", className: CoursesFeedbacks_module_css_1.default.datePicker, placeholderText: t("select_start_date") }), (0, jsx_runtime_1.jsxs)("label", { htmlFor: "endDate", children: [t("end_date"), ": "] }), (0, jsx_runtime_1.jsx)(react_datepicker_1.default, { selected: endDate, onChange: function (date) { return setEndDate(date); }, dateFormat: "yyyy-MM-dd", className: CoursesFeedbacks_module_css_1.default.datePicker, placeholderText: t("select_end_date") })] }), (0, jsx_runtime_1.jsx)("div", { className: CoursesFeedbacks_module_css_1.default.tableContainer, children: (0, jsx_runtime_1.jsxs)("table", { className: CoursesFeedbacks_module_css_1.default.feedbackTable, children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: t("student_name") }), (0, jsx_runtime_1.jsx)("th", { children: t("course") }), (0, jsx_runtime_1.jsx)("th", { children: t("date") }), (0, jsx_runtime_1.jsx)("th", { children: t("rating") }), (0, jsx_runtime_1.jsx)("th", { children: t("comment") })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: filteredData.map(function (feedback, index) { return ((0, jsx_runtime_1.jsxs)("tr", { onClick: function () { return handleRowClick(index); }, className: expandedRow === index ? CoursesFeedbacks_module_css_1.default.expandedRow : "", children: [(0, jsx_runtime_1.jsx)("td", { children: feedback.studentName }), (0, jsx_runtime_1.jsx)("td", { children: feedback.course }), (0, jsx_runtime_1.jsx)("td", { children: feedback.date.toLocaleDateString() }), (0, jsx_runtime_1.jsxs)("td", { children: [feedback.rating, " / 5"] }), (0, jsx_runtime_1.jsx)("td", { className: CoursesFeedbacks_module_css_1.default.commentCell, children: expandedRow === index
                                            ? feedback.comment
                                            : feedback.comment.slice(0, 30) + "..." })] }, index)); }) })] }) }), (0, jsx_runtime_1.jsx)("div", { className: CoursesFeedbacks_module_css_1.default.exportButtonContainer, children: (0, jsx_runtime_1.jsx)(ExportButton_1.default, { data: filteredData, columns: ["student_name", "course", "date", "rating", "comment"], fileName: "Courses_Feedback_Report" }) })] }));
};
exports.default = CoursesFeedbacks;
