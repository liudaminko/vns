import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./UserGrades.module.css";
import Filtering from "../../../components/Filtering/Filtering";
import Sorting from "../../../components/Sorting/Sorting";
import ExportButton from "../../../components/ExportButton/ExportButton";
import { useTranslation } from "react-i18next";

interface GradeEntry {
  studentName: string;
  course: string;
  grade: number;
  year: number;
  group: string;
}

const UserGrades: React.FC = () => {
  const { t } = useTranslation();
  const [grades, setGrades] = useState<GradeEntry[]>([
    {
      studentName: "Student A",
      course: "Math",
      grade: 85,
      year: 2023,
      group: "Group A",
    },
    {
      studentName: "Student B",
      course: "Science",
      grade: 78,
      year: 2023,
      group: "Group B",
    },
    {
      studentName: "Student C",
      course: "History",
      grade: 92,
      year: 2024,
      group: "Group C",
    },
    {
      studentName: "Student D",
      course: "Math",
      grade: 67,
      year: 2022,
      group: "Group A",
    },
    {
      studentName: "Student E",
      course: "Science",
      grade: 88,
      year: 2021,
      group: "Group B",
    },
    {
      studentName: "Student F",
      course: "History",
      grade: 73,
      year: 2023,
      group: "Group C",
    },
  ]);
  const [filters, setFilters] = useState<{ type: string; value: string }[]>([]);
  const [sorting, setSorting] = useState<string | null>(null);
  const [gradeRange, setGradeRange] = useState<[number, number]>([0, 100]);

  const handleGradeRangeChange = (range: [number, number]) => {
    setGradeRange(range);
  };

  const filteredGrades = grades.filter((entry) => {
    const matchesFilters = filters.every((filter) => {
      if (filter.type === "Course") return entry.course === filter.value;
      if (filter.type === "Year") return entry.year.toString() === filter.value;
      if (filter.type === "Group") return entry.group === filter.value;
      if (filter.type === "Mark") {
        const gradeLetter =
          entry.grade >= 90
            ? "A"
            : entry.grade >= 80
            ? "B"
            : entry.grade >= 70
            ? "C"
            : "D";
        return gradeLetter === filter.value;
      }
      return true;
    });

    const withinGradeRange =
      entry.grade >= gradeRange[0] && entry.grade <= gradeRange[1];
    return matchesFilters && withinGradeRange;
  });

  const sortedGrades = [...filteredGrades].sort((a, b) => {
    if (!sorting) return 0;
    switch (sorting) {
      case "Year (Ascending)":
        return a.year - b.year;
      case "Year (Descending)":
        return b.year - a.year;
      case "Course (A-Z)":
        return a.course.localeCompare(b.course);
      case "Course (Z-A)":
        return b.course.localeCompare(a.course);
      case "Grade (Highest to Lowest)":
        return b.grade - a.grade;
      case "Grade (Lowest to Highest)":
        return a.grade - b.grade;
      default:
        return 0;
    }
  });

  const columns = [
    t("student_name"),
    t("course"),
    t("group"),
    t("grade"),
    t("year"),
  ];

  const exportData = sortedGrades.map((entry) => ({
    [t("student_name")]: entry.studentName,
    [t("course")]: entry.course,
    [t("group")]: entry.group,
    [t("grade")]: entry.grade,
    [t("year")]: entry.year,
  }));

  return (
    <div className={styles.container}>
      <h2>{t("students_grades")}</h2>
      <div className={styles.controlsContainer}>
        <div className={styles.filterContainer}>
          <Filtering
            setFilters={setFilters}
            setGradeRange={setGradeRange}
            gradeRange={gradeRange}
          />
        </div>
        <div className={styles.sortContainer}>
          <Sorting setSorting={setSorting} />
        </div>
      </div>

      <div className={styles.selectedFilters}>
        {filters.map((filter, index) => (
          <div key={index} className={styles.filterTag}>
            {t(filter.type)}: {filter.value}
            <span
              className={styles.removeIcon}
              onClick={() => {
                const updatedFilters = filters.filter((_, i) => i !== index);
                setFilters(updatedFilters);
              }}
            >
              ✖
            </span>
          </div>
        ))}
      </div>

      <table className={styles.gradesTable}>
        <thead>
          <tr>
            <th>{t("student_name")}</th>
            <th>{t("course")}</th>
            <th>{t("group")}</th>
            <th>{t("grade")}</th>
            <th>{t("year")}</th>
          </tr>
        </thead>
        <tbody>
          {sortedGrades.map((entry, index) => (
            <tr key={index}>
              <td>{entry.studentName}</td>
              <td>{entry.course}</td>
              <td>{entry.group}</td>
              <td>{entry.grade}</td>
              <td>{entry.year}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.exportButtonContainer}>
        <ExportButton
          data={exportData}
          columns={columns}
          fileName="User_Grades_Report"
        />
      </div>
    </div>
  );
};

export default UserGrades;
