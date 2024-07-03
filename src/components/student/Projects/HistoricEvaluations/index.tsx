import { useState } from "react";
import HistoricEvaluationItem from "./HistoricEvaluationItem";

export default function HistoricEvaluations() {
   const [listProjectsStudent, setListProjectsStudent] = useState([1,2,3,4,5])
  return (
     listProjectsStudent.map(project => (
       <HistoricEvaluationItem/>
     ))
  );
}
