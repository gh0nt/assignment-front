import axios from "@/config/axios";

export const loadProjectsByStudent = async (studentId : number, assigned?: boolean) => {
  return await axios({
    method: "get",
    url: `/api/project/student/${studentId}${assigned ? `?assigned=${assigned}` : ''}`,
  });
};
