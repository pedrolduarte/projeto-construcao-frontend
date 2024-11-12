'use client';
import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import Pagina from '../components/Pagina';
import './standard.css';

function QuadrinhoPage() {
    const [quadrinhos, setQuadrinhos] = useState([]);

    useEffect(() => {
        const fetchQuadrinhos = async () => {
            const storedQuadrinhos = JSON.parse(localStorage.getItem('quadrinhos')) || [];
            setQuadrinhos(storedQuadrinhos);
        };

        fetchQuadrinhos();
    }, []);

    const excluir = (quadrinho) => {
        console.log(`Excluindo quadrinho: ${quadrinho.titulo}`);
        const updatedQuadrinhos = quadrinhos.filter(item => item.id !== quadrinho.id);
        setQuadrinhos(updatedQuadrinhos);
        localStorage.setItem('quadrinhos', JSON.stringify(updatedQuadrinhos));
    };

    return (
        <Pagina titulo="Lista de Quadrinhos">
            <Button
                className="mb-3 custom-add-button"
                href="/quadrinhos/form"
                style={{ ...styles.button }}
            >
                <FaPlus style={{ marginRight: '10px' }} /> Adicionar Quadrinho
            </Button>

            <table className="table table-striped custom-table">
                <thead>
                    <tr>
                        <th>Capa</th>
                        <th>Título</th>
                        <th>Gênero</th>
                        <th>Data de Lançamento</th>
                        <th>Status</th>
                        <th>Nº Edições</th>
                        <th>Avaliação</th>
                        <th>Sinopse</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {quadrinhos.map((quadrinho, index) => {
                        return (
                            <tr key={quadrinho.id || index}>
                                <td>
                                    <img
                                        src={quadrinho.imagem}
                                        alt={quadrinho.titulo}
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                </td>
                                <td>{quadrinho.titulo}</td>
                                <td>{quadrinho.genero}</td>
                                <td>{quadrinho.dataLancamento}</td>
                                <td>{quadrinho.status}</td>
                                <td>{quadrinho.numEdicoes}</td>
                                <td>{quadrinho.avaliacao}</td>
                                <td>{quadrinho.sinopse}</td>
                                <td className="text-center">
                                    <Button className="me-2" href={`/quadrinhos/form?id=${quadrinho.id}`}>
                                        <FaPen />
                                    </Button>
                                    <Button variant="danger" onClick={() => excluir(quadrinho)}>
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Pagina>
    );
}

const styles = {
    button: {
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
        onMouseEnter: (e) => (e.target.style.transform = 'scale(1.05)'),
        onMouseLeave: (e) => (e.target.style.transform = 'scale(1)'),
    }
};

export default QuadrinhoPage;
