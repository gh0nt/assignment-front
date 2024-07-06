export interface LoginUserDto {
    userEmail : string
    password : string
}

export interface LoginUserDAO {
    name : string
    token : string
    email : string
    role : string
    id : number
}