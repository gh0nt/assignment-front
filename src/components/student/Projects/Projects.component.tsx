import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@shadcn/components/ui/breadcrumb";
import NewProject from "./NewProject/NewProject";
import HistoricEvaluation from './HistoricEvaluations/';

export default function StudentEvaluations() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Lista de proyectos evaluados</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>{" "}
      <NewProject/>
      <div className="tw-mt-8">
        <HistoricEvaluation/>
      </div>
    </div>
  );
}
