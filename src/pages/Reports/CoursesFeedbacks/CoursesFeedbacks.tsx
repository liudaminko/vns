import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import styles from "./CoursesFeedbacks.module.css";
import ExportButton from "../../../components/ExportButton/ExportButton";

interface Feedback {
  studentName: string;
  course: string;
  date: Date;
  rating: number;
  comment: string;
}

const CoursesFeedbacks: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("All");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { t } = useTranslation();

  const feedbackData: Feedback[] = [
    {
      studentName: "Student A",
      course: "Math",
      date: new Date("2023-03-15"),
      rating: 5,
      comment: t("course_feedback.comment_great"),
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

  const courses = ["All", "Math", "Science", "History"];

  // Filter the data based on selected course and date range
  const filteredData = feedbackData.filter((feedback) => {
    const matchesCourse =
      selectedCourse === "All" || feedback.course === selectedCourse;
    const matchesDateRange =
      (!startDate || feedback.date >= startDate) &&
      (!endDate || feedback.date <= endDate);
    return matchesCourse && matchesDateRange;
  });

  const reportColumns = [
    t("student_name"),
    t("course"),
    t("date"),
    t("rating"),
    t("comment"),
  ];

  return (
    <div className={styles.container}>
      <h2>{t("course_comments")}</h2>
      <div className={styles.filtersContainer}>
        <label htmlFor="courseSelect">{t("select_course")}: </label>
        <select
          id="courseSelect"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className={styles.filterSelect}
        >
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course === "All" ? t("all_courses") : course}
            </option>
          ))}
        </select>

        <label htmlFor="startDate">{t("start_date")}: </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          className={styles.datePicker}
          placeholderText={t("select_start_date")}
        />

        <label htmlFor="endDate">{t("end_date")}: </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          className={styles.datePicker}
          placeholderText={t("select_end_date")}
        />
      </div>

      <table className={styles.feedbackTable}>
        <thead>
          <tr>
            <th>{t("student_name")}</th>
            <th>{t("course")}</th>
            <th>{t("date")}</th>
            <th>{t("rating")}</th>
            <th>{t("comment")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.studentName}</td>
              <td>{feedback.course}</td>
              <td>{feedback.date.toLocaleDateString()}</td>
              <td>{feedback.rating} / 5</td>
              <td>{feedback.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.exportButtonContainer}>
        <ExportButton
          data={filteredData}
          columns={reportColumns}
          fileName="Courses_Feedback_Report"
        />
      </div>
    </div>
  );
};

export default CoursesFeedbacks;
