import React, { useState } from "react";
import { getBaseUrl } from "../../utils";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "@mui/material/Pagination";

import styles from "./Search.module.css"
import { headerNavbarWrapper } from "../../components/MainPage/headerNavbarWrapper";

const Search = () => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [dat, setDat] = useState([]);
  const [isAll, setIsAll] = useState(1);
  const [selected, setSelected] = useState(-1);
  const filter = ["awards", "research", "educational", "implemented"];
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [fetched, setFetched] = useState(0);
  const [loading, setLoading] = useState(0);
  const fetchSearch = async () => {
    setLoading(1);
    await fetch(getBaseUrl() + "search/searchEngine?q=" + q + "&page=1", {
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
        setDat(data.data.content);
        setTotalPages(data.data.total_pages);
        setLoading(0);
        setFetched(1);
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
      });
  };
  const handleChange1 = async (e, val) => {           //what happens when we click any paginator (page count on top right)
    setPage(val);
    setLoading(1);
    await fetch(getBaseUrl() + "search/searchEngine?q=" + q + "&page=" + val, {
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
        setDat(data.data.content);
        setTotalPages(data.data.total_pages);
        setLoading(0);
        setFetched(1);
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
      });
  };
  const selectFilter = (i) => {
    // console.log();
    setIsAll(0);
    const a = dat.filter((item) => item.extra_keyword == filter[i]);
    console.log(a);
    setSelected(i);
    setFilteredEvents(a);
  };
  const submitSearch = (e) => {
    console.log(e);
    e.preventDefault();
    fetchSearch();
  };
  const selectAll = (e) => {
    e.preventDefault();
    setIsAll(1);
    setSelected(-1);
  };

  return (
    <div>
      <h2>Search</h2>
      <form>
        <div className="row">
          <div className="col-sm-4">
            <input
              type="text"
              style={{ width: "100%" }}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <button onClick={(e) => submitSearch(e)}>Search</button>
          </div>
          <div className="col-sm-4">
            {fetched ? (
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, val) => handleChange1(e, val)}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </form>
      <div className="row"></div>
      <div
        className={`row ${styles.filterRow}`}>
        {isAll ? (
          <div
            className={`col-sm-2 ${styles.allBtnDivIsAll}`}>
            <button className={styles.allBtn} onClick={(e) => selectAll(e)}>
              All
            </button>
          </div>
        ) : (
          <div className={`col-sm-2 ${styles.allBtnDivNotIsAll}`}>
            <button className={styles.allBtn} onClick={(e) => selectAll(e)}>
              All
            </button>
          </div>
        )}

        {filter.map((item, idx) => {
          let style = "0px 10px 10px #afafaf";
          if (idx == selected) {
            style = "0px 10px 10px rgb(73 74 190)";
          }
          return (
            <div
              className="col-sm-2"
              style={{ boxShadow: style, borderRadius: "5px" }}
            >
              <button className={styles.filterBtns} onClick={(e) => selectFilter(idx)}>
                {item}
              </button>
            </div>
          );
        })}

        {/* <div className="col-sm-2" style={{ boxShadow: '0px 10px 10px #afafaf', height:'40px',borderRadius: '5px' }}>

          <button onClick={(e) => selectFilter(1)} style={{ border: 'none', background: 'none', paddingTop: '20px', fontWeight: '600', fontSize: '20px' }}>Research</button>
        </div>
        <div className="col-sm-2" style={{ boxShadow: '0px 10px 10px #afafaf', height:'40px',borderRadius: '5px' }}>

          <button onClick={(e) => selectFilter(2)} style={{ border: 'none', background: 'none', paddingTop: '20px', fontWeight: '600', fontSize: '20px' }}>Academic</button>
        </div>
        <div className="col-sm-2" style={{ boxShadow: '0px 10px 10px #afafaf', height:'40px',borderRadius: '5px' }}>
          <button onClick={(e) => selectFilter(3)} style={{ border: 'none', background: 'none', paddingTop: '20px', fontWeight: '600', fontSize: '20px' }}>Implemented</button>

        </div> */}
        {/* <div>{dat.length} Results Found</div> */}
        {loading ? (
          <div className="row" style={{ marginTop: "20px" }}>
            {" "}
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {isAll ? (
              <>
                {dat &&
                  dat.map((item) => {
                    return (
                      <div className="row" style={{ marginTop: "20px" }}>
                        <h4>
                          <a href={item.link} target="blank">
                            {item.title}
                          </a>
                        </h4>
                        <p>{item.body}</p>
                      </div>
                    );
                  })}
              </>
            ) : (
              <>
                {filteredEvents &&
                  filteredEvents.map((item) => {
                    return (
                      <div className="row hemang" style={{ marginTop: "20px" }}>
                        <h4>
                          <a href={item.link} target="blank">
                            {item.title}
                          </a>
                        </h4>
                        <p>{item.body}</p>
                      </div>
                    );
                  })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default headerNavbarWrapper(Search);