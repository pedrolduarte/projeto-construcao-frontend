'use client';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import Pagina from '../components/Pagina';
import './standard.css';

function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            const storedUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            setUsuarios(storedUsuarios);
        };

        fetchUsuarios();
    }, []);

    const excluir = (usuario) => {
        const updatedUsuarios = usuarios.filter(item => item.id !== usuario.id);
        setUsuarios(updatedUsuarios);
        localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios));
    };

    const renderFavoritos = (itens) => {
        if (!itens || itens.length === 0) return <span>-</span>;

        return (
            <div className="favoritos-container">
                {itens.slice(0, 2).map((item, index) => (
                    <div key={index} className="favorito-item">
                        <img src={item.imagem} alt={item.nome} className="favorito-img" />
                        <p>{item.nome}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <Pagina titulo="Lista de Usuários">
            <Button
                className="mb-3 custom-add-button"
                href="/usuarios/form"
                style={{
                    background: 'linear-gradient(45deg, #505050, #333333)',
                    borderRadius: '30px',
                    padding: '10px 20px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.3s ease-in-out',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
                <FaPlus style={{ marginRight: '10px' }} /> Adicionar Usuário
            </Button>

            <table className="table table-striped custom-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Gênero</th>
                        <th>Idade</th>
                        <th>Email</th>
                        <th>Animes Favoritos</th>
                        <th>Mangás Favoritos</th>
                        <th>Games Favoritos</th>
                        <th>Quadrinhos Favoritos</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={usuario.id || index}>
                            <td>{usuario.nome}</td>
                            <td>{usuario.genero}</td>
                            <td>{usuario.idade}</td>
                            <td>{usuario.email}</td>

                            <td>{renderFavoritos(usuario.animes)}</td>

                            <td>{renderFavoritos(usuario.mangas)}</td>

                            <td>{renderFavoritos(usuario.games)}</td>

                            <td>{renderFavoritos(usuario.quadrinhos)}</td>

                            <td className="text-center">
                                <Button className="me-2" href={`/usuarios/form?id=${usuario.id}`}>
                                    <FaPen />
                                </Button>
                                <Button variant="danger" onClick={() => excluir(usuario)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Pagina>
    );
}

export default UsuariosPage;
