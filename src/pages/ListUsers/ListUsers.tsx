import React, {useEffect} from 'react';
import { useQuery } from 'react-query';
import { getListUsers, deleteUser } from '../../services';
import { IUser } from '../../shared/interfaces/user.interface'
import {Card, CardContent, CardMedia, Typography, Box, Fab, IconButton } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import { ContainerButtonHome } from '../FormUser/styles';
import './index.css';

const ListUsers = () => {
    const { isLoading=false, error, data:users=[], refetch, isFetching } = useQuery('listUsers', getListUsers, { enabled: false });
    
    useEffect(()=>{
        refetch()
    }, [])
    
    const deleteUserById = async (idUser: string) => {
        const response = await deleteUser(idUser);
        if(response){
            refetch()
        }
    }

    if(isLoading || isFetching) return <>cargandoo</>

    if (error) return (<span>'An error has occurred: ' + error.message</span>)

    return (
        <div>
            <ContainerButtonHome>
                <Link to={`/users/new`}>
                    <Fab color="primary" variant="extended">
                        <PersonAddAlt1Icon sx={{ mr: 1 }} />
                        Agregar nuevo usuario
                    </Fab>
                </Link>
            </ContainerButtonHome>
            <br /><br /><br />
            <div>
            { users.map(({id='', first_name, second_name, email, avatar}: IUser) => (
                <Card key={id} variant="outlined" className="cardUser">
                    <CardMedia
                        component="img"
                        className='cardImage'
                        image={avatar}
                        alt="Live from space album cover"
                    />
                    <Box className="cardInfoUser" >
                        <CardContent>
                            <Typography gutterBottom variant="h6"  component="div">
                                {`${first_name} ${second_name}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {email}
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            <Link to={`/users/${id}`}>
                                <IconButton aria-label="Editar">
                                    <EditIcon />
                                </IconButton>
                            </Link>
                            <IconButton onClick={() => deleteUserById(id)} aria-label="Eliminar">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Card>
            ))}
            </div>

        </div>
    )
}

export default ListUsers;