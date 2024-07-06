import axios from "@/config/axios";

export const createNewProject = async (infoProject: FormData) => {
  return await axios({
    method: "post",
    url: "/api/project",
    data: infoProject,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
