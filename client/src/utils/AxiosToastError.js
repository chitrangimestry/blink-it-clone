// import axios from "axios"
import toast from "react-hot-toast"

const axiosToastError= (err) => {
    toast.error(err?.response?.data?.message);
}

export default axiosToastError;