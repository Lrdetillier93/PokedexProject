import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Typography, CircularProgress } from "@mui/material";
import CreatePokemonPage from "../components/CreatePokemonPage";



const Pokemon = props => {
    const {id} = useParams();
    const {games} = props;
    const [pokemon, setPokemon] = useState();

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => setPokemon(res.data))
        .catch(err => {
            console.log(err); 
            setPokemon(false);
        })
    }, [id])


    return (
        <>
            {pokemon === undefined && <CircularProgress/>}
            {pokemon !== undefined && pokemon && <CreatePokemonPage pokemon = {pokemon} games = {games}/>}
            {pokemon === false && <Typography>Pokemon not found</Typography>}
        </>
    )
}

export default Pokemon;