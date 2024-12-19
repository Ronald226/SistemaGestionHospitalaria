import axiosInstance from "../../AxiosInstance";

export const list_usuarios= async (token:String) => {
    try {
        const respon:any = await axiosInstance.get('/users',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
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

export const register_user= async (nomb:string,mail:string,pass:string,rol:string) =>{
    try {
        const respon:any = await axiosInstance.post('/auth/register',{
            name: nomb,
            email: mail,
            password: pass,
            role: rol
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