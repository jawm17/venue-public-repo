import React, {useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// private route redirects to home page is user is unauthenticated
const PrivateRoute = ({component : Component, roles, ...rest})=>{
    const { isAuthenticated } = useContext(AuthContext);
    return(
        <Route {...rest} render={props =>{
            if(!isAuthenticated)
                return <Redirect to={{ pathname: '/', 
                                       state : {from : props.location}}}/>
    
            return <Component {...props}/>
        }}/>
    )
}

export default PrivateRoute;