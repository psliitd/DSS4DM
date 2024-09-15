import React from "react";
import Form from "react-bootstrap/Form";
import { useEffect, useState, useRef } from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { firebaseConfig } from "../../utils";
import moment from "moment-timezone";
import { Row, Col } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { CircleLoader } from "react-spinners";
import ProgressBar from "react-bootstrap/ProgressBar";

// import CancelIcon from '@mui/icons-material/Cancel';
import CloseButton from "react-bootstrap/CloseButton";
import { getBaseUrl } from "../../utils";
import { useNavigate } from "react-router-dom";

export const CreateCompliance = (props) => {
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();
  const [participants, setparticipants] = useState([]);
  const [member, setMember] = useState();
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState(
    moment().add(15, "days").format("YYYY-MM-DD")
  );
  const [reminderPeriod, setReminderPeriod] = useState(7);
  const [relatedDocument, setRelatedDocument] = useState([]);
  const [file, setFile] = useState([]);
  const uploadFileRef = useRef();
  const [loading, setLoading] = useState(1);
  const [relatedDocumentLink, setRelatedDocumentLink] = useState([]);
  const [priority, setPriority] = useState();
  const [loadingCreate, setLoadingCreate] = useState(0);
  const priorities = [
    { key: "1", label: "LOW" },
    { key: "2", label: "NORMAL" },
    { key: "3", label: "HIGH" },
  ];
  const changeSubject = (e) => {
    setSubject(e.target.value);
  };
  const addFile = (e) => {
    e.preventDefault();
    const a = relatedDocument;
    if (e.target.files[0]) {
      // IF THERE ARE FILES TO BE UPLOADED
      var pendingFiles = [...file];
      for (let i = 0; i < e.target.files.length; i++) {
        console.log(e.target.files[i]); // DISPLAYS EACH FILE
        a.push(e.target.files[i]);
        pendingFiles.push(e.target.files[i].name);
        uploadDocument(e.target.files[i]);
      }
      setRelatedDocument(a);
      setFile(pendingFiles);
    }
  };
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const uploadDocument = (f) => {
    const storageRef = ref(storage, "/doableRelatedDocuments/" + f.name);
    console.log(storageRef);
    const uploadTask = uploadBytesResumable(storageRef, f);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        // console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case "paused":
            // console.log('Upload is paused');
            break;
          case "running":
            // console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("done");
          const a = relatedDocumentLink;
          a.push(downloadURL);
          setRelatedDocumentLink(a);
          alert("document Uploaded");
        });
      }
    );
  };

  const BrowseFile = () => {
    return (
      <>
        <label>
          Upload
          <input
            type="file"
            onChange={(e) => addFile(e)}
            accept=".jpeg, .png, .jpg, .pdf"
            ref={uploadFileRef}
            multiple
          />
        </label>
      </>
    );
  };

  const removeFile = (i) => {
    setFile([...file.filter((_, index) => index !== i)]);
    setRelatedDocument([...relatedDocument.filter((_, index) => index !== i)]);
  };

  const changeDeadline = (e) => {
    console.log(moment().add(7, "days").format("YYYY-MM-DD"));
    // console.log(Date.now());
    setDeadline(e.target.value);
  };
  const change = (e) => {
    setMember(e);
  };
  const createDoable = (e) => {
    e.preventDefault();
    setLoadingCreate(1);
    // relatedDocument.map((item) => {
    //   uploadDocument(item);
    // })
    const obj = {};
    obj["reminder_period"] = reminderPeriod;
    obj["assignedTo"] = member.key;
    obj["subject"] = subject;
    obj["priority"] = priority.key;
    obj["doableType"] = "compliance";
    obj["deadline"] = deadline;
    obj["relatedDocumentLink"] = relatedDocumentLink;
    fetch(getBaseUrl() + "compliance/createCompliance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(obj),
    })
      .then((data) => {
        setLoadingCreate(0);
        return data.json();
      })
      .then((data) => {
        if (data.success) {
          console.log(data);
          // navigate("/user/compliance");
          props.handleClose();
          props.refreshCompliance();
        } else {
          console.log(data);
          console.log("ERROR!");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    console.log(localStorage);
    fetch(getBaseUrl() + "user/getUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((data) => {
        // console.log(data.json());
        return data.json();
      })
      .then((data) => {
        // setDepartment(data.departments);
        // console.log(upcoming);
        const val = [];
        data.data.map((item) => {
          // console.log(item.model);
          val.push({
            label: item.first_name + " " + item.last_name,
            key: item.id,
          });
        });
        setparticipants(val);
        setLoading(0);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {loadingCreate ? (
        <center>
          <CircleLoader />
        </center>
      ) : (
        <div style={{ boxShadow: "0px 3px 6px 4px #bbb", margin: "10px 0px" }}>
          <div
            style={{
              justifyContent: "space-between",
              background: "#49c9ba",
              color: "white",
              padding: "10px",
              display: "flex",
            }}
          >
            <span>Assign Doable </span>
            <div>
              <CloseButton
                variant="white"
                onClick={(e) => props.handleClose(e)}
              />
            </div>
          </div>
          <div style={{ padding: "20px" }}>
            {/* <Form.Control placeholder='Subject/Message' type='text' /> */}
            <Select
              name="Member"
              type="text"
              placeholder={loading ? "Member Loading..." : "Assign To"}
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={participants}
              value={member}
              onChange={change}
            />

            <Row className="mt-3">
              <Form.Label>Subject:</Form.Label>
              <Col>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px", borderColor: "grey" }}
                  value={subject}
                  placeholder="Subject/Message"
                  onChange={changeSubject}
                />
              </Col>
            </Row>
            <Row className="mt-3" style={{ justifyContent: "space-between" }}>
              <Col md="6">
                <Row>
                  <Col md="3">
                    <Form.Label>Deadline:</Form.Label>
                  </Col>
                  <Col md="6">
                    <Form.Control
                      type="date"
                      value={deadline}
                      onChange={changeDeadline}
                    />
                  </Col>
                  <Col md="3">
                    <Select
                      name="priority"
                      type="text"
                      placeholder={"Priority"}
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={priorities}
                      value={priority}
                      onChange={(e) => setPriority(e)}
                    />
                  </Col>
                </Row>
              </Col>

              <Col md="5">
                <Row>
                  <Col md="3">
                    <Form.Label>Reminder Period</Form.Label>
                  </Col>
                  <Col md="8">
                    <Form.Control
                      type="number"
                      onChange={(e) => setReminderPeriod(e.target.value)}
                      value={reminderPeriod}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <p>Related Documents:</p>
            <BrowseFile />
            <div
              style={{
                maxHeight: "20rem",
                minHeight: "10rem",
                background: "#eeeeee",
                padding: "10px",
                borderRadius: "10px",
                display: "flex",
                marginTop: "10px",
              }}
            >
              {!file.length ? <>Upload Files</> : <></>}
              {file.map((val, index) => {
                return (
                  <>
                    <div style={{ margin: "3px" }}>
                      <div style={{ display: "flex" }}>
                        {/* <PictureAsPdfIcon
                          style={{ fontSize: "50px", color: "red" }}
                        /> */}
                        <CloseButton
                          style={{ width: "1px" }}
                          onClick={() => {
                            removeFile(index);
                          }}
                        />
                      </div>
                      {/* <CancelIcon /> */}
                      <p
                        style={{
                          fontSize: "13px",
                          width: "50px",
                          overflow: "hidden",
                        }}
                      >
                        {val}
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
            <div style={{ marginTop: "10px" }}>
              <Button variant="secondary" onClick={props.handleClose}>
                Close
              </Button>
              <Button
                onClick={createDoable}
                style={{
                  backgroundColor: "rgb(52 214 214)",
                  border: "none",
                  marginLeft: "20px",
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
