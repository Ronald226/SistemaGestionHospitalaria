
import axiosInstance from "../AxiosInstance";

const getToken=async (token:String): Promise<boolean>=>{
    let respon:any = await axiosInstance.get('/auth/valid',
        {headers:{Authorization: `Bearer ${token}`,}})
        .then((respon)=>{
            console.log(respon.data)
            return respon.data == "this user is valid";
        })
        .catch((error)=>{
            return false;
        });

    return respon
}
export default getToken;