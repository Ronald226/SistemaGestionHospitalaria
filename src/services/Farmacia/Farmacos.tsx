import axiosInstance from "../AxiosInstance";

export const list_farmacos= async ()=> {
    try {
        const respon:any = await axiosInstance.get('/farmacos');
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

export const register_farmaco= async (cod:string,nomb:string,desc:string,stoc:number,prec:number) =>{
  
  const stock = parseInt(String(stoc));
  const precio = parseInt(String(prec));
  try {
      const respon:any = await axiosInstance.post('/farmacos',{
          codigo: cod,
          nombre_articulo: nomb,
          descripcion: desc,
          stock: stock,
          precio: precio
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