"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var file_saver_1 = require("file-saver");
var xlsx_1 = require("xlsx");
var jspdf_1 = __importDefault(require("jspdf"));
require("jspdf-autotable");
var ExportButton_module_css_1 = __importDefault(require("./ExportButton.module.css"));
var ExportButton = function (_a) {
    var data = _a.data, columns = _a.columns, fileName = _a.fileName;
    var _b = (0, react_1.useState)(false), dropdownVisible = _b[0], setDropdownVisible = _b[1];
    var toggleDropdown = function () {
        setDropdownVisible(!dropdownVisible);
    };
    var exportPDF = function () {
        var doc = new jspdf_1.default();
        doc.text(fileName, 20, 10);
        doc.autoTable({
            head: [columns],
            body: data.map(function (item) { return columns.map(function (column) { return item[column]; }); }),
        });
        doc.save("".concat(fileName, ".pdf"));
    };
    var exportCSV = function () {
        var worksheet = xlsx_1.utils.json_to_sheet(data);
        var workbook = xlsx_1.utils.book_new();
        xlsx_1.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        (0, xlsx_1.writeFile)(workbook, "".concat(fileName, ".csv"));
    };
    var exportDOCX = function () {
        var worksheet = xlsx_1.utils.json_to_sheet(data);
        var workbook = xlsx_1.utils.book_new();
        xlsx_1.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        (0, xlsx_1.writeFile)(workbook, "".concat(fileName, ".docx"));
    };
    var exportHTML = function () {
        var htmlContent = "\n      <html>\n        <head><title>".concat(fileName, "</title></head>\n        <body>\n          <table border=\"1\">\n            <thead>\n              <tr>").concat(columns.map(function (column) { return "<th>".concat(column, "</th>"); }).join(""), "</tr>\n            </thead>\n            <tbody>\n              ").concat(data
            .map(function (row) {
            return "<tr>".concat(columns
                .map(function (column) { return "<td>".concat(row[column], "</td>"); })
                .join(""), "</tr>");
        })
            .join(""), "\n            </tbody>\n          </table>\n        </body>\n      </html>\n    ");
        var blob = new Blob([htmlContent], { type: "text/html" });
        (0, file_saver_1.saveAs)(blob, "".concat(fileName, ".html"));
    };
    var handleExport = function (format) {
        switch (format) {
            case "PDF":
                exportPDF();
                break;
            case "CSV":
                exportCSV();
                break;
            case "DOCX":
                exportDOCX();
                break;
            case "HTML":
                exportHTML();
                break;
            default:
                break;
        }
        setDropdownVisible(false);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: ExportButton_module_css_1.default.exportContainer, children: [(0, jsx_runtime_1.jsx)("button", { onClick: toggleDropdown, className: ExportButton_module_css_1.default.exportButton, children: "Export Data" }), dropdownVisible && ((0, jsx_runtime_1.jsxs)("div", { className: ExportButton_module_css_1.default.dropdownMenu, children: [(0, jsx_runtime_1.jsx)("div", { onClick: function () { return handleExport("PDF"); }, className: ExportButton_module_css_1.default.dropdownItem, children: "Export as PDF" }), (0, jsx_runtime_1.jsx)("div", { onClick: function () { return handleExport("CSV"); }, className: ExportButton_module_css_1.default.dropdownItem, children: "Export as CSV" }), (0, jsx_runtime_1.jsx)("div", { onClick: function () { return handleExport("DOCX"); }, className: ExportButton_module_css_1.default.dropdownItem, children: "Export as DOCX" }), (0, jsx_runtime_1.jsx)("div", { onClick: function () { return handleExport("HTML"); }, className: ExportButton_module_css_1.default.dropdownItem, children: "Export as HTML" })] }))] }));
};
exports.default = ExportButton;
