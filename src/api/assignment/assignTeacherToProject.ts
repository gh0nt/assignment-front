import axios from "@/config/axios";
import { AssignmentTeacherDTO } from "@/models/assignment";

export const assignTeacherToProject = async (assignmentInfo : AssignmentTeacherDTO ) => {
  return await axios({
    method: "post",
    url: "/api/assignment",
    data: assignmentInfo,
  });
};
