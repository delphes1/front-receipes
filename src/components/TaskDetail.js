import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

export default function TaskDetail(props) {

    return (
        <div style={{ textAlign: 'left' }}>

            <Typography variant="h2" style={{ textAlign: 'center', marginTop: 15 }}>
                {props.task.title}
            </Typography>

            <Typography variant="h5" style={{ textAlign: 'left', marginTop: 45 }}>
                {`Étapes de la recette :`}
            </Typography>

            <div style={{ textAlign: 'center' }}>
                <Button variant="contained" style={{ margin: '30px 5px' }} size="large" onClick={props.cancelTask}>
                    Retour
                </Button>
            </div>
        </div>
    )
}
