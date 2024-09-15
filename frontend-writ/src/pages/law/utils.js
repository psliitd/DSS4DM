import React from "react";
import Form from "react-bootstrap/Form";
import { formDetails } from "./AddLawSituation";
// const variables = formDetails();
export const calamityProperty = [
  {
    name: "title",
    as: "input",
    type: "text",
    setter: "setTitle",
    // variable: variables.title,
    setter: "setTitle",
  },
  { name: "type", as: "select", setter: "" },
  {
    name: "total_cost",
    as: "input",
    type: "number",
    // variable: variables.total_cost,
    setter: "setTotalCost",
  },
  {
    name: "injured",
    as: "input",
    type: "number",
    setter: "setInjured",
  },
  { name: "dead", as: "input", type: "number", setter: "setDead" },
  {
    name: "people_affected",
    as: "input",
    type: "number",
    setter: "setPeopleAffected",
  },
  { name: "start_date", as: "input", type: "date", setter: "setStartDate" },
  { name: "end_date", as: "input", type: "date", setter: "setEndDate" },
  { name: "police", as: "input", type: "number", setter: "setPolice" },
  { name: "ndrf", as: "input", type: "number", setter: "setNdrf" },
  { name: "ambulance", as: "input", type: "number", setter: "setAmbulance" },
  {
    name: "lesson_learnt",
    as: "textarea",
    type: "text",
    setter: "setLessonLearnt",
  },
];

export const crimeProperty = [
  {
    name: "title",
    as: "input",
    type: "text",
    setter: "setTitle",
    // setter: variables.setTitle,
  },
  { name: "type", as: "select", setter: "" },
  { name: "crime_Location", as: "input", type: "text", setter: "setCrimeLocation" },
  {
    name: "date_time",
    as: "input",
    type: "datetime-local",
    setter: "setDateTime",
  },
  {
    name: "lesson_learnt",
    as: "textarea",
    type: "text",
    setter: "setLessonLearnt",
  },
];
export const gatheringProperty = [
  {
    name: "title",
    as: "input",
    type: "text",
    setter: "setTitle",
    // variable: variables.title,
    // setter: variables.setTitle,
  },
  { name: "type", as: "select", setter: "" },
  { name: "attendance", as: "input", type: "number", setter: "setAttendance" },
  { name: "close", as: "check", type: "radio", setter: "setClose" },
  { name: "location", as: "input", type: "text", setter: "setLocation" },
  { name: "police", as: "input", type: "number", setter: "setPolice" },
  {
    name: "fire_fighters",
    as: "input",
    type: "number",
    setter: "setFireFighters",
  },
  {
    name: "date_time",
    as: "input",
    type: "datetime-local",
    setter: "setDateTime",
  },
  { name: "duration", as: "input", type: "number", setter: "setDuration" },
  {
    name: "lesson_learnt",
    as: "textarea",
    type: "text",
    setter: "setLessonLearnt",
  },
];
export const rallyProperty = [
  {
    name: "title",
    as: "input",
    type: "text",
    setter: "setTitle",
    // variable: variables.title,
    // setter: variables.setTitle,
  },
  { name: "type", as: "select", setter: "" },
  { name: "attendance", as: "input", type: "number", setter: "setAttendance" },
  { name: "stationary", as: "check", type: "radio", setter: "setStationary" },
  { name: "start_location", as: "input", type: "text", setter: "setStartLocation"},
  { name: "end_location", as: "input", type: "text", setter: "setEndLocation" },
  { name: "police", as: "input", type: "number", setter: "setPolice" },
  {
    name: "fire_fighters",
    as: "input",
    type: "number",
    setter: "setFireFighters",
  },
  {
    name: "date_time",
    as: "input",
    type: "datetime-local",
    setter: "setDateTime",
  },
  { name: "ambulance", as: "input", type: "number", setter: "setAmbulance" },
  {
    name: "lesson_learnt",
    as: "textarea",
    type: "text",
    setter: "setLessonLearnt",
  },
];

export const epidemicProperty = [
  {
    name: "title",
    as: "input",
    type: "text",
    setter: "setTitle",
    // variable: variables.title,
    // setter: variables.setTitle,
  },
  { name: "type", as: "select", setter: "" },
  {
    name: "total_cost",
    as: "input",
    type: "number",
    // variable: variables.total_cost,
    setter: "setTotalCost",
  },
  {
    name: "infected",
    as: "input",
    type: "number",
    // variable: variables.injured,
    setter: "setInfected",
  },
  // { name: "injured", as: "input", type: "number" },
  { name: "dead", as: "input", type: "number", setter: "setDead" },
  {
    name: "people_affected",
    as: "input",
    type: "number",
    setter: "setPeopleAffected",
  },
  { name: "start_date", as: "input", type: "date", setter: "setStartDate" },
  { name: "end_date", as: "input", type: "date", setter: "setEndDate" },
  { name: "police", as: "input", type: "number", setter: "setPolice" },
  { name: "ndrf", as: "input", type: "number", setter: "setNdrf" },
  { name: "ambulance", as: "input", type: "number", setter: "setAmbulance" },
  { name: "lesson_learnt", as: "textarea", type: "text" },
];
export const calamityTypes = [
  "floods",
  "drought",
  "earthquake",
  "forest fire",
  "cyclone",
  "landslide",
  "storm",
  "other",
];
export const crimeTypes = [
  "murder",
  "rape",
  "kidnapping",
  "loot",
  "robbery",
  "smuggling",
  "other",
];
export const gatheringTypes = [
  "religious",
  "political",
  "social",
  "protest",
  "government",
  "other",
];
export const rallyTypes = [
  "religious",
  "political",
  "social",
  "protest",
  "government",
  "other",
];
export const epidemicTypes = ["deadly", "seasonal", "infectious"];

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const TypeSelect = ({ options, valueSetter }) => {
  // console.log(options);
  const selectType = (e) => {
    // console.log(e.target.value);
    valueSetter(e.target.value);
  };
  return (
    <Form.Select size="md" onChange={(e) => selectType(e)}>
      {options.map((item, key) => {
        return (
          <option value={item} key={key}>
            {capitalizeFirstLetter(item)}
          </option>
        );
      })}
    </Form.Select>
  );
};
