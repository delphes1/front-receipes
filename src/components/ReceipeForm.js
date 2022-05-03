import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const ReceipeFormTextField = props => {
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

const AddIngredientRow = props => {
    return (
        <React.Fragment>
            <Button size="small" variant="contained" color="primary" onClick={props.addEmptyIngredient}>
                Ajouter un ingrédient
            </Button>
            <div></div>
        </React.Fragment>
    )
}

const IngredientRow = props => {
    return (
        <>
            <ReceipeFormTextField
                label="Nom ingrédient"
                placeholder="Saumon frais"
                fullWidth={false}
                value={props.data.name}
                onChange={props.onChangeName}
            />
            <ReceipeFormTextField
                label="Quantité ingrédient"
                placeholder="250"
                fullWidth={false}
                value={props.data.quantity}
                onChange={props.onChangeQuantity}
            />
            <ReceipeFormTextField
                label="Unité ingrédient"
                placeholder="grammes"
                fullWidth={false}
                value={props.data.unit}
                onChange={props.onChangeUnit}
            />
            <IconButton aria-label="delete" style={{ marginTop: 15, marginLeft: 10 }} onClick={() => props.removeIngredientRow(props.index)}>
                ❌
            </IconButton>
            <div></div>
        </>
    )
}

const AddStepRow = props => {
    return (
        <React.Fragment>
            <Button size="small" variant="contained" color="primary" onClick={props.addEmptyStep}>
                Ajouter une étape
            </Button>
            <div></div>
        </React.Fragment>
    )
}

const StepRow = props => {
    return (
        <>
            <ReceipeFormTextField
                label="Description de l'étape"
                placeholder="Découpez le saumon en dés"
                value={props.data.text}
                fullWidth={false}
                style={{ width: 'calc(100% - 65px)' }}
                onChange={props.onChangeText}
            />
            <IconButton aria-label="delete" style={{ marginTop: 15, marginLeft: 10 }} onClick={() => props.removeStepRow(props.index)}>
                ❌
            </IconButton>
            <div></div>
        </>
    )
}

const getRandomId = () => Math.round(Math.random() * 1000000)

export default function ReceipeForm(props) {

    console.log("START", props.formReceipe)
    const [receipeName, setReceipeName] = useState(props.formReceipe ? props.formReceipe.name : undefined)
    const [nbParts, setNbParts] = useState(props.formReceipe ? props.formReceipe.nbParts : undefined)
    const [ingredientRows, setIngredientRows] = useState(props.formReceipe ? props.formReceipe.ingredients.map(ing => ({ ...ing, id: getRandomId() })) : [])
    const [stepRows, setStepRows] = useState((props.formReceipe && props.formReceipe.steps) ? props.formReceipe.steps.map(str => ({ text: str, id: getRandomId() })) : [])

    const isUpdateMode = () => (props.formReceipe && props.formReceipe._id != null)

    const save = () => {
        const receipe = getReceipeFromState()
        if (isUpdateMode()) {
            //PUT (update)
            props.updateReceipe({ ...receipe, _id: props.formReceipe._id })
        } else {
            //POST (create)
            props.addReceipe(receipe)
        }
    }

    const getReceipeFromState = () => {
        const result = {
            name: receipeName,
            nbParts: nbParts,
            ingredients: ingredientRows.map(ir => ({ name: ir.name, quantity: ir.quantity, unit: ir.unit })),
            steps: stepRows.map(sr => sr.text)
        }
        console.log("RESULT", result)
        return result
    }

    return (
        <div style={{ textAlign: 'left' }}>
            <ReceipeFormTextField
                label="Nom de la recette"
                placeholder="Tarte au chèvre et saumon"
                value={receipeName}
                onChange={e => setReceipeName(e.target.value)}
            />
            <ReceipeFormTextField
                label="Nombre de parts"
                placeholder="6"
                value={nbParts}
                onChange={e => setNbParts(e.target.value)}
            />


            <Typography variant="h5" style={{ textAlign: 'left', marginTop: 15 }}>
                Ingrédients :
            </Typography>
            {ingredientRows.map((ir, i) => (
                <IngredientRow
                    key={ir.id}
                    index={i}
                    data={ir}
                    onChangeName={e => setIngredientRows(ingredientRows.map(ingRow => (ingRow.id == ir.id) ? { ...ingRow, name: e.target.value } : ingRow))}
                    onChangeQuantity={e => setIngredientRows(ingredientRows.map(ingRow => (ingRow.id == ir.id) ? { ...ingRow, quantity: e.target.value } : ingRow))}
                    onChangeUnit={e => setIngredientRows(ingredientRows.map(ingRow => (ingRow.id == ir.id) ? { ...ingRow, unit: e.target.value } : ingRow))}
                    removeIngredientRow={index => setIngredientRows(ingredientRows.filter((ir2) => ir2.id != ir.id))}
                />
            ))}
            <AddIngredientRow
                addEmptyIngredient={() => setIngredientRows([...ingredientRows, { id: getRandomId() }])}
            />


            <Typography variant="h5" style={{ textAlign: 'left', marginTop: 15 }}>
                Étapes de la recette :
            </Typography>
            {stepRows.map((sr, i) => (
                <StepRow
                    key={sr.id}
                    index={i}
                    data={sr}
                    removeStepRow={index => setStepRows(stepRows.filter((sr2) => sr2.id != sr.id))}
                    onChangeText={e => setStepRows(stepRows.map(stepRow => (stepRow.id == sr.id) ? { ...stepRow, text: e.target.value } : stepRow))}
                />
            ))}
            <AddStepRow
                addEmptyStep={() => setStepRows([...stepRows, { id: getRandomId() }])}
            />

            <div style={{ textAlign: 'center' }}>
                <Button variant="contained" color="primary" style={{ margin: '30px 5px' }} size="large" onClick={() => save()}>
                    {isUpdateMode() ? "Modifier" : "Ajouter"} la recette
                </Button>
                <Button variant="contained" style={{ margin: '30px 5px' }} size="large" onClick={props.cancelReceipe}>
                    Annuler
                </Button>
            </div>

        </div>
    )
}
