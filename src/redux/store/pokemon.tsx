import { createSlice } from "@reduxjs/toolkit";

const  initialPokemonState = {category: [], pokemons:{id: '', data: []}, detailItem: []};

const pokemonInfoSlice = createSlice({
    name : 'pokemonInfo',
    initialState: initialPokemonState,
    reducers: {
        setCategory(state, action: {payload: {data: []}}) {
            state.category = action.payload.data;
          
        },
        setPokemons(state, action: {payload: {id: string,data: []}}) {
            state.pokemons.data = action.payload.data;
            state.pokemons.id = action.payload.id;
          
        },
        setDetails(state, action: {payload: {data: []}}) {
            state.detailItem = action.payload.data
          
        },
    }
});

export const pokemonInfoActions = pokemonInfoSlice.actions;

export default pokemonInfoSlice;