import { Link } from "react-router-dom";
import { Typography, AppBar, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";

const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

const useStyles = makeStyles({
    info: {
        display: "flex",
    },
    infotext: {
        display: "flex",
        flexDirection: "column",
        color: "white",
        marginLeft: "2em",
        marginRight: "2em"
    }
})

const CreatePokemonPage = props => {
    const { id, name, abilities, height, weight, types, sprites, stats } = props.pokemon;
    const { front_default } = sprites;
    const classes = useStyles();
    const history = useHistory();


    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/">Home</Link>
                </Toolbar>
            </AppBar>
            <Typography variant="h2">
                {`${id}. ${capitalize(name)}`}
            </Typography>
            <div className={classes.info}>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${id}.png` }alt="" style={{ height: "200px", width: "200px" }} />
                <div className={classes.infotext}>
                    <Typography><strong>Types:</strong> {types.map((typeInfo) => {
                        const { type } = typeInfo;
                        const { name } = type
                        return (
                            <Typography key={name}> {`${capitalize(name)}`} </Typography>
                        )
                    })}
                    </Typography>
                    {/* <Typography><strong>Abilities:</strong> {abilities.map((abilityInfo) => {
                        const { ability } = abilityInfo;
                        const { name } = ability
                        return (
                            <Typography key={name}> {`${capitalize(name)}`} </Typography>
                        )
                    })}
                    </Typography> */}
                    <Typography><strong>Height:</strong> {height}</Typography>
                    <Typography><strong>Weight:</strong> {weight}</Typography>
                </div>
                <div className={classes.infotext}>
                    <Typography>
                        <strong>Stats:</strong>
                        {stats.map((statsInfo) => {
                            const {base_stat, stat} = statsInfo;
                            const {name} = stat
                            return(
                                <Typography key = {name}> {`${capitalize(name)}: ${base_stat}`}</Typography>
                            )
                        })}
                    </Typography>
                </div>
            </div>
            <button onClick={e => history.push("/list")}>Back to list</button>
        </>
    )
}

export default CreatePokemonPage;