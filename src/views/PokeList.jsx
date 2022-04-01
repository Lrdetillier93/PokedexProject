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
import {cyan} from "@mui/material/colors";
import Search from "@mui/icons-material/Search"
import { useHistory } from "react-router-dom";
import axios from "axios";

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
    },
    navBar: {
        backgroundColor: "#222222",
        display: "flex",
        justifyContent: "space-between"
    }
}));

const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

const PokeList = props => {
    const [pokemon, setPokemon] = useState();
    const [search, setSearch] = useState("");
    const { games } = props;
    const classes = useStyles();
    const history = useHistory();

    const swapSprites = (i) =>{
        if(games === "crystal"){
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${i+1}.png`
        }
        if(games === "emerald"){
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${i+1}.png`
        }
        if(games === "dpp"){
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/${i+1}.png`
        }
        if(games === "bw"){
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${i+1}.gif`
        }
    }

    const swapGet = () => {
        if(games === "crystal"){
            return `https://pokeapi.co/api/v2/pokemon?limit=251`
        }
        if(games === "emerald"){
            return `https://pokeapi.co/api/v2/pokemon?limit=386`
        }
        if(games === "dpp"){
            return `https://pokeapi.co/api/v2/pokemon?limit=493`
        }
        if(games === "bw"){
            return `https://pokeapi.co/api/v2/pokemon?limit=649`
        }
    }

    const handleSearch = e => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        axios.get(swapGet())
            .then(res => {
                const newData = {};
                res.data['results'].forEach((pokemon, i) => {
                    newData[i + 1] = {
                        id: i + 1,
                        name: pokemon.name,
                        sprite: swapSprites(i)
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
                <Toolbar className={classes.navBar}>
                    <div className={classes.search}>
                        <Search className={classes.icon} />
                        <TextField className={classes.textfield}
                            label="Pokemon"
                            variant="outlined"
                            color="primary"
                            size="small"
                            focused
                            onChange={handleSearch}
                        />
                    </div>
                    <button onClick={e=> history.push("/")}>Select new generation</button>
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