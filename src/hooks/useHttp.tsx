import { snackBarActions } from "../redux/store/snackbar";
import { useDispatch } from "react-redux";


const useHttp = () => {
    const dispatch = useDispatch();
    const sendRequest = async (httpFunction: any, payload?: any) => {
        let message = "";
    
        let asyncResponse;
        console.log(httpFunction)
          asyncResponse = await httpFunction(payload);
     
    
      
     
    
        const isSuccess = asyncResponse.response.status === 200;
        console.log(asyncResponse)
        if (isSuccess === true) {
          message = 'Successful';
          const data = asyncResponse.response.data;
          data.isSuccess = true;
          openSnackBarAction(message, "success");
          return data;
        }
     
        message = 'Failed';
        // console.log(asyncResponse.response.data.data[0].message);
        // message = asyncResponse.response.data.data
        //   ?asyncResponse.response.data.data[0].message
        //   : asyncResponse.response.data.message ;
        openSnackBarAction(message, "warning");
        return false;
      };

      const openSnackBarAction = (message: string, severity: string) => {
        dispatch(snackBarActions.open({ message, severity }));
      };
    
      return { sendRequest };
}

export default useHttp;
