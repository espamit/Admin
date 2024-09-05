// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     const isAuthenticated = useSelector((state) => state.auth.isWalletConnected);
//     const token = localStorage.getItem('token'); // <-- Added token check

//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 isAuthenticated && token ? ( // <-- Added token check to condition
//                     <Component {...props} />
//                 ) : (
//                     <Redirect to="/login" /> // <-- Redirect to login if not authenticated or no token
//                 )
//             }
//         />
//     );
// };

// export default PrivateRoute;
