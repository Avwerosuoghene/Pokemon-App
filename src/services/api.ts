
  import axios from "axios";
  const baseUrl = process.env.REACT_APP_BASE_URL;

  


  export const getCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl}type`);
      return { response };
    } catch (error: any) {
      console.log(error);
      const errorRes = error;
      return errorRes;
    }
  };

  export const getPokemon = async (index: number) => {
    try {
        const response = await axios.get(`${baseUrl}type/${index}`);
        return { response };
      } catch (error: any) {
        console.log(error);
        const errorRes = error;
        return errorRes;
      }
  }

  export const getPokemonInfo = async (index: number ) => {
    console.log(index)
    try {
        const response = await axios.get(`${baseUrl}pokemon/${index}`);
        return { response };
      } catch (error: any) {
        console.log(error);
        const errorRes = error;
        return errorRes;
      }
  }
  

 
  

  

  
  