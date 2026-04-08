import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/FormCliente';
import ListCliente from "./views/cliente/ListCliente";
import FormEntregador from './views/entregador/FormEntregador';
import ListEntregador from "./views/entregador/ListEntregador";
import Home from './views/home/Home';
import FormCategoriaProduto from "./views/produto/FormCategoriaProduto";
import FormProduto from './views/produto/FormProduto';
import ListCategoriaProduto from "./views/produto/ListCategoriaProduto";
import ListProduto from "./views/produto/ListProduto";
import FormPromocao from "./views/promocao/FormPromocao";
import ListPromocao from "./views/promocao/ListPromocao";

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path="form-entregador" element={ <FormEntregador/> } />
                <Route path="form-categoria-produto" element={ <FormCategoriaProduto/> }/>
                <Route path="list-categoria-produto" element={ <ListCategoriaProduto/> }/>
                <Route path="list-cliente" element={<ListCliente />}/>
                <Route path="list-produto" element={<ListProduto />}/>
                <Route path="list-entregador" element={<ListEntregador />}/>
                <Route path="form-promocao" element={<FormPromocao />}/>
                <Route path="list-promocao" element={<ListPromocao />}/>
            </Routes>
        </>
    )
}

export default Rotas
