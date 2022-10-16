import './App.css';
import {Routing} from "./routing";
import "bootstrap/dist/css/bootstrap.min.css"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
        <Routing/>
        <ToastContainer position='top-right' autoClose={ 3000 } closeOnClick draggable pauseOnHover hideProgressBar={ false } newestOnTop={ false } rtl={ false } />

    </>
  );
}

export default App;
