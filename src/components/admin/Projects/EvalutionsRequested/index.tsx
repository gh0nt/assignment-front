import { useEffect, useState } from "react";
import EvaluationRequestedItem from "./EvaluationRequestedItem";
import { GeneralEvaluationInfo } from "@/models/project";
import { loadProjects } from "@/api/project/loadProject";
import { getUsersByRole } from "@/api/user/getUsersByRole";

export default function EvaluationsRequest() {
  const [listProjectsAdmin, setListProjectsAdmin] = useState<
    GeneralEvaluationInfo[]
  >([]);
  const [messageErrorLoadProjects, setMessageErrorLoadProjects] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [teachersToAssigned, setTeachersToAssigned] = useState<{id: number | null, name : string}[]>([]);

  useEffect(() => {
    getTeachers()
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      setIsLoading(true);
      setMessageErrorLoadProjects("");

      const responseLoadProject = await loadProjects();
      const responseData = await responseLoadProject.data;
      setListProjectsAdmin(responseData.$values);
      setIsLoading(false);
    } catch (error: unknown) {
      setMessageErrorLoadProjects(
        "Ha ocurrido un error al crear el proyecto, intente de nuevo"
      );
      setIsLoading(false);
    }
  };

  const getTeachers = async () => {
   try {
      const responseLoadTeachers = await getUsersByRole('teacher');
      const responseTeachersData: {id: number, name : string}[] = await responseLoadTeachers.data;
      setTeachersToAssigned([{id : null, name : 'Desasignar docente'} ,...responseTeachersData]);
   }catch(error){
      console.log(error);
   }
  }

  return (
    <div className="tw-mt-6">
      {isLoading ? (
        <p>Cargando proyectos...</p>
      ) : messageErrorLoadProjects ? (
        <p className="tw-flex tw-items-center tw-gap-2 tw-text-md">
          <svg
            width="18"
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
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Ha ocurrido un error al obtener los proyectos
        </p>
      ) : listProjectsAdmin?.length > 0 ? (
        listProjectsAdmin.map((project) => (
          <EvaluationRequestedItem
            project={project}
            teachersToAssigned={teachersToAssigned}
            key={project.project.projectId}
            listProjectsAdmin={listProjectsAdmin}
            setListProjectsAdmin={setListProjectsAdmin}
          />
        ))
      ) : (
        <p className="tw-flex tw-items-center tw-gap-2 tw-text-md">
          <svg
            width="18"
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
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
          No hay proyectos disponibles para asignación
        </p>
      )}
    </div>
  );
}
