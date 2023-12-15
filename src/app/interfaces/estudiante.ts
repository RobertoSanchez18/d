export class Estudiante {

    id:number;
    name:string;
    surname:string;
    typeDocument:string;
    numberDocument:string;
    email:string;
    addres:string;
    celphone:string;
    shift:string;
    dateOfBirth:Date | string;
    classroomId:number; 
    states:string;
    
}

export interface Attendance {
    id:      number;
    states:  string;
    dates:   Date;
    student: Student;
}

export class AttendancePost {
    id:      number;
    states:  string;
    dates:   Date;
    student: {
        id: number;
    };
}

export interface Student {
    id:             number;
    name:           string;
    surname:        string;
    typeDocument:   string;
    numberDocument: string;
    email:          string;
    addres:         string;
    celphone:       string;
    shift:          string;
    dateOfBirth:    Date;
    classroomId:    number;
    states:         string;
}
