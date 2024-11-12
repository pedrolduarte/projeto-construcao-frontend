'use client';
import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import Pagina from '../components/Pagina';
import './standard.css';

function GamePage() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            const storedGames = JSON.parse(localStorage.getItem('games')) || [];
            setGames(storedGames);
        };

        fetchGames();
    }, []);

    const excluir = (game) => {
        console.log(`Excluindo jogo: ${game.titulo}`);
        const updatedGames = games.filter(item => item.id !== game.id);
        setGames(updatedGames);
        localStorage.setItem('games', JSON.stringify(updatedGames));
    };

    return (
        <Pagina titulo="Lista de Games">
            <Button
                className="mb-3 custom-add-button"
                href="/games/form"
                style={{ ...styles.button }}
            >
                <FaPlus style={{ marginRight: '10px' }} /> Adicionar Game
            </Button>

            <table className="table table-striped custom-table">
                <thead>
                    <tr>
                        <th>Capa</th>
                        <th>Título</th>
                        <th>Gênero</th>
                        <th>Data de Lançamento</th>
                        <th>Desenvolvedor</th>
                        <th>Modo de Jogo</th>
                        <th>Classificação Etária</th>
                        <th>Duração de Jogo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game, index) => {
                        return (
                            <tr key={game.id || index}>
                                <td>
                                    <img
                                        src={game.imagem}
                                        alt={game.titulo}
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                </td>
                                <td>{game.titulo}</td>
                                <td>{game.genero}</td>
                                <td>{game.dataLancamento}</td>
                                <td>{game.desenvolvedor}</td>
                                <td>{game.modoDeJogo}</td>
                                <td>{game.classificacao}</td>
                                <td>{game.duracao}</td>
                                <td className="text-center">
                                    <Button className="me-2" href={`/games/form?id=${game.id}`}>
                                        <FaPen />
                                    </Button>
                                    <Button variant="danger" onClick={() => excluir(game)}>
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

export default GamePage;
