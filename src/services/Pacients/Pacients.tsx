import axiosInstance from "../AxiosInstance";

export const register_pacient= async (dn:number,nomb:string,ape:string,hist:number)=>{
    
    try {
        const respon:any = await axiosInstance.post('/pacientes',{
            dni: dn,
            nombres: nomb,
            apellidos: ape,
            historia: hist
        });
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