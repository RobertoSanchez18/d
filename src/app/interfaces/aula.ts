import { Usuario } from "./usuario";

export class Aula {
    id:number;
    grado:string;
    seccion:string;
    turno:string;
    user: Usuario | undefined;
}

export class AulaDTO {
    name: string | undefined;
    grado: string;
    seccion: string;
    turno:string;
    users_id: number | undefined;
}