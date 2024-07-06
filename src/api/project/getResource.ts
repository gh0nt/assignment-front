import axios from "@/config/axios";

export const getResource = async (projectId : number) => {
  return await axios({
    method: "get",
    url: `/api/project/resource/${projectId}`,
  });
};
