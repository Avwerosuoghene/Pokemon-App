import { useEffect, useState } from "react";
import classes from "./detail.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { pokemonInfoActions } from "../../redux/store/pokemon";
import { getPokemonInfo } from "../../services/api";
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const Detail = () => {

    const pokemonStore = useSelector((state: any) => state.pokemon.detailItem);
    const pokemonList= useSelector((state: any) => state.pokemon.pokemons);
    const [pokemonDetails, setPokemonDetails]: any = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const { sendRequest } = useHttp();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(
        () => {
            if (pokemonStore?.length > 0) {
                setDetails(pokemonStore)
            } else {
                fetchPokemonDetails()
            }
        }
        , [])


    const setDetails = (details: any) => {
        setPokemonDetails(details);
    }

    const navigateBack = () => {
        navigate(`/categories/${pokemonList.id}`)
    } 

    const fetchPokemonDetails = async () => {
        try {
            setIsLoading(true);
            const apiResponse = await sendRequest(getPokemonInfo, id);
            setIsLoading(false);
            if (apiResponse.isSuccess) {
                dispatch(pokemonInfoActions.setDetails({ data: apiResponse }));

                setDetails(apiResponse);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(`error in fetching pokemon details ${error}`);
        }
    }

    return (
        <div className={classes.detail_container}>
            <div className={classes.header_elements}>
            <h1 className={classes.details_header}   >General </h1>
            <Button className={classes.button_back} onClick={navigateBack}>
          Go Back
                </Button>
            </div>
     
            <div className={classes.details_general}>
                <p>Name: {pokemonDetails?.name}</p>
                <p>Base Experience: {pokemonDetails?.base_experience}</p>
                <p>Height: {pokemonDetails?.height}</p>
                <p>Height: {pokemonDetails?.weight}</p>
                <p>Species: {pokemonDetails?.species.name}</p>
            </div>
            <h1 className={classes.details_header}>Abilities</h1>

            {isLoading === false && pokemonDetails?.abilities?.length > 0 && <div className={classes.details_element_container}>


                {pokemonDetails?.abilities?.map((ability: any, index: any) => (

                    <div className={classes.card_element} key={index}>
                        <p>{ability.ability.name}</p>
                    </div>
                ))}



            </div>}

            {isLoading === false && pokemonDetails?.abilities?.length === 0 && <p>No Ability Found</p>}

            <h1 className={classes.details_header}>Forms</h1>

            {isLoading === false && pokemonDetails?.forms?.length > 0 && <div className={classes.details_element_container}>


                {pokemonDetails?.forms?.map((form: any, index: any) => (

                    <div className={classes.card_element} key={index}>
                        <p>{form.name}</p>
                    </div>
                ))}



            </div>}

            {isLoading === false && pokemonDetails?.forms?.length === 0 && <p>No Form Found</p>}

            <h1 className={classes.details_header}>Moves</h1>

            {isLoading === false && pokemonDetails?.moves?.length > 0 && <div className={classes.details_element_container}>


                {pokemonDetails?.moves?.map((move: any, index: any) => (

                    <div className={classes.card_element} key={index}>
                        <p>{move.move.name}</p>
                    </div>
                ))}



            </div>}

            {isLoading === false && pokemonDetails?.moves?.length === 0 && <p>No Moves Found</p>}

            <h1 className={classes.details_header}>Stats</h1>

            {isLoading === false && pokemonDetails?.stats?.length > 0 && <div className={classes.details_element_container}>


                {pokemonDetails?.stats?.map((stat: any, index: any) => (

                    <div className={`${classes.card_element} ${classes.details_stat}`} key={index}>
                        <p>Stat Name: {stat.stat.name}</p>
                        <p>Base Stat: {stat.base_stat}</p>

                    </div>
                ))}



            </div>}

            {isLoading === false && pokemonDetails?.stats?.length === 0 && <p>No Stat Found</p>}

        </div>
    );
};

export default Detail;