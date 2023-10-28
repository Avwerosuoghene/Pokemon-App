import { snackBarActions } from "../redux/store/snackbar";
import { useDispatch } from "react-redux";


const useHttp = () => {
    const dispatch = useDispatch();
    const sendRequest = async (httpFunction: any, payload?: any) => {
        let message = "";
    
        let asyncResponse;
          asyncResponse = await httpFunction(payload);
     
    
      
     
    
        const isSuccess = asyncResponse.response.status === 200;
        if (isSuccess === true) {
          message = 'Successful';
          const data = asyncResponse.response.data;
          data.isSuccess = true;
          openSnackBarAction(message, "success");
          return data;
        }
     
        message = 'Failed';
        openSnackBarAction(message, "warning");
        return false;
      };

      const openSnackBarAction = (message: string, severity: string) => {
        dispatch(snackBarActions.open({ message, severity }));
      };
    
      return { sendRequest };
}

export default useHttp;
