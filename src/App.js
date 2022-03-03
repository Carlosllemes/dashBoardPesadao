import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar/NavBar'


class App extends Component {
    

 render(){
   

   return(
     <Container>
       <NavBar/>

     </Container>
   )
 }
}

export default App;
