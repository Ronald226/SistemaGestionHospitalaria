
import axiosInstance from "../AxiosInstance";

const login= async (ema:String,password:String)=>{
    
    try {
        const respon:any = await axiosInstance.post('/auth/login',{
            email: ema, // Ajusta los nombres según lo que tu backend espera
            password: password,
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
export default login;