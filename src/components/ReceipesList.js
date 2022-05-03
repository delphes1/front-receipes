import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '60vw',
    },
    inline: {
        display: 'inline',
    },
}));

export default function ReceipesList(props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {props.receipes.map((r, i) => (
                <div key={r._id}>
                    {i != 0 && <Divider variant="middle" />}
                    <ListItem
                        alignItems="flex-start"
                        style={{ cursor: 'pointer' }}
                        onClick={() => props.displayReceipe(r._id)}
                    >
                        <ListItemText
                            primary={
                                <Typography variant="h4" gutterBottom>
                                    {r.name}
                                </Typography>
                            }
                            secondary={r.ingredients.map(ing => ing.name).join(', ')}
                        />
                        <ListItemSecondaryAction>
                            <IconButton style={{ marginLeft: 15 }} edge="end" onClick={() => props.displayReceipe(r._id)}>
                                👁
                            </IconButton>
                            <IconButton style={{ marginLeft: 15 }} edge="end" onClick={() => props.editReceipe(r._id)}>
                                ✍️
                            </IconButton>
                            <IconButton style={{ marginLeft: 15 }} edge="end" onClick={() => props.deleteReceipe(r._id)}>
                                ❌
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </div>
            ))}
        </List>
    );
}
