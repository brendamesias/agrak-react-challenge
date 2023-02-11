import React, { useEffect, useState } from 'react';
import {Button, TextField, Avatar, Stack, Fab } from '@mui/material';
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from 'react-query';
import { useParams, Link, useNavigate } from "react-router-dom";
import { getUserById, updateUser, createUser, deleteUser } from '../../services';
import { IUser } from '../../shared/interfaces/user.interface'
import { validateEmail } from '../../shared/helpers/validateEmail';
import { ContainerButtonHome, ContainerForm } from './styles';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import HomeIcon from '@mui/icons-material/Home';

const userDefault:IUser = {
    id: '0',
    first_name: '',
    second_name: '',
    email: '',
    avatar: '',
};

const FormUser = () => {
    let navigate = useNavigate();
    const { userId = '' } = useParams(); 
    const [queryKey] = useState('user')
    const { isLoading=false, error, data:user=userDefault, refetch, isFetching } = useQuery('user', () => {
            return userId !== 'new' ? getUserById(userId) : userDefault
        }, { enabled: false }
    );

    let {first_name, email: emailUser, second_name, avatar: userAvatar} = user;

    const [email, setEmail] = useState(emailUser);
    const [firstName, setFirstName] = useState(first_name);
    const [secondName, setSecondName] = useState(second_name);
    const [avatar, setAvatar] = useState(userAvatar);

    const queryClient = useQueryClient()

    const { handleSubmit, register, setError, clearErrors, formState: { errors } } = useForm({
        mode: 'all',
    });

    const changeEmail = (event:any) => {
        setEmail(event.target.value)
        const emailIsValid = validateEmail(event.target.value);
        if (!emailIsValid){ setError("email", { type: 'invalidEmail', message: 'El correo ingresado es invalido' })}
        else{clearErrors('email')};
    }

    useEffect(()=> {
        refetch();
        return () => { 
            queryClient.cancelQueries(queryKey)
        }
    }, [])

    useEffect(()=> {
        //reset values used in form when change user in route or is new user
        const {first_name, email: emailUser, second_name, avatar: userAvatar} = userId === 'new' ? userDefault : user;
        setEmail(emailUser)
        setFirstName(first_name)
        setSecondName(second_name)
        setAvatar(userAvatar)
    }, [user, userId])

    const generatePayloadUser = ():IUser => ({
        first_name: firstName,
        second_name: secondName,
        email: email,
        avatar: avatar,
    });

    const deleteUserById = async () => {
        const response = await deleteUser(userId);
        if(response){
            navigate('/users');
        }
    }

    const onSubmit = async() => {
        const editOrCreateUserEvent = (userId === 'new') ? createUser : updateUser;
        const payload:IUser = generatePayloadUser();
        if(userId !== 'new') {payload.id = userId}
        const response = await editOrCreateUserEvent(payload);
        if(response){
            navigate('/users');
        }
    };

    if(isLoading || isFetching) return <>cargandoo</>

    if (error) return (<span>'An error has occurred: ' + error.message</span>)

    return (
        <>  
            <ContainerButtonHome>
                <Link to={`/users`}>
                    <Fab color="primary" variant="extended">
                        <HomeIcon sx={{ mr: 1 }} />
                        ir a lista de usuarios
                    </Fab>
                </Link>
            </ContainerButtonHome>
            <ContainerForm onSubmit={handleSubmit(onSubmit)}>
                <h3>{userId === 'new' ? 'Nuevo usuario' : 'Editar usuario'}</h3>
                <br />
                <TextField
                    required
                    id="first_name"
                    label="Primer nombre"
                    value={firstName}
                    margin="normal"
                    helperText={errors?.first_name?.message?.toString() || ''}
                    error={!!errors.first_name}
                    {...register("first_name", { required: "Por favor ingresa tu primer nombre" })}
                    onChange={(event)=>setFirstName(event.target.value)}
                />
                <TextField
                    required
                    id="second_name"
                    label="Segundo nombre"
                    value={secondName}
                    margin="normal"
                    helperText={errors?.second_name?.message?.toString() || ''}
                    error={!!errors.second_name}
                    {...register("second_name", { required: "Por favor ingresa tu segundo nombre" })}
                    onChange={(event)=>setSecondName(event.target.value)}
                />
                <TextField
                    required
                    id="avatar"
                    label="Avatar"
                    value={avatar}
                    margin="normal"
                    helperText={errors?.avatar?.message?.toString() || ''}
                    error={!!errors.avatar}
                    {...register("avatar", { required: "Por favor ingrese el link de su imagen" })}
                    onChange={(event)=>setAvatar(event.target.value)}
                />
                <TextField
                    id="email"
                    required
                    type="email"
                    label="Correo electrónico"
                    value={email}
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors?.email?.message?.toString() || ''}
                    {...register("email", { required: "Por favor ingresa tu correo electrónico" })}
                    onChange={changeEmail}
                />
                <br />
                <Avatar
                    alt="user-avatar"
                    src={avatar}
                    sx={{ width: 80, height: 80 }}
                />
                <br /><br /><hr />
                <Stack direction="row" spacing={3}>
                    {
                        userId === 'new' ? 
                        <Button type="submit" variant="contained" endIcon={<DeleteIcon />}>
                            Crear Usuario
                        </Button>
                        : <>
                            <Button type="submit" variant="contained" endIcon={<SaveIcon />}>
                                Guardar
                            </Button>
                            <Button color="error" onClick={deleteUserById} variant="outlined" startIcon={<DeleteIcon />}>
                                Eliminar usuario
                            </Button>
                        </>
                    }
                </Stack>

            </ContainerForm>
        </>
    )

}

export default FormUser;