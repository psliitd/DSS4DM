import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Form, Row, Col, Button } from "react-bootstrap";
import similar from "similar";
import Modal from "react-bootstrap/Modal";
import "./Law.css";
import styles from "./Law.module.css";
import {
  // TypeSelect,
  capitalizeFirstLetter,
  gatheringProperty,
  crimeProperty,
  calamityProperty,
  rallyProperty,
  epidemicProperty,
} from "./utils";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import moment from "moment";
import shadows from "@mui/material/styles/shadows";
import { getBaseUrl } from "../../utils";
import { headerNavbarWrapper } from "../../components/MainPage/headerNavbarWrapper";

const calamityTypes = [
  "floods",
  "drought",
  "earthquake",
  "forest fire",
  "cyclone",
  "landslide",
  "storm",
  "other",
  "all",
];
const crimeTypes = [
  "murder",
  "rape",
  "kidnapping",
  "loot",
  "robbery",
  "smuggling",
  "other",
  "all",
];
const gatheringTypes = [
  "religious",
  "political",
  "social",
  "protest",
  "government",
  "other",
  "all",
];
const rallyTypes = [
  "religious",
  "political",
  "social",
  "protest",
  "government",
  "other",
  "all",
];
const epidemicTypes = ["deadly", "seasonal", "infectious"];

