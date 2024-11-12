'use client';
import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import Pagina from '../components/Pagina';
import './standard.css';

function AnimesPage() {
    const [animes, setAnimes] = useState([]);

    useEffect(() => {
        const fetchAnimes = async () => {
            const storedAnimes = JSON.parse(localStorage.getItem('animes')) || [];
            setAnimes(storedAnimes);
        };

        fetchAnimes();
    }, []);

    const excluir = (anime) => {
        console.log(`Excluindo anime: ${anime.nome}`);
        const updatedAnimes = animes.filter(item => item.id !== anime.id);
        setAnimes(updatedAnimes);
        localStorage.setItem('animes', JSON.stringify(updatedAnimes));
    };

    return (
        <Pagina titulo="Lista de Animes">
            <Button
                className="mb-3 custom-add-button"
                href="/animes/form"
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
                <FaPlus style={{ marginRight: '10px' }} /> Adicionar Anime
            </Button>

            <table className="table table-striped custom-table">
                <thead>
                    <tr>
                        <th>Imagem</th>
                        <th>Título</th>
                        <th>Gênero</th>
                        <th>Data de Exibição</th>
                        <th>Status</th>
                        <th>Número de Episódios</th>
                        <th>Sinopse</th>
                        <th>Avaliação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {animes.map((anime, index) => {
                        return (
                            <tr key={anime.id || index}>
                                <td>
                                    <img
                                        src={anime.imagem}
                                        alt={anime.titulo}
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                </td>
                                <td>{anime.titulo}</td>
                                <td>{anime.genero}</td>
                                <td>{anime.dataExibicao}</td>
                                <td>{anime.status}</td>
                                <td>{anime.numeroEpisodios}</td>
                                <td>{anime.sinopse}</td>
                                <td>{anime.avaliacao}</td>
                                <td className="text-center">
                                    <Button className="me-2" href={`/animes/form?id=${anime.id}`}>
                                        <FaPen />
                                    </Button>
                                    <Button variant="danger" onClick={() => excluir(anime)}>
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

export default AnimesPage;
