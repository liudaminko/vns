import { useState, useEffect } from "react";
import styles from "./Reports.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserGrades from "./UserGrades/UserGrades";
import TaskCompletionAnalysis from "./StudentTaskCompletion/StudentTaskCompletion";
import CoursesFeedbacks from "./CoursesFeedbacks/CoursesFeedbacks";
import GradePrediction from "./GradePrediction/GradePrediction";
import GradeTimeCorrelation from "./GradeTimeCorrelation/GradeTimeCorrelation";
import AttemptsCountSuccessRate from "./AttemptsCountSuccessRate/AttemptsCountSuccessRate";
import { useSidebar } from "../../SidebarContext";

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>("UserGrades");
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderReportContent = () => {
    switch (selectedReport) {
      case "UserGrades":
        return <UserGrades />;
      case "GradePrediction":
        return <GradePrediction />;
      case "GradeTimeCorrelation":
        return <GradeTimeCorrelation />;
      case "TaskCompletion":
        return <TaskCompletionAnalysis />;
      case "StudentFeedback":
        return <CoursesFeedbacks />;
      case "AttemptsSuccess":
        return <AttemptsCountSuccessRate />;
      default:
        return <UserGrades />;
    }
  };

  return (
    <div className={styles.reportsContainer}>
      {isSidebarOpen && (
        <div
          className={`${styles.overlay} ${isSidebarOpen ? styles.active : ""}`}
          onClick={closeSidebar}
        ></div>
      )}

      {(!isMobile || isSidebarOpen) && (
        <Sidebar
          setSelectedReport={setSelectedReport}
          isOpen={isMobile ? isSidebarOpen : true} // Always open on desktop
          onClose={closeSidebar}
        />
      )}
      <div className={styles.contentArea}>{renderReportContent()}</div>
    </div>
  );
};

export default Reports;
