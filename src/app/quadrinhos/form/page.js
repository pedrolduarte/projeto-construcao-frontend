'use client'

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Form, Button, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Pagina from '../../components/Pagina';
import '../standard.css';

// Esquema de validação com Yup
const validationSchema = Yup.object().shape({
  titulo: Yup.string().required("Campo obrigatório"),
  genero: Yup.string().required("Campo obrigatório"),
  status: Yup.string().required("Campo obrigatório"),
  numEdicoes: Yup.number().required("Campo obrigatório").positive().integer(),
  avaliacao: Yup.number().required("Campo obrigatório").min(1).max(10),
  imagem: Yup.string().url("URL inválida").required("Campo obrigatório"),
  sinopse: Yup.string().max(150, "Sinopse muito longa"),
});

function QuadrinhoForm() {
  const [quadrinhoEditado, setQuadrinhoEditado] = useState(null);
  const [quadrinhos, setQuadrinhos] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchQuadrinhos = async () => {
      const storedQuadrinhos = JSON.parse(localStorage.getItem('quadrinhos')) || [];
      setQuadrinhos(storedQuadrinhos);
    };

    fetchQuadrinhos();
  }, []);

  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      const quadrinho = quadrinhos.find(item => item.id === id);
      if (quadrinho) {
        setQuadrinhoEditado(quadrinho);
        Object.keys(quadrinho).forEach(key => setValue(key, quadrinho[key]));
      }
    }
  }, [id, quadrinhos, setValue]);

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const onSubmit = (quadrinhoData) => {
    let updatedQuadrinhos;

    if (quadrinhoEditado) {
      updatedQuadrinhos = quadrinhos.map(item =>
        item.id === quadrinhoEditado.id ? { ...item, ...quadrinhoData } : item
      );
      localStorage.setItem('quadrinhos', JSON.stringify(updatedQuadrinhos));
    } else {
      const newQuadrinho = { ...quadrinhoData, id: generateUniqueId() };
      updatedQuadrinhos = [...quadrinhos, newQuadrinho];
      localStorage.setItem('quadrinhos', JSON.stringify(updatedQuadrinhos));
    }

    setQuadrinhos(updatedQuadrinhos);
    reset();
    router.push('/quadrinhos');
  };

  return (
    <Pagina titulo={quadrinhoEditado ? 'Editar Quadrinho' : 'Adicionar Quadrinho'}>
      <div className="quadrinho-form-container">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="formTitulo">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  {...register('titulo')}
                  placeholder="Adicione o título do quadrinho"
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
                  <option>Super-Heróis</option>
                  <option>Ficção Científica</option>
                  <option>Fantasia</option>
                  <option>Horror</option>
                  <option>Humor</option>
                  <option>Graphic Novels</option>
                  <option>Webcomics</option>
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

          <Form.Group controlId="formStatus" className="mb-4">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              {...register('status')}
              isInvalid={!!errors.status}
            >
              <option value="">Selecione o status</option>
              <option>Em andamento</option>
              <option>Finalizado</option>
              <option>Cancelado</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.status?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-4">
            <Col>
              <Form.Group controlId="formNumEdicoes">
                <Form.Label>Número de Edições</Form.Label>
                <Form.Control
                  type="number"
                  {...register('numEdicoes')}
                  isInvalid={!!errors.numEdicoes}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.numEdicoes?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formAvaliacao">
                <Form.Label>Avaliação (1 a 10)</Form.Label>
                <Form.Control
                  type="number"
                  {...register('avaliacao')}
                  isInvalid={!!errors.avaliacao}
                  min="1"
                  max="10"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.avaliacao?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formImagem" className="mb-4">
            <Form.Label>Imagem (URL)</Form.Label>
            <Form.Control
              type="text"
              {...register('imagem')}
              isInvalid={!!errors.imagem}
            />
            <Form.Control.Feedback type="invalid">
              {errors.imagem?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formSinopse" className="mb-4">
            <Form.Label>Sinopse</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register('sinopse')}
              isInvalid={!!errors.sinopse}
            />
            <Form.Control.Feedback type="invalid">
              {errors.sinopse?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="custom-btn-submit">
            {quadrinhoEditado ? 'Salvar Alterações' : 'Adicionar Quadrinho'}
          </Button>
        </Form>
      </div>
    </Pagina>
  );
}

export default QuadrinhoForm;
