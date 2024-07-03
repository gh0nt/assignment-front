import { Badge } from "@shadcn/components/ui/badge";
import DetailEvaluation from "./DetailEvaluation";

export default function HistoricEvaluationItem() {
    return  <div className="tw-max-w-4xl tw-px-10 tw-my-4 tw-py-6 tw-bg-white tw-rounded-lg" style={{
        border : "1px solid #e4e4e7"
    }}>
      <div className="tw-flex tw-justify-between tw-items-center">
        <span className="tw-font-light tw-text-gray-600 tw-text-sm">Solicitado en mar 10, 2024</span>
       <span>
       <Badge className="tw-mr-2">En revisión</Badge>
       <Badge variant="outline">No Aprobado</Badge>
       </span>
      </div>
      <div className="tw-mt-2">
        <h3 className="tw-text-xl  tw-font-bold">
          Herramienta para medir el nivel acádemico de los estudiantes de la Universidad de los llanos
        </h3>
        <p className="tw-mt-2 tw-text-gray-600 tw-text-sm">
          <span className="tw-font-bold tw-mr-2">Docente asignado:</span> Ana
          beatriz
        </p>
        <div className="tw-mt-3">
          <DetailEvaluation/>
        </div>
      </div>
    </div>
}