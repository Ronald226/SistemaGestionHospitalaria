import {pacientsProps} from "./../Pacients/InterfacePacients"


export interface Atenciones{
    id: number,
    fecha: string,
    especialidad: string,
    estado: boolean,
    paciente: pacientsProps,
    doctor: Doctor,
}

export interface Doctor{
    id:number,
    nombre: string,
    apellido: string,
    especialidad: Especialidad,
}
export interface Especialidad{
    id:number,
    nombre:string,
}


