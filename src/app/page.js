'use client';

import React from 'react';
import Navbar from './components/Pagina';

function ImageLink({ src, alt, url }) {
  const handleClick = () => {
    window.location.href = url;
  };

  return (
    <div
      style={{
        cursor: 'pointer',
        flex: '0 0 300px',
        maxWidth: '300px',
        minWidth: '300px',
        boxSizing: 'border-box',
        margin: '10px',
      }}
      onClick={handleClick}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease-in-out',
        }}
      />
    </div>
  );
}

function ImagePage() {
  return (
    <div>
      <Navbar />
      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'center',
          gap: '20px',
          overflowX: 'auto',
          width: '100%',
          paddingTop: '20px',
        }}
      >
        <ImageLink
          src="https://img.freepik.com/vetores-premium/icone-de-circulo-de-usuario-anonimo-estilo-simples-de-ilustracao-vetorial-com-sombra-longa_520826-1931.jpg"
          alt="Usuários"
          url="http://localhost:3000/usuarios"
        />
        <ImageLink
          src="https://www.kamisama.com.br/wp-content/uploads/2020/09/a-4.jpg"
          alt="Mangas"
          url="http://localhost:3000/mangas"
        />
        <ImageLink
          src="https://i0.wp.com/wp.ufpel.edu.br/artenosul/files/2017/11/Sara1-e1510565853525-500x375.jpg?resize=724%2C547&ssl=1"
          alt="Animes"
          url="http://localhost:3000/animes"
        />
        <ImageLink
          src="https://www.maxieduca.com.br/blog/wp-content/uploads/2017/01/Imagem-destacada-1-800x728.jpg"
          alt="Quadrinhos"
          url="http://localhost:3000/quadrinhos"
        />
        <ImageLink
          src="https://img.odcdn.com.br/wp-content/uploads/2023/05/Games-Brasil-e1686075484409.jpg"
          alt="Games"
          url="http://localhost:3000/games"
        />
      </div>
    </div>
  );
}

export default ImagePage;
