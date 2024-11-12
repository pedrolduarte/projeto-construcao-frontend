'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Form, Button, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Pagina from '../../components/Pagina';
import '../standard.css';

const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    genero: Yup.string().required("Campo obrigatório"),
    idade: Yup.number().required("Campo obrigatório").min(1),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
});

function UsuarioForm() {
    const [usuarioEditado, setUsuarioEditado] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [animesData, setAnimesData] = useState([]);
    const [gamesData, setGamesData] = useState([]);
    const [mangasData, setMangasData] = useState([]);
    const [quadrinhosData, setQuadrinhosData] = useState([]);
    const [selectedAnimes, setSelectedAnimes] = useState([]);
    const [selectedGames, setSelectedGames] = useState([]);
    const [selectedMangas, setSelectedMangas] = useState([]);
    const [selectedQuadrinhos, setSelectedQuadrinhos] = useState([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        const fetchUsuarios = async () => {
            const storedUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            setUsuarios(storedUsuarios);
        };
        fetchUsuarios();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const storedAnimes = JSON.parse(localStorage.getItem('animes')) || [];
            const storedGames = JSON.parse(localStorage.getItem('games')) || [];
            const storedMangas = JSON.parse(localStorage.getItem('mangas')) || [];
            const storedQuadrinhos = JSON.parse(localStorage.getItem('quadrinhos')) || [];

            if (storedAnimes.length === 0) {
                const response = await fetch('http://localhost:3000/animes');
                const animesFromAPI = await response.json();
                localStorage.setItem('animes', JSON.stringify(animesFromAPI));
                setAnimesData(animesFromAPI);
            } else {
                setAnimesData(storedAnimes);
            }

            if (storedGames.length === 0) {
                const response = await fetch('http://localhost:3000/games');
                const gamesFromAPI = await response.json();
                localStorage.setItem('games', JSON.stringify(gamesFromAPI));
                setGamesData(gamesFromAPI);
            } else {
                setGamesData(storedGames);
            }

            if (storedMangas.length === 0) {
                const response = await fetch('http://localhost:3000/mangas');
                const mangasFromAPI = await response.json();
                localStorage.setItem('mangas', JSON.stringify(mangasFromAPI));
                setMangasData(mangasFromAPI);
            } else {
                setMangasData(storedMangas);
            }

            if (storedQuadrinhos.length === 0) {
                const response = await fetch('http://localhost:3000/quadrinhos');
                const quadrinhosFromAPI = await response.json();
                localStorage.setItem('quadrinhos', JSON.stringify(quadrinhosFromAPI));
                setQuadrinhosData(quadrinhosFromAPI);
            } else {
                setQuadrinhosData(storedQuadrinhos);
            }
        };

        fetchData();
    }, []);

    const id = searchParams.get('id');

    useEffect(() => {
        if (id) {
            const usuario = usuarios.find(item => item.id === id);
            if (usuario) {
                setUsuarioEditado(usuario);
                Object.keys(usuario).forEach(key => setValue(key, usuario[key]));
                setSelectedAnimes(usuario.animes || []);
                setSelectedGames(usuario.games || []);
                setSelectedMangas(usuario.mangas || []);
                setSelectedQuadrinhos(usuario.quadrinhos || []);
            }
        }
    }, [id, usuarios, setValue]);

    const onSubmit = (usuarioData) => {
        let updatedUsuarios;

        usuarioData.animes = selectedAnimes;
        usuarioData.games = selectedGames;
        usuarioData.mangas = selectedMangas;
        usuarioData.quadrinhos = selectedQuadrinhos;

        if (usuarioEditado) {
            updatedUsuarios = usuarios.map(item =>
                item.id === usuarioEditado.id ? { ...item, ...usuarioData } : item
            );
        } else {
            const newUsuario = { ...usuarioData, id: `${Date.now()}-${Math.floor(Math.random() * 1000)}` };
            updatedUsuarios = [...usuarios, newUsuario];
        }

        localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios));
        setUsuarios(updatedUsuarios);
        reset();
        router.push('/usuarios');
    };

    const handleItemSelection = (e, type) => {
        const selectedItemId = e.target.value;
        const selectedItem = [...animesData, ...gamesData, ...mangasData, ...quadrinhosData].find(item => item.id === selectedItemId);

        if (type === 'anime') {
            setSelectedAnimes(prevState => {
                if (prevState.some(anime => anime.id === selectedItemId)) {
                    return prevState.filter(anime => anime.id !== selectedItemId);
                } else {
                    return [...prevState, selectedItem];
                }
            });
        } else if (type === 'game') {
            setSelectedGames(prevState => {
                if (prevState.some(game => game.id === selectedItemId)) {
                    return prevState.filter(game => game.id !== selectedItemId);
                } else {
                    return [...prevState, selectedItem];
                }
            });
        } else if (type === 'manga') {
            setSelectedMangas(prevState => {
                if (prevState.some(manga => manga.id === selectedItemId)) {
                    return prevState.filter(manga => manga.id !== selectedItemId);
                } else {
                    return [...prevState, selectedItem];
                }
            });
        } else if (type === 'quadrinho') {
            setSelectedQuadrinhos(prevState => {
                if (prevState.some(quadrinho => quadrinho.id === selectedItemId)) {
                    return prevState.filter(quadrinho => quadrinho.id !== selectedItemId);
                } else {
                    return [...prevState, selectedItem];
                }
            });
        }
    };

    return (
        <Pagina titulo={usuarioEditado ? 'Editar Usuário' : 'Adicionar Usuário'}>
            <div className="usuario-form-container">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-4">
                        <Col>
                            <Form.Group controlId="formNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register('nome')}
                                    placeholder="Digite o nome"
                                    isInvalid={!!errors.nome}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nome?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formGenero">
                                <Form.Label>Gênero</Form.Label>
                                <Form.Control as="select" {...register('genero')} isInvalid={!!errors.genero}>
                                    <option value="">Selecione</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.genero?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col>
                            <Form.Group controlId="formIdade">
                                <Form.Label>Idade</Form.Label>
                                <Form.Control
                                    type="number"
                                    {...register('idade')}
                                    placeholder="Digite a idade"
                                    isInvalid={!!errors.idade}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.idade?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    {...register('email')}
                                    placeholder="Digite o email"
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="formAnimeFavorites">
                        <Form.Label>Animes Favoritos</Form.Label>
                        <div className="form-check-group">
                            {animesData.map(anime => (
                                <div key={anime.id} className="form-check">
                                    <Form.Check
                                        type="checkbox"
                                        label={<><img src={anime.imagem} alt={anime.nome} /> {anime.nome}</>}
                                        value={anime.id}
                                        checked={selectedAnimes.some(selected => selected.id === anime.id)}
                                        onChange={(e) => handleItemSelection(e, 'anime')}
                                    />
                                </div>
                            ))}
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formGameFavorites">
                        <Form.Label>Games Favoritos</Form.Label>
                        <div className="form-check-group">
                            {gamesData.map(game => (
                                <div key={game.id} className="form-check">
                                    <Form.Check
                                        type="checkbox"
                                        label={<><img src={game.imagem} alt={game.nome} /> {game.nome}</>}
                                        value={game.id}
                                        checked={selectedGames.some(selected => selected.id === game.id)}
                                        onChange={(e) => handleItemSelection(e, 'game')}
                                    />
                                </div>
                            ))}
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formMangaFavorites">
                        <Form.Label>Mangás Favoritos</Form.Label>
                        <div className="form-check-group">
                            {mangasData.map(manga => (
                                <div key={manga.id} className="form-check">
                                    <Form.Check
                                        type="checkbox"
                                        label={<><img src={manga.imagem} alt={manga.nome} /> {manga.nome}</>}
                                        value={manga.id}
                                        checked={selectedMangas.some(selected => selected.id === manga.id)}
                                        onChange={(e) => handleItemSelection(e, 'manga')}
                                    />
                                </div>
                            ))}
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formQuadrinhoFavorites">
                        <Form.Label>Quadrinhos Favoritos</Form.Label>
                        <div className="form-check-group">
                            {quadrinhosData.map(quadrinho => (
                                <div key={quadrinho.id} className="form-check">
                                    <Form.Check
                                        type="checkbox"
                                        label={<><img src={quadrinho.imagem} alt={quadrinho.nome} /> {quadrinho.nome}</>}
                                        value={quadrinho.id}
                                        checked={selectedQuadrinhos.some(selected => selected.id === quadrinho.id)}
                                        onChange={(e) => handleItemSelection(e, 'quadrinho')}
                                    />
                                </div>
                            ))}
                        </div>
                    </Form.Group>


                    <Button variant="primary" type="submit" className="btn-block mt-4">
                        {usuarioEditado ? 'Salvar alterações' : 'Adicionar Usuário'}
                    </Button>
                </Form>
            </div>
        </Pagina>
    );
}

export default UsuarioForm;
