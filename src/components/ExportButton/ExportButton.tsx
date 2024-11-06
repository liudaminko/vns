import { useState } from "react";
import { saveAs } from "file-saver";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styles from "./ExportButton.module.css";

interface ExportButtonProps {
  data: any[];
  columns: string[];
  fileName: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  columns,
  fileName,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(fileName, 20, 10);
    (doc as any).autoTable({
      head: [columns],
      body: data.map((item) => columns.map((column) => item[column])),
    });
    doc.save(`${fileName}.pdf`);
  };

  const exportCSV = () => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    writeFile(workbook, `${fileName}.csv`);
  };

  const exportDOCX = () => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    writeFile(workbook, `${fileName}.docx`);
  };

  const exportHTML = () => {
    const htmlContent = `
      <html>
        <head><title>${fileName}</title></head>
        <body>
          <table border="1">
            <thead>
              <tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (row) =>
                    `<tr>${columns
                      .map((column) => `<td>${row[column]}</td>`)
                      .join("")}</tr>`
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: "text/html" });
    saveAs(blob, `${fileName}.html`);
  };

  const handleExport = (format: string) => {
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

  return (
    <div className={styles.exportContainer}>
      <button onClick={toggleDropdown} className={styles.exportButton}>
        Export Data
      </button>
      {dropdownVisible && (
        <div className={styles.dropdownMenu}>
          <div
            onClick={() => handleExport("PDF")}
            className={styles.dropdownItem}
          >
            Export as PDF
          </div>
          <div
            onClick={() => handleExport("CSV")}
            className={styles.dropdownItem}
          >
            Export as CSV
          </div>
          <div
            onClick={() => handleExport("DOCX")}
            className={styles.dropdownItem}
          >
            Export as DOCX
          </div>
          <div
            onClick={() => handleExport("HTML")}
            className={styles.dropdownItem}
          >
            Export as HTML
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportButton;
