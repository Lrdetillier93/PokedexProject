import React, { useState } from 'react';
import { Typography, AppBar, Toolbar, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";

const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

const useStyles = makeStyles({
    info: {
        display: "flex",
        backgroundColor: "#31F7F8",
        justifyContent: "center",
    },
    infotext: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "2em",
        marginRight: "2em",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        marginTop: "1em"
    },
    card: {
        width: "50%",
        alignItems: "center"
    },
    navBar: {
        backgroundColor: "#222222",
        display: "flex",
        justifyContent: "space-between"
    },
    linkText: {
        textDecoration: "none",
        color: "#3C678B"
    },
    flex:{
        display: "flex",
        alignItems: "center"
    },
    links: {
        marginLeft: "5px",
        display: "flex",
        alignItems: "center"
    }
})

const CreatePokemonPage = props => {
    const { id, name, abilities, height, weight, types, stats } = props.pokemon;
    const { games } = props;
    const [game, setGame] = useState(games);
    const classes = useStyles();
    const history = useHistory();

    const swapSprite = () => {
        if (game === "crystal") {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${id}.png`
        }
        if (game === "emerald") {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${id}.png`
        }
        if (game === "dpp"){
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/${id}.png`
        }
        if (game === "bw"){
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
        }
    }

    console.log(games)

    return (
        <>
            <AppBar position="static">
                <Toolbar className={classes.navBar}>
                    <div className={classes.flex}>
                        <p>Other generations: </p>
                        <div className={classes.links}>
                            {
                                game === "crystal"? 
                                <p>GSC</p>:
                                <a href="#" onClick={e => setGame("crystal")} className={classes.linkText}>GSC</a>
                            }
                            /
                            {
                                game === "emerald"?
                                <p>RSE</p>:
                                <a href="#" onClick={e => setGame("emerald")} className={classes.linkText}> RSE</a>
                            }
                            /
                            {
                                game === "dpp"?
                                <p>DPP</p>:
                                <a href="#" onClick={e => setGame("dpp")} className={classes.linkText}> DPP</a>
                            }
                            /
                            {game === "bw"?
                            <p>BW</p>:
                            <a href="#" onClick={e => setGame("bw")} className={classes.linkText}> BW</a>
                            }
                        </div>
                    </div>
                    <button onClick={e => history.push("/")}>Select new generation</button>
                </Toolbar>
            </AppBar>
            <div className={classes.container}>

                <Card className={classes.card}>
                    <Typography variant="h2" style={{ backgroundColor: "#31F7F8" }}>
                        {`${id}. ${capitalize(name)}`}
                    </Typography>
                    <div className={classes.info}>
                        <div style={{display: "flex", alignItems: "center"}}>
                        {game === "crystal"?
                            <img src={swapSprite()} style={{height: "150px", width: "150px"}} />:
                        <img src={swapSprite()} alt="" style={{ height: "100px", width: "100px"}} />
                        }
                        </div>
                        <div className={classes.infotext}>
                            <Typography><strong>Types:</strong> {types.map((typeInfo) => {
                                const { type } = typeInfo;
                                const { name } = type
                                return (
                                    <Typography key={name}> {`${capitalize(name)}`} </Typography>
                                )
                            })}
                            </Typography>
                            {game === "emerald" || game === "dpp" ?
                                <Typography><strong>Abilities:</strong> {abilities.map((abilityInfo) => {
                                    const { ability, is_hidden } = abilityInfo;
                                    const { name } = ability

                                    return (
                                        is_hidden?
                                        <Typography key={name}> {`${capitalize(name)}`} </Typography>: ""
                                    ) 
                                })}
                                </Typography> : ""
                            }
                            {game === "bw"?
                                <Typography><strong>Abilities:</strong> {abilities.map((abilityInfo) => {
                                    const { ability, is_hidden } = abilityInfo;
                                    const { name } = ability

                                    return (
                                        <Typography key={name}> {`${capitalize(name)}`} </Typography>
                                    ) 
                                })}
                                </Typography> : ""
                            }
                            <Typography><strong>Height:</strong> {height}</Typography>
                            <Typography><strong>Weight:</strong> {weight}</Typography>
                        </div>
                        <div className={classes.infotext}>
                            <Typography>
                                <strong>Stats:</strong>
                                {stats.map((statsInfo) => {
                                    const { base_stat, stat } = statsInfo;
                                    const { name } = stat
                                    return (
                                        <Typography key={name}> {`${capitalize(name)}: ${base_stat}`}</Typography>
                                    )
                                })}
                            </Typography>
                        </div>
                    </div>
                </Card>
                <button onClick={e => history.push("/list")} style={{ marginTop: "1em" }}>Back to list</button>
            </div>
        </>
    )
}

export default CreatePokemonPage;