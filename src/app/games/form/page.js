'use client'

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Form, Button, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Pagina from '../../components/Pagina';
import '../standard.css';

const validationSchema = Yup.object().shape({
  titulo: Yup.string().required("Campo obrigatório"),
  genero: Yup.string().required("Campo obrigatório"),
  desenvolvedor: Yup.string().required("Campo obrigatório"),
  modoDeJogo: Yup.string().required("Campo obrigatório"),
  classificacao: Yup.string().required("Campo obrigatório"),
  duracao: Yup.string().required("Campo obrigatório"),
  imagem: Yup.string().url("URL inválida").required("Campo obrigatório"),
});

function GameForm() {
  const [gameEditado, setGameEditado] = useState(null);
  const [games, setGames] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchGames = async () => {
      const storedGames = JSON.parse(localStorage.getItem('games')) || [];
      setGames(storedGames);
    };

    fetchGames();
  }, []);

  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      const game = games.find(item => item.id === id);
      if (game) {
        setGameEditado(game);
        Object.keys(game).forEach(key => setValue(key, game[key]));
      }
    }
  }, [id, games, setValue]);

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const onSubmit = (gameData) => {
    let updatedGames;

    if (gameEditado) {
      updatedGames = games.map(item =>
        item.id === gameEditado.id ? { ...item, ...gameData } : item
      );
      localStorage.setItem('games', JSON.stringify(updatedGames));
    } else {
      const newGame = { ...gameData, id: generateUniqueId() };
      updatedGames = [...games, newGame];
      localStorage.setItem('games', JSON.stringify(updatedGames));
    }

    setGames(updatedGames);
    reset();
    router.push('/games');
  };

  return (
    <Pagina titulo={gameEditado ? 'Editar Jogo' : 'Adicionar Jogo'}>
      <div className="game-form-container">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="formTitulo">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  {...register('titulo')}
                  placeholder="Adicione o título do jogo"
                  isInvalid={!!errors.titulo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.titulo?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formGenero">
                <Form.Label>Gênero</Form.Label>
                <Form.Control
                  as="select"
                  {...register('genero')}
                  isInvalid={!!errors.genero}
                >
                  <option value="">Selecione o gênero</option>
                  <option>Ação</option>
                  <option>Aventura</option>
                  <option>Estratégia</option>
                  <option>RPG</option>
                  <option>Esporte</option>
                  <option>Corrida</option>
                  <option>Jogo on-line</option>
                  <option>Simulação</option>
                  <option>FPS</option>
                  <option>PVP</option>
                  <option>Battle Royale</option>
                  <option>MMORPG</option>
                  <option>Luta</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.genero?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formDataLancamento" className="form-outline mb-4">
            <Form.Label>Data de Lançamento</Form.Label>
            <Form.Control
              type="date"
              {...register('dataLancamento')}
              isInvalid={!!errors.dataLancamento}
            />
            <Form.Control.Feedback type="invalid">
              {errors.dataLancamento?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDesenvolvedor" className="mb-4">
            <Form.Label>Desenvolvedor</Form.Label>
            <Form.Control
              type="text"
              {...register('desenvolvedor')}
              placeholder="Nome da empresa desenvolvedora"
              isInvalid={!!errors.desenvolvedor}
            />
            <Form.Control.Feedback type="invalid">
              {errors.desenvolvedor?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formModoDeJogo" className="mb-4">
            <Form.Label>Modo de Jogo</Form.Label>
            <Form.Control
              as="select"
              {...register('modoDeJogo')}
              isInvalid={!!errors.modoDeJogo}
            >
              <option value="">Selecione o modo de jogo</option>
              <option>Single-Player</option>
              <option>Multiplayer</option>
              <option>Coop</option>
              <option>Online</option>
              <option>Offline</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.modoDeJogo?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formClassificacao" className="mb-4">
            <Form.Label>Classificação Etária</Form.Label>
            <Form.Control
              as="select"
              {...register('classificacao')}
              isInvalid={!!errors.classificacao}
            >
              <option value="">Selecione a classificação</option>
              <option>Livre</option>
              <option>10+</option>
              <option>12+</option>
              <option>14+</option>
              <option>16+</option>
              <option>18+</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.classificacao?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDuracao" className="mb-4">
            <Form.Label>Duração de Jogo</Form.Label>
            <Form.Control
              type="text"
              {...register('duracao')}
              placeholder="Tempo médio para concluir o jogo"
              isInvalid={!!errors.duracao}
            />
            <Form.Control.Feedback type="invalid">
              {errors.duracao?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formImagem" className="mb-4">
            <Form.Label>Capa (URL)</Form.Label>
            <Form.Control
              type="url"
              {...register('imagem')}
              placeholder="Insira a URL da imagem do jogo"
              isInvalid={!!errors.imagem}
            />
            <Form.Control.Feedback type="invalid">
              {errors.imagem?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="btn-block mb-4">
            {gameEditado ? 'Salvar alterações' : 'Adicionar Jogo'}
          </Button>
        </Form>
      </div>
    </Pagina>
  );
}

export default GameForm;
