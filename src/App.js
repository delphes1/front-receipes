import './App.css';
import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import ReceipesList from './components/ReceipesList';
import Typography from '@material-ui/core/Typography';
import ReceipeForm from './components/ReceipeForm';
import ReceipeDetail from './components/ReceipeDetail';
import Paper from '@material-ui/core/Paper';
import Header from './components/Header'
const axios = require('axios');

function App() {

  const [showForm, setShowForm] = useState(false)
  const [receipes, setReceipes] = useState([])
  const [receipesLoading, setReceipesLoading] = useState(true)

  const [receipeDetail, setReceipeDetail] = useState({})
  const [showReceipeDetail, setShowReceipeDetail] = useState(false)

  const [formReceipe, setFormReceipe] = useState(undefined)

  useEffect(() => {
    fetchReceipesBackend()
  }, [])

  const showEditForm = (data) => {
    setFormReceipe(data)
    setShowForm(true)
  }

  const fetchReceipesBackend = async () => {
    try {
      const response = await axios.get('https://us-central1-nodeproject-16ae1.cloudfunctions.net/webApii/api/receipes')
      setReceipes(response.data)
      setReceipesLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const addReceipeBackend = async receipe => {
    if (receipe.name) {
      try {
        const response = await axios.post('https://us-central1-nodeproject-16ae1.cloudfunctions.net/webApii/api/receipes', receipe, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        await fetchReceipesBackend()
        setShowForm(false)
      } catch (err) {
        console.log(err)
      }
    } else {
      alert("Veuillez donner un nom à la recette pour pouvoir l'ajouter.")
    }
  }

  const updateReceipeBackend = async receipe => {
    if (receipe.name) {
      if (receipe._id != null) {
        try {
          const response = await axios.put(`https://us-central1-nodeproject-16ae1.cloudfunctions.net/webApii/api/receipes/${receipe._id}`, receipe, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          await fetchReceipesBackend()
          setShowForm(false)
        } catch (err) {
          console.log(err)
        }
      } else {
        alert("Impossible de modifier une recette sans id.")
      }
    } else {
      alert("Veuillez donner un nom à la recette pour pouvoir l'ajouter.")
    }
  }

  const deleteReceipeBackend = async receipeId => {
    if (receipeId != null) {
      try {
        const response = await axios.delete(`https://us-central1-nodeproject-16ae1.cloudfunctions.net/webApii/api/receipes/${receipeId}`)
        await fetchReceipesBackend()
      } catch (err) {
        console.log(err)
      }
    } else {
      alert("deleteReceipeBackend doit recevoir un id")
    }
  }

  const fetchReceipeBackendAndEdit = async receipeId => {
    if (receipeId != null) {
      try {
        const response = await axios.get(`https://us-central1-nodeproject-16ae1.cloudfunctions.net/webApii/api/receipes/${receipeId}`)
        showEditForm(response.data)
      } catch (err) {
        console.log(err)
      }
    } else {
      alert("fetchReceipeBackendAndDisplay doit recevoir un id")
    }
  }

  const fetchReceipeBackendAndDisplay = async receipeId => {
    if (receipeId != null) {
      try {
        const response = await axios.get(`https://us-central1-nodeproject-16ae1.cloudfunctions.net/webApii/api/receipes/${receipeId}`)
        setReceipeDetail(response.data)
        setShowReceipeDetail(true)
      } catch (err) {
        console.log(err)
      }
    } else {
      alert("fetchReceipeBackendAndDisplay doit recevoir un id")
    }
  }

  return (

    <div className="App" style={{ maxWidth: '60vw', margin: '0 auto', marginBottom: 40 }}>
    <div>
      <Header/>
    </div>
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <Button size="small" variant="contained" onClick={async () => {
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
          Cook App
        </Typography>

      </header>

      {
        receipesLoading
          ?
          <div align="center">
            <Typography variant="h5">
              Chargement des recettes...
            </Typography>
          </div>
          :
          (
            showReceipeDetail ?
              <Paper elevation={3} style={{ padding: 30 }}>
                <ReceipeDetail
                  receipe={receipeDetail}
                  cancelReceipe={() => setShowReceipeDetail(false)}
                />
              </Paper>
              :
              (
                showForm
                  ?
                  <Paper elevation={3} style={{ padding: 30 }}>
                    <ReceipeForm
                      addReceipe={receipe => addReceipeBackend(receipe)}
                      updateReceipe={receipe => updateReceipeBackend(receipe)}
                      cancelReceipe={() => setShowForm(false)}
                      formReceipe={formReceipe}
                    />
                  </Paper>
                  :
                  <div align="center">

                    <Button variant="contained" color="primary" style={{ margin: 30 }} size="large" onClick={() => showEditForm()}>
                      Ajouter une recette
                    </Button>


                    {receipes.length > 0
                      ?
                      <Paper elevation={3}>

                        <ReceipesList
                          receipes={receipes}
                          editReceipe={id => fetchReceipeBackendAndEdit(id)}
                          displayReceipe={id => fetchReceipeBackendAndDisplay(id)}
                          deleteReceipe={id => deleteReceipeBackend(id)}
                        />
                      </Paper>
                      :
                      <Typography variant="h5">
                        Aucune recette enregistrée.
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
