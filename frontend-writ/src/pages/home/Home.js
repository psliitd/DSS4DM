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
  const background = {
    backgroundImage: `url('/Telangana-State-Map.png')`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    minHeight: '100vh'
  };

  return (
    <div className={`${styles.homeHeader} row`} style={background}>
      <div className={`${styles.activitiesDiv} col-sm-7`}>
        <h3>Modules</h3>
        <div className="row">
          <div className={`${styles.option1} col-sm-4`}>
            <Link to="/user/wp" className={styles.linkLaw}>
              <div className={styles.boxOption1}>
                <img
                  className={styles.imageOption1}
                  src="/law.jpg"
                  alt="Meeting"
                />
                <p className={styles.textOption1}>Writ</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default headerNavbarWrapper(Home);
