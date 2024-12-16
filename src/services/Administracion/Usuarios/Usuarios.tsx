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

