import { useState } from "react";
import styles from "./Reports.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserGrades from "./UserGrades/UserGrades";
import TaskCompletionAnalysis from "./StudentTaskCompletion/StudentTaskCompletion";
import CoursesFeedbacks from "./CoursesFeedbacks/CoursesFeedbacks";
import GradePrediction from "./GradePrediction/GradePrediction";
import GradeTimeCorrelation from "./GradeTimeCorrelation/GradeTimeCorrelation";
import AttemptsCountSuccessRate from "./AttemptsCountSuccessRate/AttemptsCountSuccessRate";

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>("UserGrades");

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
      <Sidebar setSelectedReport={setSelectedReport} />
      <div className={styles.contentArea}>{renderReportContent()}</div>
    </div>
  );
};

export default Reports;
