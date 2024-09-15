import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getBaseUrl, firebaseConfig } from "../../utils";
import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import moment from "moment-timezone";
import Select from "react-select";
import makeAnimated from "react-select/animated";
// import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import { CircleLoader } from "react-spinners";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { FaEnvelope, FaFile } from "react-icons/fa";
import { initializeApp } from 'firebase/app';
import Dropdown from "react-bootstrap/Dropdown";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
export const ComplianceDetail = (props) => {
  // console.log(props);
  const uploadFileRef = useRef();
  const [messages, setMessages] = useState([]);
  const animatedComponents = makeAnimated();
  const [completedBy, setCompletedBy] = useState();
  const [loading, setLoading] = useState(1);
  const [loadingMember, setLoadingMember] = useState(1);
  const [forwardMessage, setForwardMessage] = useState(0);
  const [participants, setparticipants] = useState([]);
  const [file, setFile] = useState([]);
  const [subject, setSubject] = useState();
  const [relatedDocumentLink, setRelatedDocumentLink] = useState([]);
  const [relatedDocument, setRelatedDocument] = useState([]);
  const [uploaded, setUploaded] = useState(1);
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
          // console.log('done');
          const a = relatedDocumentLink;
          a.push(downloadURL);
          setRelatedDocumentLink(a);
          alert("Document Uploaded");
          console.log(relatedDocumentLink);
        });
      }
    );
  };
  const sendMessage = () => {
    const obj = {};
    relatedDocument.map((item) => {
      uploadDocument(item);
    });
    console.log(relatedDocumentLink);
    obj.messageType = "doable";
    obj.doableType = "compliance";
    obj.receiverId = member.key;
    obj.messageContent = subject;
    obj.relatedDocumentLink = relatedDocumentLink;
    obj.doableId = props.doableId;
    console.log(obj);
    console.log(localStorage.getItem("token"));
    fetch(getBaseUrl() + "compliance/forwardMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + localStorage.getItem("token"),
      },
      body: JSON.stringify(obj),
    })
      .then((data) => {
        // console.log(data.json());
        return data.json();
      })
      .then((data) => {
        // setDepartment(data.departments);
        // console.log(upcoming);
        console.log(data);
        setForwardMessage(0);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
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
    setRelatedDocumentLink([
      ...relatedDocument.filter((_, index) => index !== i),
    ]);
  };
  const change = (e) => {
    setMember(e);
  };
  const [member, setMember] = useState();
  const concludeCompliance = (e) => {
    e.preventDefault();
    setLoading(1);
    console.log(loading);
    const obj = {};
    obj["doableId"] = props.doableId;
    obj["completed"] = 1;

    console.log(obj);
    fetch(getBaseUrl() + "doable/updateDoable", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + localStorage.getItem("token"),
      },
      body: JSON.stringify(obj),
    })
      .then((data) => {
        // console.log(data.json());
        return data.json();
      })
      .then((data) => {
        // setDepartment(data.departments);
        // console.log(upcoming);
        console.log(data);
        setLoading(0);
        alert("Completed");
        window.location.reload();
        // setAssignedBy(data.assignedBy);
        // setAssignedTo(data.assignedTo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updatePage = () => {
    fetch(
      getBaseUrl() + "doable/getComplianceDetail?doableId=" + props.doableId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + localStorage.getItem("token"),
        },
      }
    )
      .then((data) => {
        // console.log(data.json());
        return data.json();
      })
      .then((data) => {
        // setDepartment(data.departments);
        // console.log(upcoming);
        console.log(data);
        setMessages(data);
        setCompletedBy(
          data[data.length - 1].receiver_first_name +
            " " +
            data[data.length - 1].receiver_last_name
        );
        // setAssignedBy(data.assignedBy);
        // setAssignedTo(data.assignedTo);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };
  useEffect(() => {
    fetch(
      getBaseUrl() + "doable/getComplianceDetail?doableId=" + props.doableId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + localStorage.getItem("token"),
        },
      }
    )
      .then((data) => {
        // console.log(data.json());
        return data.json();
      })
      .then((data) => {
        // setDepartment(data.departments);
        // console.log(upcoming);
        console.log(data);
        setMessages(data);
        setCompletedBy(
          data[data.length - 1].receiver_first_name +
            " " +
            data[data.length - 1].receiver_last_name
        );
        // setAssignedBy(data.assignedBy);
        // setAssignedTo(data.assignedTo);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
    fetch(getBaseUrl() + "meeting/getUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + localStorage.getItem("token"),
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
        data.map((item) => {
          // console.log(item.model);
          val.push({
            label: item.fields.first_name + " " + item.fields.last_name,
            key: item.pk,
          });
        });
        setparticipants(val);
        setLoadingMember(0);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props]);
  const closeDetail = (e) => {
    // console.log(props);
    props.setShow(0);
    props.setSelected(-1);
    props.setSelected1(-1);
  };
  return (
    <>
      {loading ? (
        <>
          <center>
            <CircleLoader />
          </center>
        </>
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
            <span>Doable Detail</span>
            <div>
              <CloseButton variant="white" onClick={(e) => closeDetail(e)} />
            </div>
          </div>
          <div style={{ padding: "20px" }}>
            <Row>
              <Col md="3">Compliance Type:</Col>
              <Col>{props.doableType}</Col>
            </Row>
            <Row>
              <Col md="3"> Compliance Subject:</Col>
              <Col>{props.doableSubject}</Col>
            </Row>
            <Row>
              <Col md="3"> Compliance Deadline:</Col>
              <Col>{moment(props.deadline, "YYYY-MM-DD").format("ll")}</Col>
            </Row>
            <table className="head mt-4">
              <thead>
                <tr style={{ background: "#39CCCC", color: "white" }}>
                  <th className="tb">S.No</th>
                  <th className="tb">Sent By</th>
                  <th className="tb">Recieved By</th>
                  <th className="tb">Sent Date</th>
                  <th className="tb">Message</th>
                  <th className="tb">Attatchment</th>
                  {/* <th className='tb'> Status</th> */}
                  {/* <th style={{
                  border: '1px solid #F4F4F4',
                  padding: '10px'
                }}>Misc</th> */}
                </tr>
                {messages &&
                  messages.map((item, index) => {
                    return (
                      <tr>
                        <th className="tb">{index + 1}</th>
                        <th className="tb">
                          {item.sender_first_name + " " + item.sender_last_name}
                        </th>
                        <th className="tb">
                          {item.receiver_first_name +
                            " " +
                            item.receiver_last_name}
                        </th>
                        <th className="tb">
                          {moment(props.deadline, "YYYY-MM-DD").format("ll")}
                        </th>
                        <th className="tb">{item.messageContent}</th>
                        <th className="tb" style={{ width: "20%" }}>
                          <Row style={{ justifyContent: "space-between" }}>
                            <Col
                              md="6"
                              style={{ marginTop: "10px", marginLeft: "5px" }}
                            >
                              <span>
                                {item.relatedDocumentLink.length} Documents
                              </span>{" "}
                            </Col>
                            <Col md="5">
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="success"
                                  id="dropdown-basic"
                                >
                                  <FaEnvelope />
                                </Dropdown.Toggle>
                                {item.relatedDocumentLink.length > 0 ? (
                                  <Dropdown.Menu>
                                    {item.relatedDocumentLink.map((i, q) => {
                                      const x = i.indexOf("%2F");
                                      const y = i.indexOf("?alt");
                                      const d = i.substring(x + 3, y);
                                      const s = d.replaceAll("%20", " ");
                                      return (
                                        <Dropdown.Item target="_blank" href={i}>
                                          {" "}
                                          {s}
                                        </Dropdown.Item>
                                      );
                                      // <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                      // <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    })}
                                  </Dropdown.Menu>
                                ) : (
                                  <></>
                                )}
                              </Dropdown>
                            </Col>
                          </Row>
                        </th>
                      </tr>
                    );
                  })}
                {props.completed ? (
                  <tr
                    style={{
                      background: "darksalmon",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    <th className="tb"></th>
                    <th className="tb">COMPLETED BY</th>
                    <th className="tb">{completedBy}</th>
                    <th className="tb"></th>
                    <th className="tb">Completed</th>
                    <th className="tb"></th>
                  </tr>
                ) : (
                  <></>
                )}
              </thead>
            </table>
            {!props.completed ? (
              <Row>
                <Button
                  size="sm"
                  style={{
                    width: "200px",
                    margin: "10px 20px",
                    background: "#39CCCC",
                    border: "none",
                  }}
                  onClick={(e) => setForwardMessage(1)}
                >
                  Forward Message
                </Button>
                <Button
                  size="sm"
                  style={{
                    width: "200px",
                    margin: "10px 20px",
                    background: "#39CCCC",
                    border: "none",
                  }}
                  onClick={concludeCompliance}
                >
                  Conclude Compliance
                </Button>
              </Row>
            ) : (
              <></>
            )}
          </div>
          {forwardMessage ? (
            <Row style={{ padding: "15px" }}>
              <div>
                <p>Forward To: </p>
                <Select
                  name="reciever"
                  type="text"
                  placeholder={
                    loadingMember ? "Member Loading..." : "Assign To"
                  }
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={participants}
                  value={member}
                  onChange={change}
                />
                <p>Message</p>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px", borderColor: "grey" }}
                  value={subject}
                  placeholder="Subject/Message"
                  onChange={changeSubject}
                />
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
                            <FaFile
                              style={{ fontSize: "50px", color: "red" }}
                            />
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
                <Button onClick={sendMessage}>Send Message</Button>
              </div>
            </Row>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};
