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
  periodicidade: Yup.string().required("Campo obrigatório"),
  numeroCapitulos: Yup.number().required("Campo obrigatório").min(1, "Número mínimo de capítulos é 1").max(2000, "Número máximo de capítulos é 2000"),
  enredo: Yup.string().required("Campo obrigatório").max(150, "Máximo de 150 caracteres"),
  imagem: Yup.string().url("URL inválida").required("Campo obrigatório"),
  classificacao: Yup.string().required("Campo obrigatório"),
});

function MangaForm() {
  const [mangaEditado, setMangaEditado] = useState(null);
  const [mangas, setMangas] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchMangas = async () => {
      const storedMangas = JSON.parse(localStorage.getItem('mangas')) || [];
      setMangas(storedMangas);
    };

    fetchMangas();
  }, []);

  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      const manga = mangas.find(item => item.id === id);
      if (manga) {
        setMangaEditado(manga);
        Object.keys(manga).forEach(key => setValue(key, manga[key]));
      }
    }
  }, [id, mangas, setValue]);

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const onSubmit = (mangaData) => {
    let updatedMangas;

    if (mangaEditado) {
      updatedMangas = mangas.map(item =>
        item.id === mangaEditado.id ? { ...item, ...mangaData } : item
      );
      localStorage.setItem('mangas', JSON.stringify(updatedMangas));
    } else {
      const newManga = { ...mangaData, id: generateUniqueId() };
      updatedMangas = [...mangas, newManga];
      localStorage.setItem('mangas', JSON.stringify(updatedMangas));
    }

    setMangas(updatedMangas);
    reset();
    router.push('/mangas');
  };

  return (
    <Pagina titulo={mangaEditado ? 'Editar Mangá' : 'Adicionar Mangá'}>
      <div className="manga-form-container">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="formTitulo">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  {...register('titulo')}
                  placeholder="Adicione o título do mangá"
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

          <Form.Group controlId="formPeriodicidade" className="form-outline mb-4">
            <Form.Label>Periodicidade</Form.Label>
            <Form.Control
              as="select"
              {...register('periodicidade')}
              isInvalid={!!errors.periodicidade}
            >
              <option value="">Tipo de lançamento</option>
              <option>Semanal</option>
              <option>Mensal</option>
              <option>Irregular</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.periodicidade?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formNumeroCapitulos" className="form-outline mb-4">
            <Form.Label>Número de Capítulos</Form.Label>
            <Form.Control
              type="number"
              {...register('numeroCapitulos')}
              isInvalid={!!errors.numeroCapitulos}
              placeholder="Adicione o número de capítulos"
              min="1"
              max="2000"
            />
            <Form.Control.Feedback type="invalid">
              {errors.numeroCapitulos?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEnredo" className="form-outline mb-4">
            <Form.Label>Enredo</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register('enredo')}
              maxLength={150}
              isInvalid={!!errors.enredo}
              placeholder="Adicione o enredo do mangá"
            />
            <Form.Control.Feedback type="invalid">
              {errors.enredo?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formImagem" className="form-outline mb-4">
            <Form.Label>Capa (URL)</Form.Label>
            <Form.Control
              type="url"
              {...register('imagem')}
              isInvalid={!!errors.imagem}
              placeholder="Insira a URL da imagem do mangá"
            />
            <Form.Control.Feedback type="invalid">
              {errors.imagem?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formClassificacao" className="form-outline mb-4">
            <Form.Label>Classificação</Form.Label>
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

          <Button variant="primary" type="submit" className="btn-block mb-4">
            {mangaEditado ? 'Salvar alterações' : 'Adicionar Mangá'}
          </Button>
        </Form>
      </div>
    </Pagina>
  );
}

export default MangaForm;
