import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Clients from './pages/clients/clients.page';
import Client from './pages/client/client.page';
import Post from './pages/post/post.page';
import Filter from './Filter';

class App extends React.Component{
  render(){
    return (
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to='/clients' className="navbar-brand">Clientes</Link>
          <Filter/>
        </nav>
        <Routes>
          <Route path='/' element={<Clients/>} />
          <Route path='/clients' element={<Clients/>} />
          <Route path='/client/:id' element={<Client/>} />
          <Route path='/edit/:id' element={<Post/>} />
          <Route path='/new' element={<Post/>} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
