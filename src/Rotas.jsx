import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from './views/util/ProtectedRoute';

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
import FormEnderecoCliente from "./views/cliente/FormEnderecoCliente";
import ListEnderecoCliente from "./views/cliente/ListEnderecoCliente";
import FormLogin from "./views/login/FormLogin";

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={<FormLogin />} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
                <Route path="form-cliente" element={<FormCliente />} />
                <Route path="form-endereco-cliente" element={<FormEnderecoCliente />} />
                <Route path="form-produto" element={<ProtectedRoute><FormProduto /></ProtectedRoute>} />
                <Route path="form-entregador" element={<ProtectedRoute><FormEntregador /></ProtectedRoute>} />
                <Route path="form-categoria-produto" element={<ProtectedRoute><FormCategoriaProduto /></ProtectedRoute>} />
                <Route path="list-categoria-produto" element={<ProtectedRoute><ListCategoriaProduto /></ProtectedRoute>} />
                <Route path="/list-cliente" element={<ProtectedRoute><ListCliente /></ProtectedRoute>}/>
                <Route path="list-endereco-cliente" element={<ListEnderecoCliente />} />
                <Route path="list-produto" element={<ProtectedRoute><ListProduto /></ProtectedRoute>} />
                <Route path="list-entregador" element={<ProtectedRoute><ListEntregador /></ProtectedRoute>} />
                <Route path="form-promocao" element={<ProtectedRoute><FormPromocao /></ProtectedRoute>} />
                <Route path="list-promocao" element={<ProtectedRoute><ListPromocao /></ProtectedRoute>} />
            </Routes>
        </>
    )
}

export default Rotas
