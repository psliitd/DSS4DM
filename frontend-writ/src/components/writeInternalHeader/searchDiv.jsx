import React from 'react'
import styles from "../../pages/institutionalMemory/WP.module.css";
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useWrit } from '../../pages/institutionalMemory/context/WritContext';
import { getBaseUrl } from '../../utils';

function SearchDiv() {
    const {
        setFilteredData,
        setSearchApplied,
        searchText,
        setSearchText,
        loading,
        setLoading,
        filterWritRespondentNames,
        filterWritPriority,
        filterWritDepartment,
        filterProject,
        filterSurveyNumber,
        filterRevenueVillage,
        filterStartDate,
        filterEndDate,
    } = useWrit();

    const handleSearch = async () => {
        setLoading(true);
        try {
          const postData = {
            searchText,
            filterWritRespondentNames,
            filterWritPriority,
            filterWritDepartment,
            filterProject,
            filterSurveyNumber,
            filterRevenueVillage,
            filterStartDate,
            filterEndDate,
          };
          const response = await fetch(getBaseUrl() + "writ/filterWrit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(postData),
          });
          const responseData = await response.json();
          if (responseData.success) {
            const updatedData = responseData.data.map((item) => item);
            setFilteredData(updatedData);
            setSearchApplied(true);
          } else {
            console.error("Error from backend to apply filter", responseData.error);
          }
        } catch (error) {
          console.log("Error in applying filters! ", error);
        } finally {
          setLoading(false);
        }
      };

    return (
        <div className="flex items-center gap-2">
            <TextField
                className={styles.searchField}
                size="small"
                label="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
            />
            <Button
                className={styles.searchBtn}
                variant="contained"
                onClick={handleSearch}
                startIcon={<SearchIcon />}
            >
                Search
            </Button>
        </div>
    )
}

export default SearchDiv
