'use client'

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Form, Button, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Pagina from '../../components/Pagina'; // Importando o componente Pagina
import '../standard.css'; // Supondo que vamos adicionar estilos adicionais para o formulário

// Esquema de validação com Yup
const validationSchema = Yup.object().shape({
  titulo: Yup.string().required("Campo obrigatório"),
  genero: Yup.string().required("Campo obrigatório"),
  status: Yup.string().required("Campo obrigatório"),
  numeroEpisodios: Yup.number().min(1, "Número de episódios inválido").max(2000, "Número de episódios inválido").required("Campo obrigatório"),
  sinopse: Yup.string().max(150, "A sinopse não pode exceder 150 caracteres").required("Campo obrigatório"),
  imagem: Yup.string().url("URL inválida").required("Campo obrigatório"),
  avaliacao: Yup.number().min(1, "Avaliação mínima é 1").max(10, "Avaliação máxima é 10").required("Campo obrigatório")
});

function AnimeForm() {
  const [animeEditado, setAnimeEditado] = useState(null);
  const [animes, setAnimes] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchAnimes = async () => {
      const storedAnimes = JSON.parse(localStorage.getItem('animes')) || [];
      setAnimes(storedAnimes);
    };

    fetchAnimes();
  }, []);

  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      const anime = animes.find(item => item.id === id);
      if (anime) {
        setAnimeEditado(anime);
        Object.keys(anime).forEach(key => setValue(key, anime[key]));
      }
    }
  }, [id, animes, setValue]);

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const onSubmit = (animeData) => {
    let updatedAnimes;

    if (animeEditado) {
      updatedAnimes = animes.map(item =>
        item.id === animeEditado.id ? { ...item, ...animeData } : item
      );
      localStorage.setItem('animes', JSON.stringify(updatedAnimes));
    } else {
      const newAnime = { ...animeData, id: generateUniqueId() };
      updatedAnimes = [...animes, newAnime];
      localStorage.setItem('animes', JSON.stringify(updatedAnimes));
    }

    setAnimes(updatedAnimes);
    reset();
    router.push('/animes');
  };

  return (
    <Pagina titulo={animeEditado ? 'Editar Anime' : 'Adicionar Anime'}>
      <div className="anime-form-container">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="formTitulo">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  {...register('titulo')}
                  placeholder="Adicione o título do anime"
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
                  <option>Aventura</option>
                  <option>Ação</option>
                  <option>Fantasia</option>
                  <option>Drama</option>
                  <option>Terror</option>
                  <option>Comédia</option>
                  <option>Ficção</option>
                  <option>Mistério</option>
                  <option>Romance</option>
                  <option>Horror</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.genero?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formDataExibicao" className="mb-4">
            <Form.Label>Data de Exibição</Form.Label>
            <Form.Control
              type="date"
              {...register('dataExibicao')}
              isInvalid={!!errors.dataExibicao}
            />
            <Form.Control.Feedback type="invalid">
              {errors.dataExibicao?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formStatus" className="mb-4">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              {...register('status')}
              isInvalid={!!errors.status}
            >
              <option value="">Selecione o status</option>
              <option>Em andamento</option>
              <option>Encerrado</option>
              <option>Lançamento</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.status?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formNumeroEpisodios" className="mb-4">
            <Form.Label>Número de Episódios</Form.Label>
            <Form.Control
              type="number"
              {...register('numeroEpisodios')}
              min="1"
              max="2000"
              isInvalid={!!errors.numeroEpisodios}
              placeholder="Adicione o número de episódios"
            />
            <Form.Control.Feedback type="invalid">
              {errors.numeroEpisodios?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formSinopse" className="mb-4">
            <Form.Label>Sinopse</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register('sinopse')}
              maxLength={150}
              isInvalid={!!errors.sinopse}
              placeholder="Adicione a sinopse do anime"
            />
            <Form.Control.Feedback type="invalid">
              {errors.sinopse?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formImagem" className="mb-4">
            <Form.Label>Imagem (URL)</Form.Label>
            <Form.Control
              type="url"
              {...register('imagem')}
              isInvalid={!!errors.imagem}
              placeholder="Insira a URL da imagem do anime"
            />
            <Form.Control.Feedback type="invalid">
              {errors.imagem?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formAvaliacao" className="mb-4">
            <Form.Label>Avaliação (Nota de 1 a 10)</Form.Label>
            <Form.Control
              type="number"
              {...register('avaliacao')}
              min="1"
              max="10"
              isInvalid={!!errors.avaliacao}
              placeholder="Avalie o anime de 1 a 10"
            />
            <Form.Control.Feedback type="invalid">
              {errors.avaliacao?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="btn-block mb-4">
            {animeEditado ? 'Salvar alterações' : 'Adicionar Anime'}
          </Button>
        </Form>
      </div>
    </Pagina>
  );
}

export default AnimeForm;
