export const baseURL = "http://localhost:8080";

 const SummaryAPI = {
    register: {
        url:"/api/user/register",
        method: "post"
    },
    login: {
        url:"/api/user/login",
        method: "post"
    },
    forgotPassword:{
        url:"/api/user/forgotPassword",
        method: "patch"
    }
}

export default SummaryAPI;