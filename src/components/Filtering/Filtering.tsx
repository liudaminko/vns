import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./Filtering.module.css";
import { useTranslation } from "react-i18next";

interface FilterOption {
  type: string;
  value: string;
}

const availableFilters: Record<string, string[]> = {
  Year: ["2024", "2023", "2022"],
  Course: ["Math", "Science", "History"],
  Group: ["Group A", "Group B", "Group C"],
  Student: ["Student A", "Student B", "Student C"],
};

const Filtering: React.FC<{
  setFilters: (filters: FilterOption[]) => void;
  setGradeRange: (range: [number, number]) => void;
  gradeRange: [number, number];
}> = ({ setFilters, setGradeRange, gradeRange }) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (type: string, value: string) => {
    const existingIndex = selectedFilters.findIndex(
      (filter) => filter.type === type && filter.value === value
    );

    if (existingIndex > -1) {
      const updatedFilters = selectedFilters.filter(
        (_, index) => index !== existingIndex
      );
      setSelectedFilters(updatedFilters);
      setFilters(updatedFilters);
    } else {
      const newFilter = { type, value };
      setSelectedFilters((prev) => [...prev, newFilter]);
      setFilters([...selectedFilters, newFilter]);
    }
  };

  const isSelected = (type: string, value: string) => {
    return selectedFilters.some(
      (filter) => filter.type === type && filter.value === value
    );
  };

  const handleGradeRangeChange = (range: number | number[]) => {
    if (Array.isArray(range)) {
      setGradeRange([range[0], range[1]]);
    }
  };

  return (
    <div className={styles.filterContainer}>
      <button className={styles.filterButton} onClick={handleToggleDropdown}>
        {t("filter")}
        <img src="/filter.png" height={"16px"} alt="Filter" />
      </button>
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          {Object.keys(availableFilters).map((category, index) => (
            <div key={index} className={styles.filterCategory}>
              <h4>{t(category.toLowerCase())}</h4>
              <div className={styles.optionsContainer}>
                {availableFilters[category].map((option, idx) => (
                  <div
                    key={idx}
                    className={`${styles.option} ${
                      isSelected(category, option) ? styles.selected : ""
                    }`}
                    onClick={() => handleOptionClick(category, option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className={styles.filterCategory}>
            <h4>{t("grade_range")}</h4>
            <div className={styles.sliderContainer}>
              <Slider
                range
                min={0}
                max={100}
                value={gradeRange}
                onChange={handleGradeRangeChange}
                allowCross={false}
              />
              <div className={styles.rangeValues}>
                <span>{gradeRange[0]}</span> - <span>{gradeRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filtering;
