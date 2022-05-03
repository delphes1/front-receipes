import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

export default function ReceipeDetail(props) {

    return (
        <div style={{ textAlign: 'left' }}>

            <Typography variant="h2" style={{ textAlign: 'center', marginTop: 15 }}>
                {props.receipe.name}
            </Typography>

            <Typography variant="h5" style={{ textAlign: 'left', marginTop: 45 }}>
                {`Ingrédients pour ${props.receipe.nbParts} personnes :`}
            </Typography>
            <ul>
                {props.receipe.ingredients.map(ingredient => (
                    <React.Fragment>
                        <li style={{ marginBottom: 25 }}>
                            {`${ingredient.quantity} ${ingredient.unit ? `${ingredient.unit} de` : ''} ${ingredient.name}`}
                        </li>
                    </React.Fragment>
                ))}
            </ul>

            <Typography variant="h5" style={{ textAlign: 'left', marginTop: 45 }}>
                {`Étapes de la recette :`}
            </Typography>
            <ul>
                {props.receipe.steps.map(step => (
                    <React.Fragment>
                        <li style={{ marginBottom: 25 }}>
                            {step}
                        </li>
                    </React.Fragment>
                ))}
            </ul>


            <div style={{ textAlign: 'center' }}>
                <Button variant="contained" style={{ margin: '30px 5px' }} size="large" onClick={props.cancelReceipe}>
                    Retour
                </Button>
            </div>
        </div>
    )
}
