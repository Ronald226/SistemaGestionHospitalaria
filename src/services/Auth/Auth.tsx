import axiosInstance from "../AxiosInstance";


export const getToken=async (token:String): Promise<boolean>=>{
    try {
        const respon:any = await axiosInstance.get('/auth/profile',
        {headers:{Authorization: `Bearer ${token}`},})
        console.log(respon.data.name)
        console.log("token en la funcion gettoken  "+token)
        return respon.data.name!=undefined;
        
    } catch (error) {
        console.error(error);
        return false; // Devuelve false en caso de error
    }
};

