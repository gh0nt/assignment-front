import axios from "@/config/axios";

export const getUsersByRole = async (role : string) => {
    return await axios({
      method: "get",
      url: `/api/user/${role}`,
    });
  };
  