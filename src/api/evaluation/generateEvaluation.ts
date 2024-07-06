import axios from "@/config/axios";
import { EvaluationProjectDTO } from "@/models/evaluation";

export const generateEvaluationProject = async (idProject : number, evaluationProject: EvaluationProjectDTO) => {
  return await axios({
    method: "post",
    url: `/api/evaluation/${idProject}`,
    data: evaluationProject,
  });
};
