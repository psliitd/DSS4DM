import React, { useEffect, useState } from "react";
// import { 'http://localhost:8000/' } from "../../utils";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Pagination from "@mui/material/Pagination";
import Button from "react-bootstrap/Button";
import Skeleton from "@mui/material/Skeleton";
import { ComplianceDetail } from "./ComplianceDetail";

import { CreateCompliance } from "./CreateCompliance";
import { getBaseUrl } from "../../utils";

import styles from "./compliance.module.css";
import { headerNavbarWrapper } from "../../components/MainPage/headerNavbarWrapper";

const Compliance = () => {
  const [assignedTo, setAssignedTo] = useState([]);
  const [assignedBy, setAssignedBy] = useState([]);
  const [show, setShow] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [doableId, setDoableId] = useState();
  const [doableSubject, setDoableSubject] = useState();
  const [doableType, setDoableType] = useState();
  const [deadline, setDoableDeadline] = useState();
  const [selected, setSelected] = useState(-1);
  const [selected1, setSelected1] = useState(-1);
  const [showModal, setShowModal] = useState(0);
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [numPage1, setNumPage1] = useState(1);
  const [numPage2, setNumPage2] = useState(1);
  const [loading1, setLoading1] = useState(1);
  const [loading2, setLoading2] = useState(1);
  const handleClose = (val) => {
    setShowModal(0);
    if (val == 1) {
    }
  };
  const handleShow = () => setShowModal(1);
  const handleChange1 = (e, value) => {
    console.log(value);
    setLoading1(1);
    setPage1(value);
    fetch(
      getBaseUrl() +
        "compliance/getAllCompliance?page1=" +
        value +
        "&page2=" +
        page2,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        const a = data.data.content;
        a.sort(function (x, y) {
          if (x.completed < y.completed) return -1;
          else if (x.completed > y.completed) return 1;
          else {
            if (x.priority >= y.priority) return -1;
            else return 1;
          }
        });
        setAssignedBy(a);
        setLoading1(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange2 = (e, value) => {
    setPage2(value);
    fetch(
      getBaseUrl() +
        "compliance/getAllCompliance?page1=" +
        page1 +
        "&page2=" +
        value,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        const b = data.assignedTo;
        b.sort(function (x, y) {
          if (x.completed < y.completed) return -1;
          else if (x.completed > y.completed) return 1;
          else {
            if (x.priority >= y.priority) return -1;
            else return 1;
          }
        });
        setAssignedTo(b);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const refreshCompliance = () => {
    fetch(getBaseUrl() + "compliance/getAllCompliance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        const a = data.data.content;
        setNumPage1(data.data.total_pages);
        setNumPage2(data.data.total_pages);
        a.sort(function (x, y) {
          if (x.completed < y.completed) return -1;
          else if (x.completed > y.completed) return 1;
          else {
            if (x.priority >= y.priority) return -1;
            else return 1;
          }
        });
        const b = data.data.content;
        b.sort(function (x, y) {
          if (x.completed < y.completed) return -1;
          else if (x.completed > y.completed) return 1;
          else {
            if (x.priority >= y.priority) return -1;
            else return 1;
          }
        });
        setAssignedBy(a);
        setLoading1(0);
        setAssignedTo(b);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetch(getBaseUrl() + "compliance/getAllCompliance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        const a = data.data.content;
        setNumPage1(data.data.total_pages);
        setNumPage2(data.data.total_pages);
        a.sort(function (x, y) {
          if (x.completed < y.completed) return -1;
          else if (x.completed > y.completed) return 1;
          else {
            if (x.priority >= y.priority) return -1;
            else return 1;
          }
        });
        const b = data.data.content;
        b.sort(function (x, y) {
          if (x.completed < y.completed) return -1;
          else if (x.completed > y.completed) return 1;
          else {
            if (x.priority >= y.priority) return -1;
            else return 1;
          }
        });
        setAssignedBy(a);
        setLoading1(0);
        setAssignedTo(b);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showCompliance = (item, index, num) => {
    console.log(item);
    if (selected == index) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (selected1 == index) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (num == 1) {
      setSelected(-1);
      setSelected1(index);
    } else {
      setSelected1(-1);
      setSelected(index);
    }
    setDoableId(item.compliance_id);
    setDoableSubject(item.description);
    setDoableType(0);
    setDoableDeadline(7);
    setCompleted(item.completed);
    console.log(item);
    setShow(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <div className={styles.complianceContainer}>
        <div>
          <h2>Compliance</h2>
        </div>
        <Button className={styles.assignDoables} onClick={handleShow}>
          {" "}
          Assign Doable{" "}
        </Button>
      </div>
      {showModal ? (
        <CreateCompliance
          handleClose={handleClose}
          refreshCompliance={refreshCompliance}
          showModal={showModal}
        />
      ) : (
        <></>
      )}
      {show ? (
        <ComplianceDetail
          doableId={doableId}
          completed={completed}
          setSelected1={setSelected1}
          setSelected={setSelected}
          deadline={deadline}
          setShow={setShow}
          doableSubject={doableSubject}
          doableType={doableType}
        />
      ) : (
        <div className={styles.tableHeadings}>
          <h3>Total Doables Assigned By You: {assignedBy.length}</h3>
          <h3>Total Doables Assigned To You: {assignedTo.length}</h3>
        </div>
      )}
      <Row>
        <Col lg="6" style={{ padding: "0px 10px" }}>
          <table className="head" style={{ width: "100%" }}>
            <thead>
              <tr style={{ background: "#39CCCC", color: "white" }}>
                <th className="tb">S.No</th>
                <th className="tb">subject</th>
                <th className="tb">Assigned To</th>
                <th className="tb">Deadline</th>
                <th className="tb">Status</th>
                <th className="tb">View</th>
                {/* <th className='tb'> Status</th> */}
                {/* <th style={{
                                    border: '1px solid #F4F4F4',
                                    padding: '10px'
                                }}>Misc</th> */}
              </tr>
            </thead>
            <>
              {loading1 ? (
                <>
                  <tr>
                    {[1, 2, 3, 4, 5, 6].map((item) => {
                      return (
                        <th className="tb">
                          <Skeleton />
                        </th>
                      );
                    })}
                  </tr>
                  <tr>
                    {[1, 2, 3, 4, 5, 6].map((item) => {
                      return (
                        <th className="tb">
                          <Skeleton />
                        </th>
                      );
                    })}
                  </tr>
                  <tr>
                    {[1, 2, 3, 4, 5, 6].map((item) => {
                      return (
                        <th className="tb">
                          <Skeleton />
                        </th>
                      );
                    })}
                  </tr>
                  <tr>
                    {[1, 2, 3, 4, 5, 6].map((item) => {
                      return (
                        <th className="tb">
                          <Skeleton />
                        </th>
                      );
                    })}
                  </tr>
                </>
              ) : (
                <>
                  {assignedBy &&
                    assignedBy.map((item, index) => {
                      // let bgColor = "white";
                      // let textColor = "black";
                      // if (index == selected) {
                      //   bgColor = "#076391";
                      //   textColor = "white";
                      // } else {
                      //   if (item.priority == 1) {
                      //     bgColor = "floralwhite";
                      //   } else if (item.priority == 2) {
                      //     bgColor = "moccasin";
                      //   } else if (item.priority == 3) {
                      //     bgColor = "lightcoral";
                      //   }
                      //   if (item.completed) {
                      //     bgColor = "#d9d9d9";
                      //     textColor = "#747474";
                      //   }
                      // }
                      // console.log(bgColor);
                        let styl = [styles.s1]; //default
                        if (index === selected) {
                          styl = [styles.s2];
                        }
                        else {
                          if(item.priority === 1) {
                            styl = [styles.s3];
                          }
                          else if(item.priority === 2) {
                            styl = [styles.s4];
                          }
                          else if(item.priority === 3) {
                            styl = [styles.s5];
                          }
                          if(item.completed) {
                            styl = [styles.s6];
                          }
                        }
                      return (
                        <>
                          {/* <tr style={{ background: bgColor, color: textColor }}> */}
                          <tr className={styl}>
                            <th className="tb">{index + 1}</th>
                            <th className="tb">{item.description}</th>
                            <th className="tb">Pallav Semwal</th>
                            <th className="tb">
                              {moment(item.deadline, "YYYY-MM-DD").format("ll")}
                            </th>
                            <th className="tb">
                              {item.completed ? (
                                <>Completed</>
                              ) : (
                                <>Not Completed</>
                              )}
                            </th>
                            <th className="tb">
                              <Button
                                onClick={(e) => showCompliance(item, index, 0)}
                                size="sm"
                                style={{
                                  background: "#39CCCC",
                                  border: "none",
                                }}
                              >
                                View
                              </Button>
                            </th>
                          </tr>
                        </>
                      );
                    })}
                </>
              )}
            </>
          </table>
          <Pagination
            style={{ marginTop: "20px" }}
            count={numPage1}
            page={page1}
            onChange={(e, val) => handleChange1(e, val)}
          />
        </Col>
        <Col lg="6" style={{ padding: "0px 10px" }}>
          <table className="head" style={{ width: "100%" }}>
            <thead>
              <tr style={{ background: "#39CCCC", color: "white" }}>
                <th className="tb">S.No</th>
                <th className="tb">subject</th>
                <th className="tb">Assigned By</th>
                <th className="tb">Deadline</th>
                <th className="tb">Status</th>
                <th className="tb">View</th>
                {/* <th className='tb'> Status</th> */}
                {/* <th style={{
                  border: '1px solid #F4F4F4',
                  padding: '10px'
                }}>Misc</th> */}
              </tr>
            </thead>
            {assignedTo.map((item, index) => {
              let bgColor = "white";
              let textColor = "black";
              if (index == selected1) {
                bgColor = "#076391";
                textColor = "white";
              } else {
                if (item.priority == 1) {
                  bgColor = "floralwhite";
                } else if (item.priority == 2) {
                  bgColor = "moccasin";
                } else if (item.priority == 3) {
                  bgColor = "lightcoral";
                }
                if (item.completed) {
                  bgColor = "#d9d9d9";
                  textColor = "#747474";
                }
              }
              return (
                <>
                  <tr style={{ background: bgColor, color: textColor }}>
                    <th className="tb">{index + 1}</th>
                    <th className="tb">
                      <Link
                        to={"/user/complianceDetail/" + item.doableId}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        {item.description}
                      </Link>
                    </th>
                    <th className="tb"> </th>
                    <th className="tb">
                      {moment(item.deadline, "YYYY-MM-DD").format("ll")}
                    </th>
                    <th className="tb">
                      {item.completed ? <>Completed</> : <>Not Completed</>}
                    </th>
                    <th className="tb">
                      <Button
                        onClick={(e) => showCompliance(item, index, 1)}
                        size="sm"
                        style={{ background: "#39CCCC", border: "none" }}
                      >
                        View
                      </Button>
                    </th>
                  </tr>
                </>
              );
            })}
          </table>
          <Pagination
            style={{ marginTop: "20px" }}
            count={numPage2}
            page={page2}
            onChange={handleChange2}
          />
        </Col>
      </Row>
    </div>
  );
};


export default headerNavbarWrapper(Compliance);