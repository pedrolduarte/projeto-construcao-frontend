'use client';
import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import Pagina from '../components/Pagina';
import './standard.css';

function MangaPage() {
    const [mangas, setMangas] = useState([]);

    useEffect(() => {
        const fetchMangas = async () => {
            const storedMangas = JSON.parse(localStorage.getItem('mangas')) || [];
            setMangas(storedMangas);
        };

        fetchMangas();
    }, []);

    const excluir = (manga) => {
        console.log(`Excluindo manga: ${manga.titulo}`);
        const updatedMangas = mangas.filter(item => item.id !== manga.id);
        setMangas(updatedMangas);
        localStorage.setItem('mangas', JSON.stringify(updatedMangas));
    };

    return (
        <Pagina titulo="Lista de Mangás">
            <Button
                className="mb-3 custom-add-button"
                href="/mangas/form"
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
                <FaPlus style={{ marginRight: '10px' }} /> Adicionar Mangá
            </Button>

            <table className="table table-striped custom-table">
                <thead>
                    <tr>
                        <th>Capa</th>
                        <th>Título</th>
                        <th>Gênero</th>
                        <th>Data de Lançamento</th>
                        <th>Periodicidade</th>
                        <th>Número de Capítulos</th>
                        <th>Enredo</th>
                        <th>Classificação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {mangas.map((manga, index) => {
                        return (
                            <tr key={manga.id || index}>
                                <td>
                                    <img
                                        src={manga.imagem}
                                        alt={manga.titulo}
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                </td>
                                <td>{manga.titulo}</td>
                                <td>{manga.genero}</td>
                                <td>{manga.dataLancamento}</td>
                                <td>{manga.periodicidade}</td>
                                <td>{manga.numeroCapitulos}</td>
                                <td>{manga.enredo}</td>
                                <td>{manga.classificacao}</td>
                                <td className="text-center">
                                    <Button className="me-2" href={`/mangas/form?id=${manga.id}`}>
                                        <FaPen />
                                    </Button>
                                    <Button variant="danger" onClick={() => excluir(manga)}>
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

export default MangaPage;
