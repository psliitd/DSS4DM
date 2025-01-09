import { Button } from "@mui/material";
import React from "react";
import Filter from "../../pages/institutionalMemory/Filter";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";

import styles from "../../pages/institutionalMemory/WP.module.css";
import { useWrit } from "../../pages/institutionalMemory/context/WritContext";

function FilterDiv({ fetchLatestWritData, isFilterModalOpen, setFilterModalOpen }) {
  const clearFilters = async () => {
    setFilterCloseChecked(false);
    setFilterWritRespondentNames("");
    setFilterWritPriority("");
    setFilterStatus(0);
    setFilterWritDepartment("");
    setFilterProject("");
    setFilterLandDepartment(false);
    setFilterSurveyNumber("");
    setFilterRevenueVillage("");
    setFilterStartDate("");
    setFilterEndDate("");

    setFiltersApplied(false);
    setSearchApplied(false);
    setSearchText("");
    fetchLatestWritData();
  };

  const {
    filtersApplied,
    searchApplied,
    setFilterCloseChecked,
    setFilterWritRespondentNames,
    setFilterWritPriority,
    setFilterStatus,
    setFilterWritDepartment,
    setFilterProject,
    setFilterLandDepartment,
    setFilterSurveyNumber,
    setFilterRevenueVillage,
    setFilterStartDate,
    setFilterEndDate,
    setSearchText,
    setFiltersApplied,
    setSearchApplied,
  } = useWrit();

  const handleClose = () => {
    setFilterModalOpen(false);
  };

  return (
    <>
      <Filter
        open={isFilterModalOpen}
        onClose={handleClose}
      />
      {/* <div className={styles.filterBtnDiv}>
        <Button
          className={styles.filterBtn}
          variant="text"
          onClick={() => setFilterModalOpen(true)}
          startIcon={<FilterListIcon />}
        >
          Filter
        </Button>
        <Button
          className={styles.filterBtn}
          variant="text"
          disabled={!filtersApplied && !searchApplied}
          onClick={clearFilters}
          startIcon={<ClearIcon />}
        >
          Clear Filters
        </Button>
      </div> */}
    </>
  );
}

export default FilterDiv;
