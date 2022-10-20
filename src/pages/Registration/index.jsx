import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, fetchRegister, selectIsAuth} from "../../redux/slices/auth";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";

export const Registration = () => {

    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: ''
        },
        mode: "onChange"
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values))
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    }

    if (isAuth) {
        return <Navigate to="/"/>
    }

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Создание аккаунта
            </Typography>

            <div className={styles.avatar}>
                <Avatar sx={{width: 100, height: 100}}/>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <TextField error={Boolean(errors.fullName?.message)}
                           {...register('fullName', {required: 'Enter name'})}
                           helperText={errors.fullName?.message}
                           className={styles.field}
                           label="Полное имя"
                           fullWidth/>

                <TextField error={Boolean(errors.email?.message)}
                           {...register('email', {required: 'Enter email'})}
                           helperText={errors.email?.message}
                           className={styles.field}
                           label="E-Mail"
                           fullWidth/>

                <TextField error={Boolean(errors.password?.message)}
                           {...register('password', {required: 'Enter password'})}
                           helperText={errors.password?.message}
                           className={styles.field}
                           label="Пароль"
                           type="password"
                           fullWidth/>

                <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                    Зарегистрироваться
                </Button>

            </form>
        </Paper>
    );
};
