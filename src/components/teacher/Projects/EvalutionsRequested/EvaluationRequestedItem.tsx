import { Badge } from "@shadcn/components/ui/badge";
import GenerateEvaluation from "./GenerateEvaluation";
import { mapStatusProject, GeneralEvaluationInfo } from "@/models/project";
import DetailEvaluation from "@/components/student/Projects/HistoricEvaluations/DetailEvaluation";

interface EvaluationsRequestItemProps {
  project: GeneralEvaluationInfo;
  setListProjectsTeacher: (projects: GeneralEvaluationInfo[]) => void;
  listProjectsTeacher: GeneralEvaluationInfo[];
}

export default function EvaluationRequestedItem({
  project,
  listProjectsTeacher,
  setListProjectsTeacher,
}: EvaluationsRequestItemProps) {
  return (
    <div
      className="tw-max-w-4xl tw-px-10 tw-my-4 tw-py-6 tw-bg-white tw-rounded-lg"
      style={{
        border: "1px solid #e4e4e7",
      }}
    >
      <div className="tw-flex tw-justify-between tw-items-center">
        <span className="tw-font-light tw-text-gray-600 tw-text-sm">
          Solicitado en {project?.project?.projectDeliveryDate}
        </span>
        <span>
          <Badge className="tw-mr-2">
            {mapStatusProject[project?.evaluation?.statusDescription || ""]}
          </Badge>
          <Badge variant="outline">
            {project?.evaluation?.approved == 1 ? "Aprobado" : "No aprobado"}
          </Badge>
        </span>
      </div>
      <div className="tw-mt-2">
        <h3 className="tw-text-xl  tw-font-bold">
          {project?.project.projectTitle}
        </h3>
        {project.daysRemaning.days > 0 && (
          <span className="tw-flex tw-mt-2 tw-mb-5 tw-gap-2 tw-font-light tw-text-gray-600 tw-text-sm">
            <svg
              width="15px"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Tiene {project.daysRemaning.days}{" "}
            {project.daysRemaning.days == 1 ? "día" : "días"} restante para
            calificar el proyecto
          </span>
        )}
        {project.daysRemaning.days == 0 && (
          <span className="tw-flex tw-mt-2 tw-mb-5 tw-gap-2 tw-font-light tw-text-red-600 tw-text-sm">  <svg
          width="15px"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>El tiempo de evaluación ha expirado</span>
        )}

        <p className="tw-mt-2 tw-text-gray-600 tw-text-sm">
          <span className="tw-font-bold tw-mr-2">Estudiante solicitante:</span>{" "}
          {project.student?.studentName}
        </p>

        {project?.evaluation?.evaluationDate && (
          <div className="tw-mt-3">
            <DetailEvaluation project={project} />
          </div>
        )}
        {!project.evaluation?.evaluationDate &&
          project.daysRemaning.days > 0 && (
            <div className="tw-mt-5">
              <GenerateEvaluation
                project={project}
                listProjectsTeacher={listProjectsTeacher}
                setListProjectsTeacher={setListProjectsTeacher}
              />
            </div>
          )}
      </div>
    </div>
  );
}
