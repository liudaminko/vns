// Sidebar.tsx

import { useTranslation } from "react-i18next";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  setSelectedReport: (report: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  setSelectedReport,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();

  const reports = [
    { label: t("students_grades"), value: "UserGrades" },
    { label: t("grades_prediction"), value: "GradePrediction" },
    { label: t("grade_to_time_correlation"), value: "GradeTimeCorrelation" },
    { label: t("submitted_tasks"), value: "TaskCompletion" },
    { label: t("course_comments"), value: "StudentFeedback" },
    { label: t("attempts_count_success_rate"), value: "AttemptsSuccess" },
  ];

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button className={styles.closeButton} onClick={onClose}>
        ✕
      </button>
      {reports.map((report) => (
        <button
          key={report.value}
          onClick={() => {
            setSelectedReport(report.value);
            onClose(); // Close sidebar after selection on mobile
          }}
          className={styles.sidebarButton}
        >
          {report.label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
