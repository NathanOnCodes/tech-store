import PaginaPadrao from 'components/PaginaPadrao';
import Categoria from 'pages/Categorias';
import Carrinho from 'pages/Carrinho';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';

const rotas = {
  categoria: "/categoria/:nomeCategoria",
  carrinho: "/carrinho"
}

export default function Router() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PaginaPadrao />}>
          <Route index element={<Home/>} />
          <Route path={rotas.categoria} element={< Categoria/>} />
          <Route path={rotas.carrinho} element={ <Carrinho /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}