import { Badge } from "@shadcn/components/ui/badge";
import { Button } from "@shadcn/components/ui/button";
import GenerateEvaluation from "./GenerateEvaluation";

export default function EvaluationRequestedItem() {
  return (
    <div
      className="tw-max-w-4xl tw-px-10 tw-my-4 tw-py-6 tw-bg-white tw-rounded-lg"
      style={{
        border: "1px solid #e4e4e7",
      }}
    >
      <div className="tw-flex tw-justify-between tw-items-center">
        <span className="tw-font-light tw-text-gray-600 tw-text-sm">
          Solicitado en mar 10, 2024
        </span>
        <span>
          <Badge className="tw-mr-2">En revisión</Badge>
          <Badge variant="outline">No Aprobado</Badge>
        </span>
      </div>
      <div className="tw-mt-2">
        <h3 className="tw-text-xl  tw-font-bold">
          Herramienta para medir el nivel acádemico de los estudiantes de la
          Universidad de los llanos
        </h3>
        <span className="tw-flex tw-mt-2 tw-mb-5 tw-gap-2 tw-font-light tw-text-gray-600 tw-text-sm">
        <svg width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

Tiene 1 día restante para calificar el proyecto
        </span>
        <p className="tw-mt-2 tw-text-gray-600 tw-text-sm">
          <span className="tw-font-bold tw-mr-2">Estudiante solicitante:</span> Camilo Beltran
        </p>
        <div className="tw-mt-5">
          <GenerateEvaluation />
        </div>
      </div>
    </div>
  );
}
