import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import '../Login.css';
const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button variant="dark" onClick={() => loginWithRedirect()}>Log In<i class="fas fa-sign-in-alt"/></Button>;
  

};

export default Login;