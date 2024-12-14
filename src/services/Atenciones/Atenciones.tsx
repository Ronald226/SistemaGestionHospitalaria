import axiosInstance from "../AxiosInstance";

export const list_atenciones= async ()=> {
    try {
        const respon:any = await axiosInstance.get('/atencion');
        if (respon.status === 200 || respon.status === 201) {
            console.log("Extracion de datos exitoso:", respon.data);
            return respon.data; // Retorna los datos de la respuesta si es necesario
          } else {
            console.log("Extracion de datos fallido:", respon.status);
            return null;
          }


    }catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}
export const update_atenciones= async (hist:number,fec:String,docId:number,espId:number, est:boolean, i:number):Promise<boolean>=>{
  const historia = parseInt(String(hist));
  const doctorId = parseInt(String(docId));
  const especialidadId =parseInt(String(espId));
  const id =parseInt(String(i));
  try {
      const respon:any = await axiosInstance.patch(`/atencion/${id}`,{
          historia: historia,
          fecha: fec,
          doctorId: doctorId,
          especialidadId: especialidadId,
          estado: est
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

export const get_doctores= async ()=> {
  try {
      const respon:any = await axiosInstance.get('/doctores');
      if (respon.status === 200 || respon.status === 201) {
          console.log("Extraccion de datos exitoso:", respon.data);
          return respon.data; // Retorna los datos de la respuesta si es necesario
        } else {
          console.log("Extraccion de datos fallido:", respon.status);
          return null;
        }


  }catch (error) {
      console.error("Error en la solicitud:", error);
      return null;
  }
}

export const get_especialidades= async ()=> {
  try {
      const respon:any = await axiosInstance.get('/especialidades');
      if (respon.status === 200 || respon.status === 201) {
          console.log("Extraccion de datos exitoso:", respon.data);
          return respon.data; // Retorna los datos de la respuesta si es necesario
        } else {
          console.log("Extraccion de datos fallido:", respon.status);
          return null;
        }


  }catch (error) {
      console.error("Error en la solicitud:", error);
      return null;
  }
}

export const delete_atenciones= async (dn:number)=>{
  const id = parseInt(String(dn));
  
  try {
      const respon:any = await axiosInstance.delete(`/atencion/${id}`);
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
export const register_atencion= async (hist:number,docId:number,espId:number,fec:string,estado:boolean) =>{
  
  const historia = parseInt(String(hist));
  const doctorId = parseInt(String(docId));
  const especialidadId = parseInt(String(espId));

  try {
      const respon:any = await axiosInstance.post('/atencion',{
          historia: historia,
          fecha: String(fec),
          doctorId: doctorId,
          especialidadId: especialidadId,
          estado: estado,
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