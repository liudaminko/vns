import { useState } from "react";
import styles from "./Sorting.module.css";
import { useTranslation } from "react-i18next";

const sortingOptions: string[] = [
  "Year (Ascending)",
  "Year (Descending)",
  "Course (A-Z)",
  "Course (Z-A)",
  "Grade (Highest to Lowest)",
  "Grade (Lowest to Highest)",
];

const Sorting: React.FC<{ setSorting: (sorting: string | null) => void }> = ({
  setSorting,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedSorting, setSelectedSorting] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSelectedSorting(option);
    setSorting(option);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className={styles.sortingContainer}>
      <button className={styles.sortingButton} onClick={handleToggleDropdown}>
        {t("sort")}
        <img src="/sort.png" height={"16px"} alt="Sort" />
      </button>
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          {sortingOptions.map((option, index) => (
            <div
              key={index}
              className={`${styles.option} ${
                selectedSorting === option ? styles.selected : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {t(`sort_${option.replace(/\s+/g, "_").toLowerCase()}`)}
            </div>
          ))}
        </div>
      )}
      {selectedSorting && (
        <div className={styles.selectedSorting}>
          <h4>
            {t("current_sorting")}:{" "}
            {t(`sort_${selectedSorting.replace(/\s+/g, "_").toLowerCase()}`)}
          </h4>
        </div>
      )}
    </div>
  );
};

export default Sorting;
