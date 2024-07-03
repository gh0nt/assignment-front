import { Badge } from "@shadcn/components/ui/badge";
import { useState } from "react";
import EvaluationRequestedItem from "./EvaluationRequestedItem";

export default function EvaluationsRequest() {
   const [listProjectsStudent, setListProjectsStudent] = useState([1,2,3,4,5])
  return (
     listProjectsStudent.map(project => (
            <EvaluationRequestedItem/>
     ))
  );
}
