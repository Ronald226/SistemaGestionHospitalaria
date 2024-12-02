import axiosInstance from "../AxiosInstance";

export const register_pacient= async (dn:number,nomb:String,ape:String,hist:number):Promise<boolean>=>{
    const dni = parseInt(String(dn), 10);
    const historia = parseInt(String(hist), 10);
    try {
        const respon:any = await axiosInstance.post('/pacientes',{
            dni: dni,
            nombres: nomb,
            apellidos: ape,
            historia: historia,
        });
        if (respon.status === 200 || respon.status === 201) {
            console.log("Creacion exitosa:", respon.data);
            return true; // Retorna los datos de la respuesta si es necesario
          } else {
            console.log("Creacion fallida:", respon.status);
            return false;
          }


    }catch (error) {
        console.error("Error en la solicitud:", error);
        return false;
    }
}

export const update_pacient= async (dn:number,nomb:String,ape:String,hist:number):Promise<boolean>=>{
    const dni = parseInt(String(dn), 10);
    const historia = parseInt(String(hist), 10);
    try {
        const respon:any = await axiosInstance.patch(`/pacientes/${dni}`,{
            dni: dni,
            nombres: nomb,
            apellidos: ape,
            historia: historia,
        });
        if (respon.status === 200 || respon.status === 201) {
            console.log("Actualizacion exitosa:", respon.data);
            return true; // Retorna los datos de la respuesta si es necesario
          } else {
            console.log("Actualizacion fallida:", respon.status);
            return false;
          }


    }catch (error) {
        console.error("Error en la solicitud:", error);
        return false;
    }
    
}

export const delete_pacient= async (dn:number):Promise<boolean>=>{
    const dni = parseInt(String(dn), 10);
    try {
        const respon:any = await axiosInstance.delete(`/pacientes/${dni}`);
        if (respon.status === 200 || respon.status === 201) {
            console.log("Eliminacion exitosa:", respon.data);
            return true; // Retorna los datos de la respuesta si es necesario
          } else {
            console.log("Eliminacion fallida:", respon.status);
            return false;
          }

    }catch (error) {
        console.error("Error en la solicitud:", error);
        return false;
    }
    
}

export const list_pacient= async ()=>{
    
    try {
        const respon:any = await axiosInstance.get('/pacientes');
        if (respon.status === 200 || respon.status === 201) {
            console.log("Login exitoso:", respon.data);
            return respon.data; // Retorna los datos de la respuesta si es necesario
          } else {
            console.log("Login fallido:", respon.status);
            return null;
          }


    }catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
    
}
export const pacient_search_dni= async (dni:number)=>{
    
    try {
        const respon:any = await axiosInstance.get(`/pacientes/${dni}`);
        if (respon.status === 200 || respon.status === 201) {
            console.log("Consulta exitosa:", respon.data);
            return respon.data; // Retorna los datos de la respuesta si es necesario
          } else {
            console.log("Consulta fallido:", respon.status);
            return null;
          }


    }catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}