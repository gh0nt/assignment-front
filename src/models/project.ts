export interface newProjectDTO {

}

export interface Evaluations {
    id : number
    feedback ?: string
    evaluationDate ?: string
    approved ?: number | null
    statusDescription : StatusProject
}

export interface Assignment {
    assignmentId: number,
    assignmentDate: string
}

export interface Project {
    projectId: number,
    projectTitle: string,
    projectDescription: string
    projectFile: string
    projectDeliveryDate: string
}

export interface DaysRemaining {
    days : number
}

export interface GeneralEvaluationInfo {
    project : Project
    assignment? : Assignment
    evaluation ?: Evaluations
    student ?: Student
    teacher ?: Teacher
    daysRemaning : DaysRemaining
}

export interface Student {
     id : number
     studentName : string,
     studentEmail: string
}

export interface Teacher {
    teacherId : number
    teacherName : string,
    teacherEmail: string
}

export enum StatusProject {
    IN_REVISION = 'in revision',
    REVIEWED = 'reviewed',
    WAITING_FOR_REVIEWER = 'waiting for assign teacher'

} 

export const mapStatusProject : Record<string, string> = {
    [StatusProject.IN_REVISION] : 'En revisión',
    [StatusProject.REVIEWED] : 'Revisado',
    [StatusProject.WAITING_FOR_REVIEWER] : 'Esperando evaluador'
    
}