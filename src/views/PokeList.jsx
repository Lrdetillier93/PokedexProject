import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Typography,
    TextField
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Search from "@mui/icons-material/Search"
import { useHistory } from "react-router-dom";
import axios from "axios";


const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const gen1 = importAll(require.context('../../node_modules/pokemon-sprites/sprites/pokemon/versions/generation-ii/crystal/transparent', false, /\.(png|jpe?g|svg)$/));

const useStyles = makeStyles(theme => ({
    listContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px'
    },
    cardMedia: {
        margin: "auto",
    },
    cardContent: {
        textAlign: "center",
    },
    search: {
        display: "flex",
        paddingLeft: '20px',
        paddingRight: '20px',
        marginTop: '5px',
        marginBottom: '5px'
    },
    icon: {
        alignSelf: "flex-end",
        marginBottom: "5px",
    },
    textfield: {
        width: "200px",
        margin: "5px",
    }
}));

const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

const PokeList = props => {
    const [pokemon, setPokemon] = useState();
    const [search, setSearch] = useState("");
    const classes = useStyles();
    const history = useHistory();

    const handleSearch = e => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=251`)
            .then(res => {
                const newData = {};
                res.data['results'].forEach((pokemon, i) => {
                    newData[i + 1] = {
                        id: i + 1,
                        name: pokemon.name,
                        sprite: gen1[`${i + 1}.png`]
                    };
                });
                setPokemon(newData);
            })
            .catch(err => console.log(err))
    }, [])

    const getPokemon = (pid) => {
        console.log(pokemon[pid]);
        const { id, name, sprite } = pokemon[pid]

        return (
            <Grid item xs={4} key={pid}>
                <Card onClick={() => history.push(`/${pid}`)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        style={{ width: "130px", height: "130px" }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography>{`${id}. ${capitalize(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.search}>
                        <Search className={classes.icon} />
                        <TextField className={classes.textfield}
                            label="Pokemon"
                            variant="standard"
                            onChange={handleSearch}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            {pokemon ? (
                <Grid container spacing={2} className={classes.listContainer}>
                    {Object.keys(pokemon).map(
                        pid =>
                            pokemon[pid].name.includes(search) &&
                            getPokemon(pid)
                    )}
                </Grid>

            ) : (
                <CircularProgress />
            )}
        </>
    )
}

export default PokeList;