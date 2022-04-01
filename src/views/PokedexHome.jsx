import React, { useState } from "react";
import { makeStyles, propsToClassKey } from "@mui/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    header: {
        fontFamily: "sans-serif",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center"
    }
});


const PokedexHome = (props) => {
    const [games, setGames] = useState("crystal");
    const history = useHistory();
    const classes = useStyles();
    
    const imageSwap = () =>{
        if(games === "crystal"){
            return "https://archives.bulbagarden.net/media/upload/2/2d/Spr_C_Ethan.png" 
        }
        if(games === "emerald"){
            return "https://archives.bulbagarden.net/media/upload/e/e6/Spr_E_Brendan.png"
        }
        if(games === "dpp"){
            return "https://archives.bulbagarden.net/media/upload/9/9d/Spr_DP_Lucas.png"
        }
        if(games === "bw"){
            return "https://archives.bulbagarden.net/media/upload/c/cd/Spr_B2W2_Nate.png"
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        props.onSubmittedGame(games);
        history.push("/list")
    }

    const handleSelect = e => {
        setGames(e.target.value);
    }

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>Select a Pokedex!</h1>
            <img src={imageSwap()} style={{ height: "200px", width: "200px" }} /><br />
            <form onSubmit = {handleSubmit}>
                <select name="games" id="" value={games}
                    onChange={handleSelect}
                >
                    <option value="crystal">Gold/Silver/Crystal</option>
                    <option value="emerald">Ruby/Sapphire/Emerald</option>
                    <option value="dpp">Diamond/Pearl/Platinum</option>
                    <option value="bw">Black/White/Black 2/White 2</option>
                </select>
                <button>Go!</button>
            </form>
        </div>
    )
}

export default PokedexHome;