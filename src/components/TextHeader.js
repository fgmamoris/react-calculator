import React from 'react';

const TextHeader = () => {
  return (
    <div className="header mt-4 text-center col-12 ">
      <h1 className="text-dark display-5">Generador de Memes</h1>
      <p className="text-muted discription">
        Trabajo práctico para el curso de ReactJs de Codo a Codo.
      </p>
      <p className="text-muted discription">
        Utilizando dicha libreria para el desarrollo, html2canvas para la
        generación del meme, desplegado en netlify.
      </p>
    </div>
  );
};

export default TextHeader;
