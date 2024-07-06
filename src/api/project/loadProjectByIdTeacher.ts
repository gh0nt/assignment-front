import axios from "@/config/axios";

export const loadProjectsByTeacher = async (teacherId : number) => {
  return await axios({
    method: "get",
    url: `/api/project/teacher/${teacherId}`,
  });
};
