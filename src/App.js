import './App.css';
import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TasksList from './components/TasksList';
import Typography from '@material-ui/core/Typography';
import TaskForm from './components/TaskForm';
import TaskDetail from './components/TaskDetail';
import Paper from '@material-ui/core/Paper';
import Header from './components/Header'
const axios = require('axios');

function App() {

  const [showForm, setShowForm] = useState(false)
  const [tasks, setTasks] = useState([])
  const [tasksLoading, setTasksLoading] = useState(true)

  const [taskDetail, setTaskDetail] = useState({})
  const [showTaskDetail, setShowTaskDetail] = useState(false)

  const [formTask, setFormTask] = useState(undefined)

  useEffect(() => {
    fetchTasksBackend()
  }, [])

  const showEditForm = (data) => {
    setFormTask(data)
    setShowForm(true)
  }

  const fetchTasksBackend = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks/')
      setTasks(response.data)
      setTasksLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const addTaskBackend = async task => {
    if (task.title) {
      try {
        const response = await axios.post('http://localhost:3000/api/tasks/', task, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        await fetchTasksBackend()
        setShowForm(false)
      } catch (err) {
        console.log(err)
      }
    } else {
      alert("Veuillez donner un nom à la recette pour pouvoir l'ajouter.")
    }
  }

  const updateTaskBackend = async task => {
    if (task.title) {
      if (task._id != null) {
        try {
          const response = await axios.put(`http://localhost:3000/api/tasks/${task._id}`, task, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          await fetchTasksBackend()
          setShowForm(false)
        } catch (err) {
          console.log(err)
        }
      } else {
        alert("Impossible de modifier une tache sans id.")
      }
    } else {
      alert("Veuillez donner un nom à la tache pour pouvoir l'ajouter.")
    }
  }

  const deleteTaskBackend = async taskId => {
    if (taskId != null) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/tasks/${taskId}`)
        await fetchTasksBackend()
      } catch (err) {
        console.log(err)
      }
    } else {
      alert("deleteTaskBackend doit recevoir un id")
    }
  }

  const fetchTaskBackendAndEdit = async taskId => {
    if (taskId != null) {
      try {
        const response = await axios.get(`http://localhost:3000/api/tasks/${taskId}`)
        showEditForm(response.data)
      } catch (err) {
        console.log(err)
      }
    } else {
      alert("fetchTaskBackendAndDisplay doit recevoir un id")
    }
  }

  const fetchTaskBackendAndDisplay = async taskId => {
    if (taskId != null) {
      try {
        const response = await axios.get(`http://localhost:3000/api/tasks/${taskId}`)
        setTaskDetail(response.data)
        setShowTaskDetail(true)
      } catch (err) {
        console.log(err)
      }
    } else {
      alert("fetchTaskBackendAndDisplay doit recevoir un id")
    }
  }

  return (

    <div className="App" style={{ maxWidth: '60vw', margin: '0 auto', marginBottom: 40 }}>
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <Button size="small" id="checkapi" variant="contained" onClick={async () => {
          try {
            const response = await axios.get('https://us-central1-nodeproject-16ae1.cloudfunctions.net/webApii/api/status')
            if (response.status == 200) {
              if (response.data.success === true) {
                alert("Succès : Connexion avec l'API OK.")
              } else {
                alert(`Échec : le endpoint /status devrait répondre {"success":true} mais a répondu ` + JSON.stringify(response.data))
              }
            } else {
              alert("Échec : le endpoint /status a répondu avec un code retour " + response.status)
            }
          } catch (err) {
            alert("Échec : la tentative de connexion au endpoint /status a généré l'erreur suivante :\n" + err)
          }
        }}>
          Check API
        </Button>
      </div>

      <header style={{ margin: 30, textAlign: 'center' }}>
        <Typography variant="h1">
          Tasks App
        </Typography>

      </header>

      {
        tasksLoading
          ?
          <div align="center">
            <Typography variant="h5">
              Chargement des taches...
            </Typography>
          </div>
          :
          (
            showTaskDetail ?
              <Paper elevation={3} style={{ padding: 30 }}>
                <TaskDetail
                  task={taskDetail}
                  cancelTask={() => setShowTaskDetail(false)}
                />
              </Paper>
              :
              (
                showForm
                  ?
                  <Paper elevation={3} style={{ padding: 30 }}>
                    <TaskForm
                      addTask={task => addTaskBackend(task)}
                      updateTask={task => updateTaskBackend(task)}
                      cancelTask={() => setShowForm(false)}
                      formTask={formTask}
                    />
                  </Paper>
                  :
                  <div align="center">

                    <Button variant="contained" color="primary" style={{ margin: 30 }} size="large" onClick={() => showEditForm()}>
                      Ajouter une tâche
                    </Button>


                    {tasks.length > 0
                      ?
                      <Paper elevation={3}>

                        <TasksList
                          tasks={tasks}
                          editTask={id => fetchTaskBackendAndEdit(id)}
                          displayTask={id => fetchTaskBackendAndDisplay(id)}
                          deleteTask={id => deleteTaskBackend(id)}
                        />
                      </Paper>
                      :
                      <Typography variant="h5">
                        Aucune tâche enregistrée.
                      </Typography>
                    }

                  </div>
              )
          )
      }


    </div>
  );
}

export default App;
