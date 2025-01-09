import React, { useEffect, useState } from "react";
import { getBaseUrl } from "../../utils";
import { headerNavbarWrapper } from "../../components/MainPage/headerNavbarWrapper";
import {
  Container,
  TextField,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  responsiveFontSizes,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./WP.module.css";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import { useWrit } from "./context/WritContext";
import { useMemo } from "react";
import { faXing } from "@fortawesome/free-brands-svg-icons";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { ConstructionOutlined } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop"; // Import Backdrop
import { useNavigate } from "react-router-dom";
import FilterDiv from "../../components/writeInternalHeader/filterDiv";
import SearchDiv from "../../components/writeInternalHeader/searchDiv";
import WriteFilterSearchAddToggle from "../../components/writeInternalHeader/writeFilterSearchAddToggle";

const WP = () => {
  // const demoData = [
  //     { id: 1, column1: "25267", column2: "Education", column3: "Mr. Ramgopal Verma", column4: "District Collector", column5: "26/11/2023",},
  //     { id: 2, column1: "24687", column2: "Land", column3: "Mr. Muttuswami", column4: "Health Officer", column5: "26/11/2023",},
  //     { id: 3, column1: "26743", column2: "Social Welfare", column3: "Mr. Vengopal Iyer", column4: "District Collector", column5: "11/05/2022",},
  //     { id: 4, column1: "26746", column2: "Health", column3: "Mr. Yagapalli Iyer", column4: "District Collector", column5: "11/03/1999",},
  //     { id: 5, column1: "26747", column2: "Land", column3: "Mr. Rahul Gandhi", column4: "District Collector", column5: "15/11/2001",},
  //     { id: 6, column1: "37641", column2: "Land", column3: "Mr. Amit Shah", column4: "Tehsildar", column5: "26/06/2003",},
  //     { id: 7, column1: "46674", column2: "Education", column3: "Mr. Patrick Cummins", column4: "District Education Minister", column5: "26/11/2023",},

  //     // Add more demo entries as needed
  // ];
  const navigate = useNavigate();
  const {
    writNumber,
    setWritNumber,

    writDate,
    setWritDate,
    writPetitionerName,
    setWritPetitionerName,
    writRespondentNames,
    setWritRespondentNames,
    writPetitionerPrayer,
    setWritPetitionerPrayer,
    writCourtOrder,
    setWritCourtOrder,
    writDcComments,
    setWritDcComments,
    writPriority,
    setWritPriority,
    writFileAttachment,
    setWritFileAttachment,

    remarkDate,
    setRemarkDate,
    paraRemark,
    setParaRemark,
    remarkDcComments,
    setRemarkDcComments,
    remarkFileAttachment,
    setRemarkFileAttachment,

    contemptDate,
    setContemptDate,
    contemptText,
    setContemptText,
    contemptDcComments,
    setContemptDcComments,
    contemptFileAttachment,
    setContemptFileAttachment,

    filteredData,
    setFilteredData,
    filtersApplied,
    setFiltersApplied,
    filterCloseChecked,
    setFilterCloseChecked,
    filterWritRespondentNames,
    setFilterWritRespondentNames,
    filterWritPriority,
    setFilterWritPriority,
    filterStatus,
    setFilterStatus,
    filterWritDepartment,
    setFilterWritDepartment,
    filterProject,
    setFilterProject,
    filterLandDepartment,
    setFilterLandDepartment,
    filterSurveyNumber,
    setFilterSurveyNumber,
    filterRevenueVillage,
    setFilterRevenueVillage,
    filterStartDate,
    setFilterStartDate,
    filterEndDate,
    setFilterEndDate,
    searchApplied,
    setSearchApplied,
    searchText,
    setSearchText,

    counterFormInstances,
    setCounterFormInstances,

    writClose,
    setWritClose,
    writCloseDate,
    setWritCloseDate,
    loading,
    setLoading,

    isAddNew,
    setIsAddNew,
  } = useWrit();

  const [demoData, setDemoData] = useState([]);

  // const [searchApplied, setSearchApplied] = useState(false);

  const fetchLatestWritData = async () => {
    setLoading(true);
    try {
      const response = await fetch(getBaseUrl() + "writ/getLatestWrit", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.success) {
        const updatedData = data.data.map((item) => item);
        setFilteredData(updatedData);
      } else {
        throw new Error("Error in response from backend");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  //   const clearFilters = async () => {
  //     setFilterCloseChecked(false);
  //     setFilterWritRespondentNames("");
  //     setFilterWritPriority("");
  //     setFilterStatus(0);
  //     setFilterWritDepartment("");
  //     setFilterProject("");
  //     setFilterLandDepartment(false);
  //     setFilterSurveyNumber("");
  //     setFilterRevenueVillage("");
  //     setFilterStartDate("");
  //     setFilterEndDate("");

  //     setFiltersApplied(false);
  //     setSearchApplied(false);
  //     setSearchText("");
  //     fetchLatestWritData();
  //   };

  useEffect(() => {
    fetchLatestWritData();
    setIsAddNew(false);
  }, []);

  useEffect(() => {
    // console.log("New isAddNew value : ", isAddNew);
  }, [isAddNew]);

  //   const handleSearch = async () => {
  //     setLoading(true);
  //     try {
  //       const postData = {
  //         searchText,
  //         filterWritRespondentNames,
  //         filterWritPriority,
  //         filterWritDepartment,
  //         filterProject,
  //         filterSurveyNumber,
  //         filterRevenueVillage,
  //         filterStartDate,
  //         filterEndDate,
  //       };
  //       // for (const key in postData){
  //       //     console.log(key, postData[key])
  //       // }
  //       const response = await fetch(getBaseUrl() + "writ/filterWrit", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //         body: JSON.stringify(postData),
  //       });
  //       const responseData = await response.json();
  //       if (responseData.success) {
  //         // for (const key in responseData.data) {
  //         //     console.log(key +  " " +  responseData.data[key])
  //         // }
  //         const updatedData = responseData.data.map((item) => item);
  //         setFilteredData(updatedData);
  //         setSearchApplied(true);
  //       } else {
  //         console.error("Error from backend to apply filter", responseData.error);
  //       }
  //     } catch (error) {
  //       console.log("Error in applying filters! ", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleAddNew = () => {
    setWritNumber("");

    setWritDate("");
    setWritPetitionerName("");
    setWritRespondentNames([]);
    setWritPetitionerPrayer("");
    setWritCourtOrder("");
    setWritDcComments("");
    setWritPriority("");
    setWritFileAttachment("");

    setRemarkDate("");
    setParaRemark("");
    setRemarkDcComments("");
    setRemarkFileAttachment("");

    setContemptDate("");
    setContemptText("");
    setContemptDcComments("");
    setContemptFileAttachment("");
    setSearchApplied(false);

    setWritClose(false);
    setWritCloseDate("");
    setIsAddNew(true);
  };

  const handleUpdateButton = async (writNumber) => {
    // Add your logic for adding new entries
    setLoading(true);
    try {
      const postData = { writNumber };
      const response = await fetch(getBaseUrl() + "writ/getWrit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(postData),
      });
      const responseData = await response.json();
      setSearchApplied(true);
      console.log("There");
      if (responseData.success) {
        console.log("here");
        handleAddNew();
        setIsAddNew(false);
        for (const key in responseData.data) {
          fxn(key, responseData.data[key]);
          // console.log(key,responseData.data[key])
        }
        // nagivate to add-wp
        navigate("/user/wp/add-wp");
      } else {
        setLoading(false);
        console.error(
          "Error in response from backend in getWrit",
          responseData.error
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during the POST request Wp.js getwrit:", error);
    }
  };

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [tempWritNumberDelete, setTempWritNumberDelete] = useState();
  const handleDeleteButton = (writNumber) => {
    setDeleteConfirmationOpen(true);
    setTempWritNumberDelete(writNumber);
  };

  const handleDeleteConfirmation = () => {
    handleDelete(tempWritNumberDelete);
    handleDeleteConfirmationClose();
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleDelete = async (writNumber) => {
    setLoading(true);
    try {
      const postData = { writNumber };
      const response = await fetch(getBaseUrl() + "writ/deleteWrit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(postData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        // remove that specific entry from filtered data and update the table below.
        const updatedFilteredData = filteredData.filter(
          (entry) => entry.column1 !== writNumber
        );
        setFilteredData(updatedFilteredData);
      } else {
        console.error(
          "Error in response for Delete operation in wp.js ",
          responseData.error
        );
      }
    } catch (error) {
      console.error("Error during Delete entry in Wp.js : ", error);
    } finally {
      setLoading(false);
    }
  };

  const fxn = (key, val) => {
    switch (key) {
      case "writNumber":
        setWritNumber(val);
        break;
      case "writDate":
        setWritDate(val);
        break;
      case "writPetitionerName":
        setWritPetitionerName(val);
        break;
      case "writRespondentNames":
        setWritRespondentNames(val);
        break;
      case "writPetitionerPrayer":
        setWritPetitionerPrayer(val);
        break;
      case "writCourtOrder":
        setWritCourtOrder(val);
        break;
      case "writDcComments":
        setWritDcComments(val);
        break;
      case "writPriority":
        setWritPriority(val);
        break;
      case "writFileAttachment":
        setWritFileAttachment(val);
        break;
      case "remarkDate":
        setRemarkDate(val);
        break;
      case "paraRemark":
        setParaRemark(val);
        break;
      case "remarkDcComments":
        setRemarkDcComments(val);
        break;
      case "remarkFileAttachment":
        setRemarkFileAttachment(val);
        break;
      case "contemptDate":
        setContemptDate(val);
        break;
      case "contemptText":
        setContemptText(val);
        break;
      case "contemptDcComments":
        setContemptDcComments(val);
        break;
      case "contemptFileAttachment":
        setContemptFileAttachment(val);
        break;
      case "counterFormInstances":
        setCounterFormInstances(val);
        break;
      case "writClose":
        setWritClose(val);
        break;
      case "writCloseDate":
        setWritCloseDate(val);
        break;
      default:
        return "key not found in database";
    }
  };

  return (
    <>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <WriteFilterSearchAddToggle />

      <TableContainer 
        className={styles.tableContainer} 
        component={Paper}
        sx={{
          margin: '0',  // Changed from 20px to 0
          width: '100%', // Changed from calc(100% - 40px) to 100%
          backgroundColor: '#f8fafc',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          borderRadius: '0' // Added to remove rounded corners
        }}
      >
        <Table className={styles.tableBody} sx={{ width: '100%', minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1e40af' }}>
              <TableCell 
                sx={{ 
                  fontSize: "1.1rem", 
                  textAlign: "center", 
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                Writ Number
              </TableCell>
              <TableCell 
                sx={{ 
                  fontSize: "1.1rem", 
                  textAlign: "center", 
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                Priority
              </TableCell>
              <TableCell 
                sx={{ 
                  fontSize: "1.1rem", 
                  textAlign: "center", 
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                Petitioner Name
              </TableCell>
              <TableCell 
                sx={{ 
                  fontSize: "1.1rem", 
                  textAlign: "center", 
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                Respondent Name
              </TableCell>
              <TableCell 
                sx={{ 
                  fontSize: "1.1rem", 
                  textAlign: "center", 
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                Last Modified
              </TableCell>
              <TableCell 
                sx={{ 
                  fontSize: "1.1rem", 
                  textAlign: "center", 
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow 
                key={row.id} 
                className={styles.tableDataRow}
                sx={{ 
                  '&:nth-of-type(odd)': { backgroundColor: '#f1f5f9' },
                  '&:hover': { backgroundColor: '#e2e8f0' },
                  transition: 'background-color 0.2s'
                }}
              >
                <TableCell sx={{ textAlign: "center", padding: '16px' }}>
                  {row.column1}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: '16px' }}>
                  {row.column2}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: '16px' }}>
                  {row.column3}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: '16px' }}>
                  {row.column4}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: '16px' }}>
                  {row.column5}
                </TableCell>
                <TableCell sx={{ 
                  display: "flex", 
                  justifyContent: "center",
                  gap: '10px',
                  padding: '16px'
                }}>
                  <Button
                    variant="contained"
                    onClick={() => handleUpdateButton(row.column1)}
                    sx={{
                      backgroundColor: '#2563eb',
                      '&:hover': { backgroundColor: '#1d4ed8' }
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteButton(row.column1)}
                    sx={{
                      backgroundColor: '#dc2626',
                      '&:hover': { backgroundColor: '#b91c1c' }
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure you want to Detele this entry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default headerNavbarWrapper(WP);
