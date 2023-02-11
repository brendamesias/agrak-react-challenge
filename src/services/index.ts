import { IUser } from '../shared/interfaces/user.interface'

export const getListUsers = ():Promise<IUser[]> => 
    fetch(`${process.env.REACT_APP_URL_USER_SERVICE}/api/v1/users`)
    .then(res => res.json())


export const getUserById = (idUser: string):Promise<IUser> => 
    fetch(`${process.env.REACT_APP_URL_USER_SERVICE}/api/v1/users/${idUser}`)
    .then(res => res.json())


export const deleteUser = (idUser: string):Promise<IUser> => 
    fetch(`${process.env.REACT_APP_URL_USER_SERVICE}/api/v1/users/${idUser}`, {
        method: 'DELETE',
    }).then(res => res.json());


export const updateUser = (user: IUser):Promise<IUser> => 
    fetch(`${process.env.REACT_APP_URL_USER_SERVICE}/api/v1/users/${user.id}`, {
        method: 'PUT',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(user)
    }).then(res => res.json());

    
export const createUser = (user: IUser):Promise<IUser> => 
    fetch(`${process.env.REACT_APP_URL_USER_SERVICE}/api/v1/users/`, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(user)
    }).then(res => res.json());