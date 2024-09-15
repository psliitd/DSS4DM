import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { headerNavbarWrapper } from "../../components/MainPage/headerNavbarWrapper";
// import { useSearchParams } from "react-router-dom";
import {
  TypeSelect,
  crimeTypes,
  epidemicTypes,
  rallyTypes,
  gatheringTypes,
  calamityTypes,
  capitalizeFirstLetter,
  gatheringProperty,
  crimeProperty,
  calamityProperty,
  rallyProperty,
  epidemicProperty,
} from "./utils";
import { getBaseUrl } from "../../utils";

// export const [title, setTitle] = useState("");
// export const formDetails=()=>{}
const AddLawSituation = () => {
  const navigate = useNavigate();
  const url_location = useLocation();
  const queryParams = new URLSearchParams(url_location.search);
  const lawSituationTypes = {
    crime: { options: crimeTypes, property: crimeProperty },
    calamity: { options: calamityTypes, property: calamityProperty },
    gathering: { options: gatheringTypes, property: gatheringProperty },
    rally: { options: rallyTypes, property: rallyProperty },
    epidemic: { options: epidemicTypes, property: epidemicProperty },
  };
  // Extract the value of a specific query parameter
  const [situationType, setSituation] = useState(
    queryParams.get("type") || "gathering"
  );
  const [title, setTitle] = useState("");
  const [type, setType] = useState(lawSituationTypes[situationType].options[0]);
  const [police, setPolice] = useState(0);
  const [sentences, setSentences] = useState([]);
  const [attendance, setAttendance] = useState(0);
  const [injured, setInjured] = useState(0);
  const [infected, setInfected] = useState(0);
  const [ambulance, setAmbulance] = useState(0);
  const [total_cost, setTotalCost] = useState(0);
  const [dead, setDead] = useState(0);
  const [people_affected, setPeopleAffected] = useState(0);
  // console.log(moment().format());
  const [start_date, setStartDate] = useState(moment().format());
  const [end_date, setEndDate] = useState(new Date());
  const [ndrf, setNdrf] = useState(0);
  const [location, setLocation] = useState("1,26.2389° N,73.0243° E");
  const [start_location, setStartLocation] = useState(
    "1,26.2389° N,73.0243° E"
  );
  const [end_location, setEndLocation] = useState("1,26.2389° N,73.0243° E");
  const [date_time, setDateTime] = useState(moment().format());
  const [lesson_learnt, setLessonLearnt] = useState([]);
  const [crime_Location, setCrimeLocation] = useState("1,26.2389° N,73.0243° E");
  const [close, setClose] = useState(0);
  const [stationary, setStationary] = useState(1);
  const [fire_fighters, setFireFighters] = useState(0);
  const [duration, setDuration] = useState(0);

  const variables = {
    type: type,
    attendance: attendance,
    setAttendance: setAttendance,
    title: title,
    start_location: start_location,
    setStartLocation: setStartLocation,
    end_location: end_location,
    setEndLocation: setEndLocation,
    setTitle: setTitle,
    situationType: situationType,
    setSituation: setSituation,
    police: police,
    setPolice: setPolice,
    ambulance: ambulance,
    setAmbulance: setAmbulance,
    total_cost: total_cost,
    setTotalCost: setTotalCost,
    dead: dead,
    setDead: setDead,
    people_affected: people_affected,
    setPeopleAffected: setPeopleAffected,
    start_date: start_date,
    setStartDate: setStartDate,
    end_date: end_date,
    setEndDate: setEndDate,
    ndrf: ndrf,
    setNdrf: setNdrf,
    location: location,
    setLocation: setLocation,
    date_time: date_time,
    setDateTime: setDateTime,
    lesson_learnt: lesson_learnt,
    setLessonLearnt: setLessonLearnt,
    crime_Location: crime_Location,
    setCrimeLocation: setCrimeLocation,
    close: close,
    setClose: setClose,
    stationary: stationary,
    setStationary: setStationary,
    fire_fighters: fire_fighters,
    setFireFighters: setFireFighters,
    duration: duration,
    setDuration: setDuration,
    injured: injured,
    setInjured: setInjured,
    infected: infected,
    setInfected: setInfected,
  };

  // console.log(variables.title);
  const handleCheck = (e) => {
    setClose(e.target.checked);
  };

  const addSituation = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    lawSituationTypes[situationType].property.map((item) => {
      if (item.name == "lesson_learnt") {
        formData.append(item.name, sentences);
      } else {
        formData.append(item.name, variables[item.name]);
      }
    });
    formData.append("situationType", situationType);
    fetch(getBaseUrl() + "law/addSituation", {
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
          navigate("/user/law");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(setType);
  const changeValue = (e, item) => {
    // console.log(e.target.value);
    // if (item.name == "total_cost") {
    //   setTotalCost(e.target.value);
    // }
    // if (item.name == "police") {
    //   setPoilce(e.target.value);
    // }
    if (item.name.toLowerCase().includes("location")) {
      setLocation(e.target.value); 
    }
    if (item.name == "date_time") {
      setDateTime(e.target.value);
    } else {
      variables[item.setter](e.target.value);
    }
    if (item.name == "situationType") {
      // console.log(lawSituationTypes[e.target.value].options[0]);
      setType(lawSituationTypes[e.target.value].options[0]);
    }
    if (item.name == "lesson_learnt") {
      const lines = e.target.value.split("\n");
      const input_sentences = [];
      lines.map((item, idx) => {
        item.split(".").map((item2, idx) => {
          const sentence = item2.trim();
          if (sentence != "") {
            input_sentences.push(sentence);
          }
        });
      });
      // console.log(input_sentences);
      setSentences(input_sentences);
    }
  };
  // console.log(lawSituationTypes[situationType].options);
  return (
    <div>
      <div className="row mt-3">
        <h3>Add Law Situation</h3>
      </div>
      <form className="row" onSubmit={addSituation}>
        {/* <input type='select'>
      </input> */}
        <div
          className="col-sm-6"
          style={{
            padding: "20px 20px 20px 20px",
            marginTop: "20px",
            objectFit: "contain",
            height: "70vh",
          }}
        >
          <div className="row">
            <div className="col-sm-6">
              <Form.Label>Situation Type</Form.Label>
              <Form.Select
                // disabled={queryParams.get("type") != null}
                size="md"
                value={situationType}
                onChange={(e) =>
                  changeValue(e, {
                    name: "situationType",
                    setter: "setSituation",
                  })
                }
              >
                {Object.entries(lawSituationTypes).map((item, key) => {
                  // console.log(item[0]);
                  return (
                    <option value={item[0]} key={key}>
                      {capitalizeFirstLetter(item[0])}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="col-sm-6">
              <Form.Label>Type</Form.Label>
              <TypeSelect
                options={lawSituationTypes[situationType].options}
                valueSetter={setType}
              />
            </div>
            {lawSituationTypes[situationType].property.map((item, idx) => {
              switch (item.as) {
                case "input":
                  if (situationType === "crime" && item.name === "crime Location") {
                    return (
                      <div className="col-sm-6">
                        <Form.Label style={{ marginTop: "20px" }}>
                          {capitalizeFirstLetter("location".replaceAll("_", " "))}
                        </Form.Label>
                        <Form.Control
                          onChange={(e) => changeValue(e, item)}
                          as={item.as}
                          isInvalid={!/\S/.test(variables[item.name])}
                          value={crime_Location} 
                          type={item.type}
                          rows={25}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div className="col-sm-6">
                        <Form.Label style={{ marginTop: "20px" }}>
                          {capitalizeFirstLetter(item.name.replaceAll("_", " "))}
                        </Form.Label>
                        <Form.Control
                          onChange={(e) => changeValue(e, item)}
                          as={item.as}
                          isInvalid={!/\S/.test(variables[item.name])}
                          value={variables[item.name]}
                          type={item.type}
                          rows={25}
                        />
                        {item.name === "title" ? (
                          <Form.Control.Feedback type="invalid">
                            Should Not Be Empty
                          </Form.Control.Feedback>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  }
                case "check":
                  return (
                    <div className="col-sm-12" style={{ marginLeft: "0px" }}>
                      <Form.Check
                        type="switch"
                        id="close-switch"
                        label={capitalizeFirstLetter(
                          item.name.replaceAll("_", " ")
                        )}
                        style={{ marginTop: "20px" }}
                        checked={close}
                        onChange={handleCheck}
                      />
                    </div>
                  );
              }
            })}
          </div>
        </div>
        <div className="col-sm-6" style={{ padding: "20px" }}>
          <Form.Label>Lessons Learned</Form.Label>
          <p style={{ fontSize: "small" }}>
            Enter Each sentence and end each sentence with 'ENTER' or '.'
          </p>
          <Form.Control
            as="textarea"
            value={lesson_learnt}
            isInvalid={!/\S/.test(lesson_learnt)}
            onChange={(e) =>
              changeValue(e, {
                name: "lesson_learnt",
                setter: "setLessonLearnt",
              })
            }
            rows={15}
            
          />
          <Form.Control.Feedback type="invalid">
            Should Not be Empty
          </Form.Control.Feedback>
        </div>
        <div
          className="col-sm-3"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            style={{
              width: "200px",
              marginTop: "20px",
              borderRadius: "5px",
              border: "none",
              padding: "10px",
              background: "rgb(5,9,135)",
              color: "white",
              fontSize: "21px",
            }}
            disabled={lesson_learnt == "" || title == ""}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default headerNavbarWrapper(AddLawSituation);