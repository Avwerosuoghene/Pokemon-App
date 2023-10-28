
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { snackBarActions } from './redux/store/snackbar';
import { Fragment } from 'react';
import SnackBar from "./components/snackbar/snackbar";

import AppRoutes from './App-routes';

function App() {
  const snackBarState = useSelector((state: any) => state.snackBar);
  const handleSnackBarClose = () => {
    dispatch(snackBarActions.close());
  };
  const dispatch = useDispatch();

  return (
    <Fragment>
      {/* <Header/> */}
      <AppRoutes/>
      <SnackBar open={snackBarState.isOpen} close={handleSnackBarClose}  severity = {snackBarState.severity} message = {snackBarState.message} />
    </Fragment>
  );
}

export default App;
