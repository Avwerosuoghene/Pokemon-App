import { useEffect, useState } from "react";
import classes from "./pokemon.module.scss";
import { Box, Button, LinearProgress, Pagination, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPokemon, getPokemonInfo } from "../../services/api";
import useHttp from "../../hooks/useHttp";
import { pokemonInfoActions } from "../../redux/store/pokemon";
import { HelperService } from "../../components/snackbar/helpers";
// or

const itemsPerPage = 10;
const Pokemon = () => {
    const pokemonStore = useSelector((state: any) => state.pokemon.pokemons);
    const [page, setPage] = useState(1);
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const { sendRequest } = useHttp();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterStatus, setFilterStatus] = useState(false);


    const [displayedPokemons, setDisplayedPokemons] = useState([]);


    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;



    useEffect(() => { }, [displayedPokemons])




    useEffect(
        () => {
            if (pokemonStore.length > 0) {
                setPokemonData(pokemonStore)
            } else {
                fetchPokemonData()
            }
        }
        , [])

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
        onNameSearch('')
    };


    const fetchPokemonData = async () => {
        try {
            setIsLoading(true);
            const apiResponse = await sendRequest(getPokemon, id);
            setIsLoading(false);
            if (apiResponse.isSuccess) {
                if (id !== undefined) {
                    dispatch(pokemonInfoActions.setPokemons({ data: apiResponse.pokemon, id }));
                    setPokemons(apiResponse.pokemon);
                    setPokemonData(apiResponse.pokemon);
                }
             
            }
        } catch (error) {
            setIsLoading(false);
            console.log(`error in fetching pokemon data ${error}`);
        }
    }

    const setPokemonData = (data: any) => {

        setDisplayedPokemons(paginateData(data, false))


    }

    const onNameSearch = (value: string) => {

        
        if (value !== "") {
            setFilterStatus(true)
            const filteredValue = pokemonStore.data.filter((pokemon: any) => {
                return pokemon.pokemon.name.toLowerCase().includes(value)
            })
            setPokemons(filteredValue)
            setDisplayedPokemons(paginateData(filteredValue, true))
        } else {
            setFilterStatus(false)
            setPokemons(pokemonStore.data)
            setDisplayedPokemons(paginateData(pokemonStore.data, true))
        }


    }

    const getPokemonDetails = async (pokemon: any) => {
        try {
            setIsLoading(true);
            const id = HelperService.getNumberFromUrl(pokemon.pokemon.url);
            const apiResponse = await sendRequest(getPokemonInfo, id);
            setIsLoading(false);
            if (apiResponse.isSuccess) {
              dispatch(pokemonInfoActions.setDetails({ data: apiResponse.pokemon}));
           
              navigate(`/detail/${id}`)
            }
          } catch (error) {
            setIsLoading(false);
            console.log(`error in fetching pokemon list ${error}`);
          }
    }

    const paginateData = (data: any, filterOn: boolean) => {
        if (filterStatus) {
            return data.slice(startIndex, endIndex)
        } else
            return data.length <= 25 ? data : data.slice(startIndex, endIndex)
    }

    const navigateBack = () => {
        navigate(`/categories`)
    } 


    return (
        <div className={classes.pokemon_container}>
               <div className={classes.header_elements}>
    
            <Button className={classes.button_back} onClick={navigateBack}>
          Go Back
                </Button>
            </div>

            {pokemonStore.length !== 0 && <TextField id="pokemon-filter" placeholder="Search Pokemon..." label="Pokemon" variant="outlined" onChange={(e) => onNameSearch(e.target.value)} />}


            {isLoading && <LinearProgress />}
            {displayedPokemons.map((pokemon: any, index: any) => (
                <div key={index} className={classes.pokemon_item}  onClick = {()=> getPokemonDetails( pokemon)}>{pokemon.pokemon.name}</div>
            ))}


            {
                pokemons.length > 25 && <Box mt={2} display="flex" justifyContent="center">
                    <Pagination
                        count={Math.ceil(pokemons.length / itemsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                    />
                </Box>


            }

            {
                isLoading === false && pokemonStore.length === 0 && <h3>No Pokemon Found</h3>
            }

        </div>
    );
};

export default Pokemon;