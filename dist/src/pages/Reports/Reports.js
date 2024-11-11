"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Reports_module_css_1 = __importDefault(require("./Reports.module.css"));
var Sidebar_1 = __importDefault(require("../../components/Sidebar/Sidebar"));
var UserGrades_1 = __importDefault(require("./UserGrades/UserGrades"));
var StudentTaskCompletion_1 = __importDefault(require("./StudentTaskCompletion/StudentTaskCompletion"));
var CoursesFeedbacks_1 = __importDefault(require("./CoursesFeedbacks/CoursesFeedbacks"));
var GradePrediction_1 = __importDefault(require("./GradePrediction/GradePrediction"));
var GradeTimeCorrelation_1 = __importDefault(require("./GradeTimeCorrelation/GradeTimeCorrelation"));
var AttemptsCountSuccessRate_1 = __importDefault(require("./AttemptsCountSuccessRate/AttemptsCountSuccessRate"));
var SidebarContext_1 = require("../../SidebarContext");
var Reports = function () {
    var _a = (0, react_1.useState)("UserGrades"), selectedReport = _a[0], setSelectedReport = _a[1];
    var _b = (0, SidebarContext_1.useSidebar)(), isSidebarOpen = _b.isSidebarOpen, closeSidebar = _b.closeSidebar;
    var _c = (0, react_1.useState)(false), isMobile = _c[0], setIsMobile = _c[1];
    (0, react_1.useEffect)(function () {
        var handleResize = function () {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return function () {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    var renderReportContent = function () {
        switch (selectedReport) {
            case "UserGrades":
                return (0, jsx_runtime_1.jsx)(UserGrades_1.default, {});
            case "GradePrediction":
                return (0, jsx_runtime_1.jsx)(GradePrediction_1.default, {});
            case "GradeTimeCorrelation":
                return (0, jsx_runtime_1.jsx)(GradeTimeCorrelation_1.default, {});
            case "TaskCompletion":
                return (0, jsx_runtime_1.jsx)(StudentTaskCompletion_1.default, {});
            case "StudentFeedback":
                return (0, jsx_runtime_1.jsx)(CoursesFeedbacks_1.default, {});
            case "AttemptsSuccess":
                return (0, jsx_runtime_1.jsx)(AttemptsCountSuccessRate_1.default, {});
            default:
                return (0, jsx_runtime_1.jsx)(UserGrades_1.default, {});
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: Reports_module_css_1.default.reportsContainer, children: [isSidebarOpen && ((0, jsx_runtime_1.jsx)("div", { className: "".concat(Reports_module_css_1.default.overlay, " ").concat(isSidebarOpen ? Reports_module_css_1.default.active : ""), onClick: closeSidebar })), (!isMobile || isSidebarOpen) && ((0, jsx_runtime_1.jsx)(Sidebar_1.default, { setSelectedReport: setSelectedReport, isOpen: isMobile ? isSidebarOpen : true, onClose: closeSidebar })), (0, jsx_runtime_1.jsx)("div", { className: Reports_module_css_1.default.contentArea, children: renderReportContent() })] }));
};
exports.default = Reports;