const Law = () => {
  const lawSituationTypes = {
    crime: { options: crimeTypes, property: crimeProperty },
    calamity: { options: calamityTypes, property: calamityProperty },
    gathering: { options: gatheringTypes, property: gatheringProperty },
    rally: { options: rallyTypes, property: rallyProperty },
    epidemic: { options: epidemicTypes, property: epidemicProperty },
    all: { options: ["all"] },
  };
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState(0);
  const [modalType, setModalType] = useState("");
  const [situationFetched, setSituationFetched] = useState(0);
  const [situations, setSituations] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("all");
  const [situationType, setSituationType] = useState("all");
  const [selected, setSelected] = useState({});
  const [rangeValueMaxAttendance, setRangeValueMaxAttendance] = useState(100000);
  const [rangeValueMinAttendance, setRangeValueMinAttendance] = useState(0);
  const [rangeValueMaxInjured, setRangeValueMaxInjured] = useState(2000);
  const [rangeValueMinInjured, setRangeValueMinInjured] = useState(0);
  const [rangeValueMaxPolice, setRangeValueMaxPolice] = useState(1000);
  const [rangeValueMinPolice, setRangeValueMinPolice] = useState(0);
  const [rangeValueMaxAmbulance, setRangeValueMaxAmbulance] = useState(30);
  const [rangeValueMinAmbulance, setRangeValueMinAmbulance] = useState(0);
  const a = new Date();
  a.setFullYear(a.getFullYear() - 1);
  console.log(a.toISOString());
  const [startDate, setStartDate] = useState(a.toISOString().substring(0, 10));
  a.setFullYear(a.getFullYear() + 2);
  const [endDate, setEndDate] = useState(a.toISOString().substring(0, 10));
  const [show, setShow] = useState(0);
  const [combinedLessons, setCombinedLessons] = useState([]);
  // const [rangeValueMax, setRangeValueMax] = useState(300);
  const handleRangeChange = (event, option1, option2) => {
    // setRangeValue(parseInt(event.target.value));
    if (option2 === "ambulance") {
      option1 === "min"
        ? setRangeValueMinAmbulance(parseInt(event.target.value))
        : setRangeValueMaxAmbulance(parseInt(event.target.value));
    }
    if (option2 === "injured") {
      option1 === "min"
        ? setRangeValueMinInjured(parseInt(event.target.value))
        : setRangeValueMaxInjured(parseInt(event.target.value));
    }
    if (option2 === "police") {
      option1 === "min"
        ? setRangeValueMinPolice(parseInt(event.target.value))
        : setRangeValueMaxPolice(parseInt(event.target.value));
    }
    if (option2 === "attendance") {
      option1 === "min"
        ? setRangeValueMinAttendance(parseInt(event.target.value))
        : setRangeValueMaxAttendance(parseInt(event.target.value));
    }
    // option == "min"
    //   ? setRangeValueMin(parseInt(event.target.value))
    //   : setRangeValueMax(parseInt(event.target.value));
  };

  const handleStartDateChange = (event) => {
    console.log(event.target.value);
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  const handleOptionClick = (option) => {
    navigate("/user/law/add?type=" + option);
  };
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: "Bearer " + token,
    "Access-Control-Request-Method": "GET",
  };
  const getSituations = async (page_number = 1) => {
    // console.log(page);
    fetch(getBaseUrl() + "law/getSituations?page_number=" + page_number, {
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        // console.log(res.status);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setSituations(res.data.content);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => {
        console.log(err);
      });
    setSituationFetched(1);
  };
  const changePage = (page_number) => {
    if (page_number < 1 || page_number > totalPages) {
      return 0;
    } else {
      setPage(page_number);
      console.log(page);
      if (filtered) {
        filterSituations(page_number);
      } else {
        getSituations(page_number);
      }
    }
  };
  // console.log(situationType);
  const filterSituations = (page_number) => {
    const formData = new FormData();
    formData.append("ambulance-max", rangeValueMaxAmbulance);
    formData.append("police-max", rangeValueMaxPolice);
    formData.append("injured-max", rangeValueMaxInjured);
    formData.append("attendance-max", rangeValueMaxAttendance);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("attendance-min", rangeValueMinAttendance);
    formData.append("police-min", rangeValueMinPolice);
    formData.append("injured-min", rangeValueMinInjured);
    formData.append("ambulance-min", rangeValueMinAmbulance);
    formData.append("situationType", situationType);
    formData.append("type", type);
    setPage(1);
    fetch(getBaseUrl() + "law/getSituations?page_number=" + page_number, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.success) {
          console.log(res);
          setSituations(res.data.content);
          setTotalPages(res.data.total_pages);
          console.log("In The response!");
          setFiltered(1);
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (situationFetched === 0) {
      getSituations();
    }
    // setSituationFetched(1);
  });
  const closeModal = (e) => {
    setShow(0);
  };
  const getCombinedLesson = (e) => {
    const formData = new FormData();
    formData.append("ambulance-max", rangeValueMaxAmbulance);
    formData.append("police-max", rangeValueMaxPolice);
    formData.append("injured-max", rangeValueMaxInjured);
    formData.append("attendance-max", rangeValueMaxAttendance);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("attendance-min", rangeValueMinAttendance);
    formData.append("police-min", rangeValueMinPolice);
    formData.append("injured-min", rangeValueMinInjured);
    formData.append("ambulance-min", rangeValueMinAmbulance);
    formData.append("situationType", situationType);
    formData.append("type", type);
    setPage(1);
    fetch(getBaseUrl() + "law/getCombined", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.success) {
          console.log(res);
          setCombinedLessons(res.data);
          console.log(res.data);
          // setTotalPages(res.data.total_pages);
          // console.log("In The response!");
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    showModal(e, {}, "combined");
  };
  const getInitialState = () => {
    setSituationType("all");
    setType("");
    setRangeValueMinAttendance(0);
    setRangeValueMaxAttendance(100000);
    setRangeValueMinInjured(0);
    setRangeValueMaxInjured(2000);
    setStartDate("");
    setEndDate("");
    setRangeValueMinPolice(0);
    setRangeValueMaxPolice(1000);
    setRangeValueMinAmbulance(0);
    setRangeValueMaxAmbulance(30);
  };

  const showModal = (e, item, type) => {
    setModalType(type);
    if (type != "combined") {
      const a = [];
      situations.map((item) => {
        item.lesson_learnt.map((item2) => {
          a.push(item2);
        });
      });
      // console.log(similar("i am okay", "i am fine"));

      setSelected(item);
      console.log(selected);
    }
    setShow(!show);
  };
  return (
    <div className={`${styles.mainDiv} row`}>
      {show && modalType != "combined" ? (
        <div style={{ width: "60%" }}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title style={{ marginTop: "20px" }} className="col-sm-12">
                <h2> {selected.title}</h2>
              </Modal.Title>
              <span style={{ fontWeight: "600", fontSize: "20px" }}>
                {capitalizeFirstLetter(selected.type)}
              </span>
            </Modal.Header>
            {/* <button onClick={showModal}>Close</button> */}

            <Modal.Body style={{ marginTop: "20px" }}>
              <h5 style={{ marginTop: "20px" }}>
                Police Persons: {selected.police}
              </h5>
              <h5 style={{ marginTop: "20px" }}>
                Number Of Ambulance: {selected.ambulance}
              </h5>
              <h5 style={{ marginTop: "20px" }}>
                Scheduled Date: {moment(selected.date_time).format("ll")}
              </h5>
              <h5 style={{ marginTop: "20px" }}>
                {selected.location && `Location: ${selected.location}`}
              </h5>
              <h4 style={{ marginTop: "20px" }}>Lessons' Learnt</h4>
              <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                {selected.lesson_learnt.map((item2, idx) => {
                  return (
                    <p>
                      {idx + 1}) {item2}
                    </p>
                  );
                })}
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                style={{ marginRight: "30px" }}
                onClick={showModal}
              >
                Close
              </Button>
              {/* <Button variant="primary">Save changes</Button> */}
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      ) : (
        <>
          <div className="row col-sm-6 mt-4">
            {/* Seach And Create */}
            <div className="row">
              <div className="col-sm-3">
                <DropdownButton variant="light" size={"lg"} title="Create New">
                  <Dropdown.Item onClick={() => handleOptionClick("crime")}>
                    Crime
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOptionClick("rally")}>
                    Rally
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOptionClick("gathering")}>
                    Gathering
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOptionClick("calamity")}>
                    Calamity
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOptionClick("epidemic")}>
                    Epidemic
                  </Dropdown.Item>
                </DropdownButton>
              </div>
              <div className="col-sm-9">
                <div style={{ display: "flex", height: "100%" }}>
                  <input
                    name="search"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px 0px 0px 10px",
                      borderTop: "1px solid #afafaf",
                    }}
                  ></input>
                  <button
                    style={{
                      background: "rgb(9,5,135)",
                      border: "none",
                      color: "white",
                      padding: "10px",
                      borderRadius: "0px 10px 10px 0px",
                      width: "100px",
                      fontSize: "20px",
                    }}
                  >
                    search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ width: "100%" }}>
            <div
              className="col-sm-7 mt-4"
              style={{
                // background: "blue",
                height: "75vh",
              }}
            >
              {modalType != "combined" || show == 0 ? (
                <>
                  <div className="col-sm-11">
                    <h5>Recent Events</h5>
                    {situations &&
                      situations.map((item, idx) => {
                        // console.log(item);
                        const color_dict = {
                          crime: "red",
                          rally: "yellow",
                          epidemic: "blue",
                          calamity: "brown",
                          gathering: "orange",
                        };
                        const color =
                          "10px solid " + color_dict[item.situationType];
                        return (
                          <div
                            onClick={(e) => showModal(e, item)}
                            className="row"
                            style={{
                              width: "100%",
                              margin: "30px",
                              height: "12vh",
                              boxShadow: "0px 0px 10px #afafaf",
                              borderRadius: "10px",
                              objectFit: "contain",
                              overflow: "hidden",
                              padding: "10px 10px",
                              borderLeft: color,
                            }}
                          >
                            <div
                              className="col-sm-7"
                              style={{
                                height: "28px",
                                fontSize: "25px",
                                fontWeight: "500",
                                margin: "0px",
                              }}
                            >
                              {item.title}
                            </div>
                            <div
                              className="col-sm-5"
                              style={{
                                height: "28px",
                                fontSize: "20px",
                                margin: "0px",
                              }}
                            >
                              <span style={{ fontWeight: "500" }}>
                                {capitalizeFirstLetter(item.situationType)}
                              </span>
                              <span style={{ marginLeft: "20px" }}>
                                {capitalizeFirstLetter(item.type)}
                              </span>
                            </div>
                            <div
                              className="col-sm-12"
                              style={{
                                margin: "0px",
                                padding: "0px 12px",
                                height: "70%",
                              }}
                            >
                              {moment(item.date_time || item.start_date).format(
                                "ll"
                              )}
                              {item &&
                                item.lesson_learnt.map((lessons, idx) => {
                                  return (
                                    <p style={{ margin: "4px" }}>{lessons}</p>
                                  );
                                })}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div
                    className="col-sm-8"
                    style={{
                      paddingLeft: "30px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={(e) => changePage(page - 1)}
                      style={{ border: "none", background: "none" }}
                    >
                      <AiOutlineLeft size={20} />
                    </button>
                    <span style={{ fontSize: "20px" }}>{page}</span>
                    <button
                      onClick={(e) => changePage(page + 1)}
                      style={{ border: "none", background: "none" }}
                    >
                      <AiOutlineRight size={20} />
                    </button>
                    <span>Total Pages:{totalPages} </span>
                  </div>
                </>
              ) : (
                <>
                  {/* <div className="row col-sm-1">
                  hi
                </div> */}
                  <div className="row col-sm-11">
                    <Modal.Dialog
                      style={{ padding: "0px", marginLeft: "20px" }}
                    >
                      <Modal.Header>
                        <Modal.Title
                          style={{ marginTop: "20px" }}
                          className="col-sm-12"
                        >
                          <h2> Combined Lesson Learnt</h2>
                        </Modal.Title>
                        <span style={{ fontWeight: "600", fontSize: "20px" }}>
                          {/* {capitalizeFirstLetter(selected.type)/} */}
                        </span>
                      </Modal.Header>
                      {/* <button onClick={showModal}>Close</button> */}

                      <Modal.Body style={{ marginTop: "20px" }}>
                        {combinedLessons.map((item) => {
                          console.log(item);
                          return <p>{item}</p>;
                        })}
                      </Modal.Body>

                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          style={{ marginRight: "30px" }}
                          onClick={(e) => closeModal(e)}
                        >
                          Close
                        </Button>
                        <Button variant="primary">Save changes</Button>
                      </Modal.Footer>
                    </Modal.Dialog>
                  </div>
                </>
              )}
            </div>
            <div className="col-sm-5 mt-4">
              <div className="row" style={{ width: "100%", display: "flex" }}>
                <h4>Filters</h4>
                <div className="col-sm-12 mt-4">
                  <Row className="mb-3">
                    <Form.Group>
                      <div className="row">
                        <h5 className="col-sm-4">Type</h5>
                        <div className="col-sm-4">
                          <span></span>
                          <Form.Select
                            value={situationType}
                            onChange={(e) => setSituationType(e.target.value)}
                          >
                            <option value={"all"} key={-1}>
                              All
                            </option>
                            {Object.entries(lawSituationTypes).map(
                              (item, key) => {
                                return (
                                  <option value={item[0]} key={key}>
                                    {capitalizeFirstLetter(item[0])}
                                  </option>
                                );
                              }
                            )}
                          </Form.Select>
                        </div>
                        <div className="col-sm-4">
                          <Form.Select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                          >
                            {lawSituationTypes[situationType].options.map(
                              (item) => {
                                // console.log(item);
                                return (
                                  <option value={item}>
                                    {capitalizeFirstLetter(item)}
                                  </option>
                                );
                              }
                            )}
                          </Form.Select>
                        </div>
                      </div>
                    </Form.Group>
                  </Row>
                  <Row className="mb-2">
                    <Form.Group as={Col} className="row" controlId="formRange">
                      <div className="row">
                        <h5 className="col-sm-4">Attendance</h5>
                        <div className="col-sm-4">
                          <Form.Control
                            type="range"
                            min="0"
                            max="100000"
                            value={rangeValueMinAttendance}
                            step="500"
                            onChange={(e) =>
                              handleRangeChange(e, "min", "attendance")
                            }
                          />

                          <Form.Text>
                            {" "}
                            <span>Min</span> Value: {rangeValueMinAttendance}
                          </Form.Text>
                        </div>
                        <div className="col-sm-4">
                          {/* <Form.Label>Max</Form.Label> */}
                          <Form.Control
                            type="range"
                            min="0"
                            max="100000"
                            value={rangeValueMaxAttendance}
                            step="500"
                            onChange={(e) =>
                              handleRangeChange(e, "max", "attendance")
                            }
                          />
                          <Form.Text>
                            <span>Max</span> Value: {rangeValueMaxAttendance}
                          </Form.Text>
                        </div>
                      </div>
                    </Form.Group>
                  </Row>
                  <Row className="mb-2">
                    <Form.Group as={Col} className="row" controlId="formRange">
                      <div className="row">
                        <h5 className="col-sm-4">Injured</h5>
                        <div className="col-sm-4">
                          <Form.Control
                            type="range"
                            min="0"
                            max="2000"
                            value={rangeValueMinInjured}
                            step="10"
                            onChange={(e) =>
                              handleRangeChange(e, "min", "injured")
                            }
                          />

                          <Form.Text>
                            {" "}
                            <span>Min</span> Value: {rangeValueMinInjured}
                          </Form.Text>
                        </div>
                        <div className="col-sm-4">
                          {/* <Form.Label>Max</Form.Label> */}
                          <Form.Control
                            type="range"
                            min="0"
                            max="2000"
                            value={rangeValueMaxInjured}
                            step="10"
                            onChange={(e) =>
                              handleRangeChange(e, "max", "injured")
                            }
                          />
                          <Form.Text>
                            <span>Max</span> Value: {rangeValueMaxInjured}
                          </Form.Text>
                        </div>
                      </div>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formStartDate">
                      <div className="row">
                        <h5 className="col-sm-4">Date</h5>
                        <div className="col-sm-4">
                          <Form.Label>Start Date:</Form.Label>
                          <Form.Control
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                          />
                        </div>
                        <div className="col-sm-4">
                          <Form.Label>End Date:</Form.Label>
                          <Form.Control
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                          />
                        </div>
                      </div>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="row" controlId="formRange">
                      <div className="row">
                        <h5 className="col-sm-4">Police</h5>
                        <div className="col-sm-4">
                          <Form.Control
                            type="range"
                            min="0"
                            max="1000"
                            value={rangeValueMinPolice}
                            onChange={(e) =>
                              handleRangeChange(e, "min", "police")
                            }
                          />

                          <Form.Text>
                            {" "}
                            <span>Min</span> Value: {rangeValueMinPolice}
                          </Form.Text>
                        </div>
                        <div className="col-sm-4">
                          {/* <Form.Label>Max</Form.Label> */}
                          <Form.Control
                            type="range"
                            min="0"
                            max="1000"
                            value={rangeValueMaxPolice}
                            onChange={(e) =>
                              handleRangeChange(e, "max", "police")
                            }
                          />
                          <Form.Text>
                            <span>Max</span> Value: {rangeValueMaxPolice}
                          </Form.Text>
                        </div>
                      </div>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="row" controlId="formRange">
                      <div className="row">
                        <h5 className="col-sm-4">Ambulance</h5>
                        <div className="col-sm-4">
                          <Form.Control
                            type="range"
                            min="0"
                            max="30"
                            value={rangeValueMinAmbulance}
                            onChange={(e) =>
                              handleRangeChange(e, "min", "ambulance")
                            }
                          />

                          <Form.Text>
                            {" "}
                            <span>Min</span> Value: {rangeValueMinAmbulance}
                          </Form.Text>
                        </div>
                        <div className="col-sm-4">
                          {/* <Form.Label>Max</Form.Label> */}
                          <Form.Control
                            type="range"
                            min="0"
                            max="30"
                            value={rangeValueMaxAmbulance}
                            onChange={(e) =>
                              handleRangeChange(e, "max", "ambulance")
                            }
                          />
                          <Form.Text>
                            <span>Max</span> Value: {rangeValueMaxAmbulance}
                          </Form.Text>
                        </div>
                      </div>
                    </Form.Group>
                  </Row>
                </div>
                <div className="col-sm-6 mt-4">
                  <button
                    style={{
                      background: "rgb(9,5,135)",
                      border: "none",
                      color: "white",
                      padding: "10px",
                      borderRadius: "10px",
                      width: "100%",
                      fontSize: "20px",
                    }}
                    onClick={filterSituations}
                  >
                    Filter Results
                  </button>
                </div>
                <div className="col-sm-6 mt-4">
                  <button
                    style={{
                      background: "rgb(9,5,135)",
                      border: "none",
                      color: "white",
                      padding: "10px",
                      borderRadius: "10px",
                      width: "100%",
                      fontSize: "20px",
                    }}
                    onClick={getInitialState}
                  >
                    Clear Filter
                  </button>
                </div>
                <div className="col-sm-12 mt-4">
                  <button
                    style={{
                      background: "rgb(9,5,135)",
                      border: "none",
                      color: "white",
                      padding: "10px",
                      borderRadius: "10px",
                      width: "100%",
                      fontSize: "20px",
                    }}
                    onClick={getCombinedLesson}
                  >
                    Get Combined Lesson Learnt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default headerNavbarWrapper(Law);
