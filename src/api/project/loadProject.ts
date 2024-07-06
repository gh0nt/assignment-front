import axios from "@/config/axios";

export const loadProjects = async (assigned ?: boolean) => {
  return await axios({
    method: "get",
    url: `/api/project${assigned ? `?assigned=${assigned}` : ''}`,
  });
};
