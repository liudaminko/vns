import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Chart as ChartJS,
  ScatterController,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import ExportButton from "../../../components/ExportButton/ExportButton";
import styles from "./GradeTimeCorrelation.module.css";

ChartJS.register(ScatterController, LinearScale, PointElement, Tooltip, Legend);

interface GradeTimeData {
  studentName: string;
  course: string;
  grade: number;
  timeSpent: number; // in hours
  date: Date;
}

const GradeTimeCorrelation: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const data: GradeTimeData[] = [
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

  const filteredData = data.filter((d) => {
    const matchesCourse =
      selectedCourse === "All" || d.course === selectedCourse;
    const matchesStudent =
      !selectedStudent || d.studentName.includes(selectedStudent);
    const matchesDate =
      (!startDate || d.date >= startDate) && (!endDate || d.date <= endDate);
    return matchesCourse && matchesStudent && matchesDate;
  });

  console.log("Filtered Data:", filteredData); // Debugging line

  const chartData = {
    datasets: [
      {
        label: "Time vs Grade",
        data: filteredData.map((d) => ({ x: d.timeSpent, y: d.grade })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Calculations for Average Grade, Average Time, and Correlation Coefficient
  const calculateAverage = (values: number[]) =>
    values.reduce((sum, value) => sum + value, 0) / values.length;

  const averageGrade =
    filteredData.length > 0
      ? calculateAverage(filteredData.map((d) => d.grade))
      : 0;
  const averageTimeSpent =
    filteredData.length > 0
      ? calculateAverage(filteredData.map((d) => d.timeSpent))
      : 0;

  const calculateCorrelation = (data: GradeTimeData[]) => {
    if (data.length < 2) return 0; // Not enough data to calculate correlation

    const grades = data.map((d) => d.grade);
    const times = data.map((d) => d.timeSpent);

    const avgGrade = calculateAverage(grades);
    const avgTime = calculateAverage(times);

    const numerator = data.reduce(
      (sum, d) => sum + (d.grade - avgGrade) * (d.timeSpent - avgTime),
      0
    );
    const gradeDiffSquared = data.reduce(
      (sum, d) => sum + Math.pow(d.grade - avgGrade, 2),
      0
    );
    const timeDiffSquared = data.reduce(
      (sum, d) => sum + Math.pow(d.timeSpent - avgTime, 2),
      0
    );

    return gradeDiffSquared && timeDiffSquared
      ? numerator / Math.sqrt(gradeDiffSquared * timeDiffSquared)
      : 0;
  };

  const correlationCoefficient = calculateCorrelation(filteredData);

  const columns = ["Student Name", "Course", "Grade", "Time Spent", "Date"];

  return (
    <div className={styles.container}>
      <h2>Grade to Time Correlation</h2>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by student name"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        />
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="All">All Courses</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
        </select>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date || undefined)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date || undefined)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
        />
      </div>

      <div className={styles.chartContainer}>
        <Scatter data={chartData} options={{ maintainAspectRatio: false }} />
      </div>

      <div className={styles.stats}>
        <p>Average Grade: {averageGrade.toFixed(2)}</p>
        <p>Average Time Spent: {averageTimeSpent.toFixed(2)} hours</p>
        <p>Correlation Coefficient: {correlationCoefficient.toFixed(2)}</p>
      </div>

      <ExportButton
        data={filteredData}
        columns={columns}
        fileName="Grade_Time_Correlation"
      />
    </div>
  );
};

export default GradeTimeCorrelation;
