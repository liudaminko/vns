import { useState } from "react";
import styles from "./StudentTaskCompletion.module.css";
import ExportButton from "../../../components/ExportButton/ExportButton";
import React from "react";
import { useTranslation } from "react-i18next";

interface Task {
  name: string;
  status: "Completed" | "Pending";
}

interface StudentTaskCompletion {
  studentName: string;
  course: string;
  group: string;
  completedTasks: number;
  totalTasks: number;
  tasks: Task[];
}

const TaskCompletionAnalysis: React.FC = () => {
  const { t } = useTranslation();

  const [selectedCourse, setSelectedCourse] = useState<string>("All");
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);

  const courses = ["Math", "Science", "History"];
  const groups = ["Group A", "Group B", "Group C"];
  const studentData: StudentTaskCompletion[] = [
    {
      studentName: "Student A",
      course: "Math",
      group: "Group A",
      completedTasks: 8,
      totalTasks: 10,
      tasks: [
        { name: "Task 1", status: "Completed" },
        { name: "Task 2", status: "Completed" },
        { name: "Task 3", status: "Pending" },
        { name: "Task 4", status: "Completed" },
        { name: "Task 5", status: "Completed" },
        { name: "Task 6", status: "Pending" },
        { name: "Task 7", status: "Completed" },
        { name: "Task 8", status: "Completed" },
        { name: "Task 9", status: "Pending" },
        { name: "Task 10", status: "Completed" },
      ],
    },
    {
      studentName: "Student B",
      course: "Science",
      group: "Group B",
      completedTasks: 7,
      totalTasks: 10,
      tasks: [
        { name: "Task 1", status: "Completed" },
        { name: "Task 2", status: "Pending" },
        { name: "Task 3", status: "Completed" },
        { name: "Task 4", status: "Completed" },
        { name: "Task 5", status: "Pending" },
        { name: "Task 6", status: "Completed" },
        { name: "Task 7", status: "Pending" },
        { name: "Task 8", status: "Completed" },
        { name: "Task 9", status: "Completed" },
        { name: "Task 10", status: "Completed" },
      ],
    },
    {
      studentName: "Student C",
      course: "History",
      group: "Group C",
      completedTasks: 9,
      totalTasks: 10,
      tasks: [
        { name: "Task 1", status: "Completed" },
        { name: "Task 2", status: "Completed" },
        { name: "Task 3", status: "Completed" },
        { name: "Task 4", status: "Pending" },
        { name: "Task 5", status: "Completed" },
        { name: "Task 6", status: "Completed" },
        { name: "Task 7", status: "Completed" },
        { name: "Task 8", status: "Completed" },
        { name: "Task 9", status: "Completed" },
        { name: "Task 10", status: "Completed" },
      ],
    },
    {
      studentName: "Student D",
      course: "Math",
      group: "Group A",
      completedTasks: 5,
      totalTasks: 10,
      tasks: [
        { name: "Task 1", status: "Pending" },
        { name: "Task 2", status: "Pending" },
        { name: "Task 3", status: "Completed" },
        { name: "Task 4", status: "Completed" },
        { name: "Task 5", status: "Completed" },
        { name: "Task 6", status: "Pending" },
        { name: "Task 7", status: "Completed" },
        { name: "Task 8", status: "Pending" },
        { name: "Task 9", status: "Completed" },
        { name: "Task 10", status: "Pending" },
      ],
    },
    {
      studentName: "Student E",
      course: "Science",
      group: "Group B",
      completedTasks: 6,
      totalTasks: 10,
      tasks: [
        { name: "Task 1", status: "Completed" },
        { name: "Task 2", status: "Pending" },
        { name: "Task 3", status: "Completed" },
        { name: "Task 4", status: "Completed" },
        { name: "Task 5", status: "Completed" },
        { name: "Task 6", status: "Pending" },
        { name: "Task 7", status: "Pending" },
        { name: "Task 8", status: "Completed" },
        { name: "Task 9", status: "Completed" },
        { name: "Task 10", status: "Completed" },
      ],
    },
    {
      studentName: "Student F",
      course: "History",
      group: "Group C",
      completedTasks: 10,
      totalTasks: 10,
      tasks: [
        { name: "Task 1", status: "Completed" },
        { name: "Task 2", status: "Completed" },
        { name: "Task 3", status: "Completed" },
        { name: "Task 4", status: "Completed" },
        { name: "Task 5", status: "Completed" },
        { name: "Task 6", status: "Completed" },
        { name: "Task 7", status: "Completed" },
        { name: "Task 8", status: "Completed" },
        { name: "Task 9", status: "Completed" },
        { name: "Task 10", status: "Completed" },
      ],
    },
  ];

  const reportColumns = [
    t("student_name"),
    t("course"),
    t("group"),
    t("completed_tasks"),
    t("total_tasks"),
    t("completion_percentage"),
  ];

  const filteredData = studentData.filter((student) => {
    const matchesCourse =
      selectedCourse === "All" || student.course === selectedCourse;
    const matchesGroup =
      selectedGroup === "All" || student.group === selectedGroup;
    const matchesSearch = student.studentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCourse && matchesGroup && matchesSearch;
  });

  const formattedReportData = filteredData.map((student) => ({
    studentName: student.studentName,
    course: student.course,
    group: student.group,
    completedTasks: student.completedTasks,
    totalTasks: student.totalTasks,
    completionPercentage: (
      (student.completedTasks / student.totalTasks) *
      100
    ).toFixed(2),
  }));

  const toggleExpandedStudent = (studentName: string) => {
    setExpandedStudent((prev) => (prev === studentName ? null : studentName));
  };

  return (
    <div className={styles.container}>
      <h2>{t("submitted_tasks")}</h2>
      <div className={styles.filtersContainer}>
        <label htmlFor="courseSelect">{t("select_course")}: </label>
        <select
          id="courseSelect"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className={styles.courseSelect}
        >
          <option value="All">{t("all")}</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>

        <label htmlFor="groupSelect">{t("select_group")}: </label>
        <select
          id="groupSelect"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className={styles.groupSelect}
        >
          <option value="All">{t("all")}</option>
          {groups.map((group, index) => (
            <option key={index} value={group}>
              {group}
            </option>
          ))}
        </select>

        <label htmlFor="searchInput">{t("search_student")}: </label>
        <input
          type="text"
          id="searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("search_by_student_name")}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.completionTableContainer}>
        <table className={styles.completionTable}>
          <thead>
            <tr>
              <th>{t("student_name")}</th>
              <th>{t("course")}</th>
              <th>{t("group")}</th>
              <th>{t("completed_tasks")}</th>
              <th>{t("total_tasks")}</th>
              <th>{t("completion_percentage")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{student.studentName}</td>
                  <td>{student.course}</td>
                  <td>{student.group}</td>
                  <td>{student.completedTasks}</td>
                  <td>{student.totalTasks}</td>
                  <td>
                    {(
                      (student.completedTasks / student.totalTasks) *
                      100
                    ).toFixed(2)}
                    %
                  </td>
                  <td>
                    <div
                      onClick={() => toggleExpandedStudent(student.studentName)}
                      className={styles.expandButton}
                    >
                      <img
                        src={
                          expandedStudent === student.studentName
                            ? "/up.png"
                            : "/down.png"
                        }
                        height={"12px"}
                      />
                    </div>
                  </td>
                </tr>
                {expandedStudent === student.studentName && (
                  <tr>
                    <td colSpan={7}>
                      <div className={styles.taskDetailsContainer}>
                        <table className={styles.taskDetailsTable}>
                          <thead>
                            <tr>
                              <th>{t("task_name")}</th>
                              <th>{t("status")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {student.tasks.map((task, taskIndex) => (
                              <tr key={taskIndex}>
                                <td>{task.name}</td>
                                <td>{t(task.status.toLowerCase())}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.exportButtonContainer}>
        <ExportButton
          data={formattedReportData}
          columns={reportColumns}
          fileName="Student_Task_Completion_Report"
        />
      </div>
    </div>
  );
};

export default TaskCompletionAnalysis;
