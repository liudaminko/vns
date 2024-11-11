"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var StudentTaskCompletion_module_css_1 = __importDefault(require("./StudentTaskCompletion.module.css"));
var ExportButton_1 = __importDefault(require("../../../components/ExportButton/ExportButton"));
var react_2 = __importDefault(require("react"));
var react_i18next_1 = require("react-i18next");
var TaskCompletionAnalysis = function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    var _a = (0, react_1.useState)("All"), selectedCourse = _a[0], setSelectedCourse = _a[1];
    var _b = (0, react_1.useState)("All"), selectedGroup = _b[0], setSelectedGroup = _b[1];
    var _c = (0, react_1.useState)(""), searchTerm = _c[0], setSearchTerm = _c[1];
    var _d = (0, react_1.useState)(null), expandedStudent = _d[0], setExpandedStudent = _d[1];
    var courses = ["Math", "Science", "History"];
    var groups = ["Group A", "Group B", "Group C"];
    var studentData = [
        {
            studentName: "Student A",
            course: "Math",
            group: "Group A",
            completedTasks: 8,
            totalTasks: 10,
            tasks: [
                { name: "Task 1", status: "Completed" },
                { name: "Task 2", status: "Completed" },
                { name: "Task 3", status: "Pending" },
                { name: "Task 4", status: "Completed" },
                { name: "Task 5", status: "Completed" },
                { name: "Task 6", status: "Pending" },
                { name: "Task 7", status: "Completed" },
                { name: "Task 8", status: "Completed" },
                { name: "Task 9", status: "Pending" },
                { name: "Task 10", status: "Completed" },
            ],
        },
        {
            studentName: "Student B",
            course: "Science",
            group: "Group B",
            completedTasks: 7,
            totalTasks: 10,
            tasks: [
                { name: "Task 1", status: "Completed" },
                { name: "Task 2", status: "Pending" },
                { name: "Task 3", status: "Completed" },
                { name: "Task 4", status: "Completed" },
                { name: "Task 5", status: "Pending" },
                { name: "Task 6", status: "Completed" },
                { name: "Task 7", status: "Pending" },
                { name: "Task 8", status: "Completed" },
                { name: "Task 9", status: "Completed" },
                { name: "Task 10", status: "Completed" },
            ],
        },
        {
            studentName: "Student C",
            course: "History",
            group: "Group C",
            completedTasks: 9,
            totalTasks: 10,
            tasks: [
                { name: "Task 1", status: "Completed" },
                { name: "Task 2", status: "Completed" },
                { name: "Task 3", status: "Completed" },
                { name: "Task 4", status: "Pending" },
                { name: "Task 5", status: "Completed" },
                { name: "Task 6", status: "Completed" },
                { name: "Task 7", status: "Completed" },
                { name: "Task 8", status: "Completed" },
                { name: "Task 9", status: "Completed" },
                { name: "Task 10", status: "Completed" },
            ],
        },
        {
            studentName: "Student D",
            course: "Math",
            group: "Group A",
            completedTasks: 5,
            totalTasks: 10,
            tasks: [
                { name: "Task 1", status: "Pending" },
                { name: "Task 2", status: "Pending" },
                { name: "Task 3", status: "Completed" },
                { name: "Task 4", status: "Completed" },
                { name: "Task 5", status: "Completed" },
                { name: "Task 6", status: "Pending" },
                { name: "Task 7", status: "Completed" },
                { name: "Task 8", status: "Pending" },
                { name: "Task 9", status: "Completed" },
                { name: "Task 10", status: "Pending" },
            ],
        },
        {
            studentName: "Student E",
            course: "Science",
            group: "Group B",
            completedTasks: 6,
            totalTasks: 10,
            tasks: [
                { name: "Task 1", status: "Completed" },
                { name: "Task 2", status: "Pending" },
                { name: "Task 3", status: "Completed" },
                { name: "Task 4", status: "Completed" },
                { name: "Task 5", status: "Completed" },
                { name: "Task 6", status: "Pending" },
                { name: "Task 7", status: "Pending" },
                { name: "Task 8", status: "Completed" },
                { name: "Task 9", status: "Completed" },
                { name: "Task 10", status: "Completed" },
            ],
        },
        {
            studentName: "Student F",
            course: "History",
            group: "Group C",
            completedTasks: 10,
            totalTasks: 10,
            tasks: [
                { name: "Task 1", status: "Completed" },
                { name: "Task 2", status: "Completed" },
                { name: "Task 3", status: "Completed" },
                { name: "Task 4", status: "Completed" },
                { name: "Task 5", status: "Completed" },
                { name: "Task 6", status: "Completed" },
                { name: "Task 7", status: "Completed" },
                { name: "Task 8", status: "Completed" },
                { name: "Task 9", status: "Completed" },
                { name: "Task 10", status: "Completed" },
            ],
        },
    ];
    var reportColumns = [
        t("student_name"),
        t("course"),
        t("group"),
        t("completed_tasks"),
        t("total_tasks"),
        t("completion_percentage"),
    ];
    var filteredData = studentData.filter(function (student) {
        var matchesCourse = selectedCourse === "All" || student.course === selectedCourse;
        var matchesGroup = selectedGroup === "All" || student.group === selectedGroup;
        var matchesSearch = student.studentName
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesCourse && matchesGroup && matchesSearch;
    });
    var formattedReportData = filteredData.map(function (student) { return ({
        studentName: student.studentName,
        course: student.course,
        group: student.group,
        completedTasks: student.completedTasks,
        totalTasks: student.totalTasks,
        completionPercentage: ((student.completedTasks / student.totalTasks) *
            100).toFixed(2),
    }); });
    var toggleExpandedStudent = function (studentName) {
        setExpandedStudent(function (prev) { return (prev === studentName ? null : studentName); });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: StudentTaskCompletion_module_css_1.default.container, children: [(0, jsx_runtime_1.jsx)("h2", { children: t("submitted_tasks") }), (0, jsx_runtime_1.jsxs)("div", { className: StudentTaskCompletion_module_css_1.default.filtersContainer, children: [(0, jsx_runtime_1.jsxs)("label", { htmlFor: "courseSelect", children: [t("select_course"), ": "] }), (0, jsx_runtime_1.jsxs)("select", { id: "courseSelect", value: selectedCourse, onChange: function (e) { return setSelectedCourse(e.target.value); }, className: StudentTaskCompletion_module_css_1.default.courseSelect, children: [(0, jsx_runtime_1.jsx)("option", { value: "All", children: t("all") }), courses.map(function (course, index) { return ((0, jsx_runtime_1.jsx)("option", { value: course, children: course }, index)); })] }), (0, jsx_runtime_1.jsxs)("label", { htmlFor: "groupSelect", children: [t("select_group"), ": "] }), (0, jsx_runtime_1.jsxs)("select", { id: "groupSelect", value: selectedGroup, onChange: function (e) { return setSelectedGroup(e.target.value); }, className: StudentTaskCompletion_module_css_1.default.groupSelect, children: [(0, jsx_runtime_1.jsx)("option", { value: "All", children: t("all") }), groups.map(function (group, index) { return ((0, jsx_runtime_1.jsx)("option", { value: group, children: group }, index)); })] }), (0, jsx_runtime_1.jsxs)("label", { htmlFor: "searchInput", children: [t("search_student"), ": "] }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "searchInput", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, placeholder: t("search_by_student_name"), className: StudentTaskCompletion_module_css_1.default.searchInput })] }), (0, jsx_runtime_1.jsx)("div", { className: StudentTaskCompletion_module_css_1.default.completionTableContainer, children: (0, jsx_runtime_1.jsxs)("table", { className: StudentTaskCompletion_module_css_1.default.completionTable, children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: t("student_name") }), (0, jsx_runtime_1.jsx)("th", { children: t("course") }), (0, jsx_runtime_1.jsx)("th", { children: t("group") }), (0, jsx_runtime_1.jsx)("th", { children: t("completed_tasks") }), (0, jsx_runtime_1.jsx)("th", { children: t("total_tasks") }), (0, jsx_runtime_1.jsx)("th", { children: t("completion_percentage") }), (0, jsx_runtime_1.jsx)("th", {})] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: filteredData.map(function (student, index) { return ((0, jsx_runtime_1.jsxs)(react_2.default.Fragment, { children: [(0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: student.studentName }), (0, jsx_runtime_1.jsx)("td", { children: student.course }), (0, jsx_runtime_1.jsx)("td", { children: student.group }), (0, jsx_runtime_1.jsx)("td", { children: student.completedTasks }), (0, jsx_runtime_1.jsx)("td", { children: student.totalTasks }), (0, jsx_runtime_1.jsxs)("td", { children: [((student.completedTasks / student.totalTasks) *
                                                        100).toFixed(2), "%"] }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("div", { onClick: function () { return toggleExpandedStudent(student.studentName); }, className: StudentTaskCompletion_module_css_1.default.expandButton, children: (0, jsx_runtime_1.jsx)("img", { src: expandedStudent === student.studentName
                                                            ? "/up.png"
                                                            : "/down.png", height: "12px" }) }) })] }), expandedStudent === student.studentName && ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: 7, children: (0, jsx_runtime_1.jsx)("div", { className: StudentTaskCompletion_module_css_1.default.taskDetailsContainer, children: (0, jsx_runtime_1.jsxs)("table", { className: StudentTaskCompletion_module_css_1.default.taskDetailsTable, children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: t("task_name") }), (0, jsx_runtime_1.jsx)("th", { children: t("status") })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: student.tasks.map(function (task, taskIndex) { return ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: task.name }), (0, jsx_runtime_1.jsx)("td", { children: t(task.status.toLowerCase()) })] }, taskIndex)); }) })] }) }) }) }))] }, index)); }) })] }) }), (0, jsx_runtime_1.jsx)("div", { className: StudentTaskCompletion_module_css_1.default.exportButtonContainer, children: (0, jsx_runtime_1.jsx)(ExportButton_1.default, { data: formattedReportData, columns: reportColumns, fileName: "Student_Task_Completion_Report" }) })] }));
};
exports.default = TaskCompletionAnalysis;
