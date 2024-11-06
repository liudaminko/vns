import { useState } from "react";
import styles from "./AttemptsCountSuccessRate.module.css";
import ExportButton from "../../../components/ExportButton/ExportButton";

interface AttemptData {
  studentName: string;
  testName: string;
  attempts: number;
  grades: number[];
}

const AttemptsCountSuccessRate: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const testNames = ["Math Test", "Science Quiz", "History Exam"];
  const attemptData: AttemptData[] = [
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

  // Filter data based on selected test and search term
  const filteredData = attemptData.filter((data) => {
    const matchesTest =
      selectedTest === "All" || data.testName === selectedTest;
    const matchesSearch = data.studentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesTest && matchesSearch;
  });

  // Prepare data for export
  const exportData = filteredData.map((data) => ({
    studentName: data.studentName,
    testName: data.testName,
    attempts: data.attempts,
    grades: data.grades.join(", "), // Joining grades as a string
    averageGrade: (
      data.grades.reduce((a, b) => a + b, 0) / data.grades.length
    ).toFixed(2), // Average grade
  }));

  const columns = [
    "Student Name",
    "Test Name",
    "Attempts",
    "Grades",
    "Average Grade",
  ];

  return (
    <div className={styles.container}>
      <h2>Attempts Count and Success Rate</h2>

      <div className={styles.filtersContainer}>
        <label htmlFor="testSelect">Select Test: </label>
        <select
          id="testSelect"
          value={selectedTest}
          onChange={(e) => setSelectedTest(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="All">All</option>
          {testNames.map((test, index) => (
            <option key={index} value={test}>
              {test}
            </option>
          ))}
        </select>

        <label htmlFor="searchInput">Search Student: </label>
        <input
          type="text"
          id="searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by student name"
          className={styles.searchInput}
        />
      </div>

      <table className={styles.attemptsTable}>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Test Name</th>
            <th>Attempts</th>
            <th>Grades</th>
            <th>Average Grade</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <td>{data.studentName}</td>
              <td>{data.testName}</td>
              <td>{data.attempts}</td>
              <td>{data.grades.join(", ")}</td>
              <td>
                {(
                  data.grades.reduce((a, b) => a + b, 0) / data.grades.length
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.exportButtonContainer}>
        <ExportButton
          data={exportData}
          columns={columns}
          fileName="Attempts_Success_Rate_Report"
        />
      </div>
    </div>
  );
};

export default AttemptsCountSuccessRate;
