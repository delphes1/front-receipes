import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const TaskFormTextField = props => {
    return (
        <TextField
            style={{ marginVertical: 15, ...props.style }}
            label={props.label}
            value={props.value}
            placeholder={props.placeholder}
            fullWidth={props.fullWidth ?? true}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            onChange={props.onChange}
        />
    )
}

const getRandomId = () => Math.round(Math.random() * 1000000)

export default function TaskForm(props) {

    console.log("START", props.formTask)
    const [taskTitle, setTaskTitle] = useState(props.formTask ? props.formTask.title : undefined)
    const [taskAuthor, setTaskAuthor] = useState(props.formTask ? props.formTask.author : undefined)
    const [taskDesc, setTaskDesc] = useState(props.formTask ? props.formTask.description : undefined)

    const isUpdateMode = () => (props.formTask && props.formTask._id != null)

    const save = () => {
        const task = getTaskFromState()
        if (isUpdateMode()) {
            //PUT (update)
            props.updateTask({ ...task, _id: props.formTask._id })
        } else {
            //POST (create)
            props.addTask(task)
        }
    }

    const getTaskFromState = () => {
        const result = {
            title: taskTitle,
            author: taskAuthor,
            description: taskDesc
        }
        console.log("RESULT", result)
        return result
    }

    return (
        <div style={{ textAlign: 'left' }}>
            <TaskFormTextField
                label="Titre de la tâche"
                placeholder="Quoi ?"
                value={taskTitle}
                onChange={e => setTaskTitle(e.target.value)}
            />

            <TaskFormTextField
                label="Auteur"
                placeholder="Qui ?"
                value={taskAuthor}
                onChange={e => setTaskAuthor(e.target.value)}
            />

            <TaskFormTextField
                label="Description de la tâche"
                placeholder="Décrire la tâche ..."
                value={taskDesc}
                onChange={e => setTaskDesc(e.target.value)}
            />

            <div style={{ textAlign: 'center' }}>
                <Button variant="contained" color="primary" style={{ margin: '30px 5px' }} size="large" onClick={() => save()}>
                    {isUpdateMode() ? "Modifier" : "Ajouter"} la tâche
                </Button>
                <Button variant="contained" style={{ margin: '30px 5px' }} size="large" onClick={props.cancelTask}>
                    Annuler
                </Button>
            </div>

        </div>
    )
}
