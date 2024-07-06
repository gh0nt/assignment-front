import { Badge } from "@shadcn/components/ui/badge";
import DetailEvaluation from "./DetailEvaluation";
import { mapStatusProject, GeneralEvaluationInfo } from "@/models/project";

interface HistoricEvaluationItemProps {
  project: GeneralEvaluationInfo;
}

export default function HistoricEvaluationItem({
  project,
}: HistoricEvaluationItemProps) {
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
          {project?.project?.projectTitle}
        </h3>
        {project?.teacher?.teacherName && (
          <p className="tw-mt-2 tw-text-gray-600 tw-text-sm">
            <span className="tw-font-bold tw-mr-2">Docente asignado:</span>{" "}
            {project?.teacher?.teacherName}
          </p>
        )}

        {project?.evaluation?.evaluationDate && (
          <div className="tw-mt-3">
            <DetailEvaluation project={project} />
          </div>
        )}
      </div>
    </div>
  );
}
