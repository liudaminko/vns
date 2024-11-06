import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./GradePrediction.module.css";

interface GradeData {
  subject: string;
  grade: number;
  timeSpent: number;
  date: string;
}

interface StudentData {
  studentName: string;
  grades: GradeData[];
}

const studentMockData: StudentData[] = [
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

const GradePrediction: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<StudentData[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(
    null
  );
  const [selectedCourse, setSelectedCourse] = useState<string>("All");

  // Handle input change and filter suggestions
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.length > 1) {
      setSuggestions(
        studentMockData.filter((student) =>
          student.studentName.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleStudentSelect = (student: StudentData) => {
    setSelectedStudent(student);
    setSearchTerm(student.studentName);
    setSuggestions([]);
    setSelectedCourse("All"); // Reset course filter on new student selection
  };

  const handleCourseSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(event.target.value);
  };

  const filteredGrades = selectedStudent
    ? selectedStudent.grades.filter(
        (g) => selectedCourse === "All" || g.subject === selectedCourse
      )
    : [];

  const predictGrade = () => {
    if (!filteredGrades.length) return 0;
    const averageGrade =
      filteredGrades.reduce((sum, g) => sum + g.grade, 0) /
      filteredGrades.length;
    return Math.round(averageGrade);
  };

  return (
    <div className={styles.container}>
      <h2>Grade Prediction</h2>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by student name"
          value={searchTerm}
          onChange={handleInputChange}
          className={styles.searchInput}
        />
        {suggestions.length > 0 && (
          <ul className={styles.suggestions}>
            {suggestions.map((student, index) => (
              <li
                key={index}
                onClick={() => handleStudentSelect(student)}
                className={styles.suggestionItem}
              >
                {student.studentName}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedStudent && (
        <>
          <div className={styles.courseFilter}>
            <label htmlFor="courseSelect">Filter by Course: </label>
            <select
              id="courseSelect"
              value={selectedCourse}
              onChange={handleCourseSelect}
              className={styles.courseSelect}
            >
              <option value="All">All Courses</option>
              {Array.from(
                new Set(selectedStudent.grades.map((g) => g.subject))
              ).map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <h3>
            Predicted Grade for {selectedStudent.studentName} in{" "}
            {selectedCourse === "All" ? "all courses" : selectedCourse}:{" "}
            {predictGrade()}
          </h3>

          <div className={styles.chartsContainer}>
            <h4>Grade Trend Over Time</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredGrades}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="grade"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default GradePrediction;
