import {Route, Routes} from "react-router-dom";
import {HomePage} from "../screens/HomeScreen";

import {PageNotFound} from "../screens/PageNotFound";
import {LogInPage} from "../screens/LogInScreen";
import {IsAuthenticated} from "./routesProtection";

export const Routing = () => {
    return(
        <>
            <Routes>
                <Route path="*" element={<PageNotFound/>}></Route>
                <Route element={<IsAuthenticated/>}>
                    <Route exact path="/" element={<HomePage/>}></Route>
                </Route>
                <Route exact path="/login" element={<LogInPage/>}></Route>
            </Routes>
        </>
    )
}