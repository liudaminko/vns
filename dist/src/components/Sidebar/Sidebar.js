"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
// Sidebar.tsx
var react_i18next_1 = require("react-i18next");
var Sidebar_module_css_1 = __importDefault(require("./Sidebar.module.css"));
var Sidebar = function (_a) {
    var setSelectedReport = _a.setSelectedReport, isOpen = _a.isOpen, onClose = _a.onClose;
    var t = (0, react_i18next_1.useTranslation)().t;
    var reports = [
        { label: t("students_grades"), value: "UserGrades" },
        { label: t("grades_prediction"), value: "GradePrediction" },
        { label: t("grade_to_time_correlation"), value: "GradeTimeCorrelation" },
        { label: t("submitted_tasks"), value: "TaskCompletion" },
        { label: t("course_comments"), value: "StudentFeedback" },
        { label: t("attempts_count_success_rate"), value: "AttemptsSuccess" },
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { className: "".concat(Sidebar_module_css_1.default.sidebar, " ").concat(isOpen ? Sidebar_module_css_1.default.open : ""), children: [(0, jsx_runtime_1.jsx)("button", { className: Sidebar_module_css_1.default.closeButton, onClick: onClose, children: "\u2715" }), reports.map(function (report) { return ((0, jsx_runtime_1.jsx)("button", { onClick: function () {
                    setSelectedReport(report.value);
                    onClose(); // Close sidebar after selection on mobile
                }, className: Sidebar_module_css_1.default.sidebarButton, children: report.label }, report.value)); })] }));
};
exports.default = Sidebar;
