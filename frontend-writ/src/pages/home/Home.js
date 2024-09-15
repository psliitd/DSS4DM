import React, { useState, useEffect } from "react";
import { getBaseUrl } from "../../utils";
import styles from "./Home.module.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { headerNavbarWrapper } from "../../components/MainPage/headerNavbarWrapper";
const Home = () => {
  const [events, setEvents] = useState([
    // Meetings
    {
      id: 1,
      title: "Education Meeting-1",
      start: "2023-05-09T10:00:00",
      end: "2023-05-09T12:00:00",
      priority: "low",
      backgroundColor: "rgb(37,153,27)",
      border: "none",
    },
    {
      id: 2,
      title: "Development Meeting-2",
      start: "2023-05-09T14:00:00",
      end: "2023-05-09T16:00:00",
      priority: "medium",
      backgroundColor: "rgb(225,215,29)",
    },
    {
      id: 3,
      allDay: false,
      display: "block",
      title: "Health Meeting-3",
      start: "2023-05-09T08:00:00",
      end: "2023-05-09T10:00:00",
      priority: "high",
      backgroundColor: "rgb(178,17,33)",
    },
  ]);
  const [loading, setLoading] = useState(1);
  const [upcoming, setUpcoming] = useState([]);
  const [num, setNum] = useState(1);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setLoading(1);
    setPage(value);
    fetch(getBaseUrl() + "schedule/upcomingMeetings?limit=5&page1=" + value, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + localStorage.getItem("token"),
      },
    })
      .then((data) => {
        console.log(data);
        // console.log(data.result);
        return data.json();
      })
      .then((data) => {
        setLoading(0);
        setUpcoming(data.content);
        setNum(data.num_pages);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // console.log(localStorage);
    fetch(getBaseUrl() + "schedule/getFutureMeetings?page1=1&limit=5", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((data) => {
        // console.log(data);
        // console.log(data.result);
        return data.json();
      })
      .then((data) => {
        setLoading(0);
        setUpcoming(data.data.content);
        setNum(data.total_pages);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={`${styles.homeHeader} row`}>
      <div className={`${styles.activitiesDiv} col-sm-7`}>
        <h3>Activites</h3>
        <div className="row">
          <div className={`${styles.option1} col-sm-4`}>
            <Link to="/user/law" className={styles.linkLaw}>
              <div className={styles.boxOption1}>
                <img className={styles.imageOption1} src="/law.jpg" alt="Meeting"/>
                <p className={styles.textOption1}>Law And Order</p>
              </div>
            </Link>
          </div>
          <div className={`${styles.option2} col-sm-4`}>
            <Link to="/user/schedule" className={styles.linkSchedule}>
              <div className={styles.boxOption2}>
                <img className={styles.imageOption2} src="/schedule.jpg" alt="Meeting"/>
                <p className={styles.textOption2}>Schedule</p>
              </div>
            </Link>
          </div>
          <div className={`${styles.option3} col-sm-4`}>
            <Link to="/user/compliance" className={styles.linkCompliance}>
              <div className={styles.boxOption3}>
                <img className={styles.imageOption3} src="/compliance.webp" alt="Meeting"/>
                <p className={styles.textOption3}>Compliance</p>
              </div>
            </Link>
          </div>
          <div className={`${styles.option4} col-sm-4`}>
            <Link to="/user/search" className={styles.linkSearch}>
              <div className={styles.boxOption4}>
                <img className={styles.imageOption4} src="/search.jpg" alt="Meeting"/>
                <p className={styles.textOption4}>Samadhan</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${styles.UpcomingDiv} col-sm-5`}
        style={{ padding: "20px" }}
      >
        <div className="row">
          {/* <div className="col-sm-12">
            <h3>Calander</h3>
            <div style={{ width: "100%", height: "30vh", marginTop: "30px" }}>
              Monthly Calander Will Be here
            </div>
          </div> */}
          <div className="col-sm-12">
            <h3>Upcoming</h3>
            <div className="row">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {upcoming.map((item) => {
                  // let backgroundColor = "red";
                  // if (item.priority == 0) {
                  //   backgroundColor = "yellow";
                  // } else if (item.priority == 1) {
                  //   backgroundColor = "green";
                  // }
                  let backgroundColor = "#B31121";
                  if (item.priority == 1) {
                    backgroundColor = "#E1D71D";
                  } else if (item.priority == 2) {
                    backgroundColor = "#25991B";
                  }
                  return (
                    <div
                      style={{
                        color: "black",
                        background: backgroundColor,
                        height: "13vh",
                        width: "80%",
                        marginTop: "20px",
                        padding: "20px",
                        borderRadius: "10px",
                      }}
                    >
                      <p className="h4">{item.title}</p>
                      <p
                        style={{
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <span>{item.title} </span>
                        <span>
                          {moment(new Date(item.start_date_time)).format("lll")}
                        </span>
                        <span>
                          {item.priority == 0 ? (
                            <>LOW</>
                          ) : item.priority == 1 ? (
                            <>MEDIUM</>
                          ) : (
                            <>HIGH</>
                          )}
                        </span>
                      </p>
                    </div>
                  );
                })}
                {/* {events.map((item) => {
                  return (
                    <div
                      style={{
                        color: "black",
                        background: item.backgroundColor,
                        height: "13vh",
                        width: "80%",
                        marginTop: "20px",
                        padding: "20px",
                        borderRadius: "10px",
                      }}
                    >
                      <p className="h4">{item.title}</p>
                      <p
                        style={{
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <span>Test Description 1 </span>
                        <span>
                          {moment(new Date(item.start)).format("lll")}
                        </span>
                      </p>
                    </div>
                  );
                })} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default headerNavbarWrapper(Home);