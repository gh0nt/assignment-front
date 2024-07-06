import axios from "@/config/axios";
import { LoginUserDto } from "@/models/auth";

export const loginUser = async ({userEmail, password} : LoginUserDto) => {
    return await axios.post('/login', {
        userEmail,
        password
    });
}