import styles from "./Sidebar.module.css";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  setSelectedReport: (report: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedReport }) => {
  const { t, i18n } = useTranslation();

  const reports = [
    { label: t("students_grades"), value: "UserGrades" },
    { label: t("grades_prediction"), value: "GradePrediction" },
    {
      label: t("grade_to_time_correlation"),
      value: "GradeTimeCorrelation",
    },
    { label: t("submitted_tasks"), value: "TaskCompletion" },
    { label: t("course_comments"), value: "StudentFeedback" },
    { label: t("attempts_count_success_rate"), value: "AttemptsSuccess" },
  ];

  return (
    <div className={styles.sidebar}>
      {reports.map((report) => (
        <button
          key={report.value}
          onClick={() => setSelectedReport(report.value)}
          className={styles.sidebarButton}
        >
          {report.label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
