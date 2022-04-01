import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    header: {
        fontFamily: "sans-serif"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center"
    }
});

const PokedexHome = () => {
    const [games, setGames] = useState("gsc");
    const history = useHistory();
    const classes = useStyles();

    const handleSubmit = e => {
        e.preventDefault()
        history.push("/list")
    }

    const handleSelect = e => {
        setGames(e.target.value);
    }

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>Search for a Pokedex!</h1>
            <img src="https://archives.bulbagarden.net/media/upload/2/2d/Spr_C_Ethan.png" style={{ height: "200px", width: "200px" }} /><br />
            <form onSubmit = {handleSubmit}>
                <select name="games" id="" value={games}
                    onChange={handleSelect}
                >
                    <option value="gsc">Gold/Silver/Crystal</option>
                </select>
                <button>Go!</button>
            </form>
        </div>
    )
}

export default PokedexHome;