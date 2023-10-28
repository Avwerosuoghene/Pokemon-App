import { useEffect, useState } from "react";
import { PokemonCatI } from "../../models/types";
import { LinearProgress } from "@mui/material";

import classes from "./category.module.scss";
import useHttp from "../../hooks/useHttp";
import { getCategories, getPokemon } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { pokemonInfoActions } from "../../redux/store/pokemon";
import { useNavigate } from "react-router-dom";
import { HelperService } from "../../components/snackbar/helpers";



const Category = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { sendRequest } = useHttp();
  const [pokemonCatgories, setpokemonCatgories] = useState<Array<PokemonCatI>>([]);
  const pokemonStore = useSelector((state: any) => state.pokemon);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (pokemonStore.category.length > 0) {
      setCategories(pokemonStore.category)
    } else {
      fetchCategories();
    }
   
  }, []);

  // const getNumberFromUrl = (url: any) => {
  //   const matches = url.match(/(\d+)\/?$/);
  //   if (matches) {
  //     return parseInt(matches[1], 10);
  //   }
  //   return null; 
  // }


  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const apiResponse = await sendRequest(getCategories);
      setIsLoading(false);
      if (apiResponse.isSuccess) {
        dispatch(pokemonInfoActions.setCategory({ data: apiResponse.results}));
        setCategories(apiResponse.results)
      }
    } catch (error) {
      setIsLoading(false);
      console.log(`error in fetching categories  ${error}`);
    }
  }

  const setCategories = (category: Array<PokemonCatI>) =>  {
    setpokemonCatgories(category)
  }
 
  const onCategorySelect = async (index: number, category:any ) =>  {
    try {
      setIsLoading(true);
      const id: any = HelperService.getNumberFromUrl(category.url);
      const apiResponse = await sendRequest(getPokemon, id);
      setIsLoading(false);
      if (apiResponse.isSuccess) {
        dispatch(pokemonInfoActions.setPokemons({ data: apiResponse.pokemon, id: id}));
     
        navigate(`/categories/${id}`)
      }
    } catch (error) {
      setIsLoading(false);
      console.log(`error in fetching pokemons ${error}`);
    }
  }

  return (
    <div className={classes.category_section_container}>
      {isLoading && <LinearProgress />}
      <h1>Pokemon Categories</h1>
      <div className={classes.records_container}>
        {pokemonCatgories.map((category, index) => (
          <div key={category.url} className={classes.category_element}  onClick = {()=> onCategorySelect(index+1, category)}>
            <p>{category.name}</p>
          </div>

        ))

        }
      </div>

    </div>
  );
};

export default Category;