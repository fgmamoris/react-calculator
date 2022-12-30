import React, { useEffect, useState } from 'react';
import { CardGroup, Container } from 'react-bootstrap';
import CardMeme from './CardMeme';
const CardsMemes = () => {
  const [memesImg, setMemesImg] = useState();

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes') //call to URL
      .then((response) => response.json()) //turn promise into JS object
      .then((response) => {
        const { memes } = response.data; //pull memes array from response.data
        setMemesImg(memes);
        //this.setState({ allMemeImgs: memes }) //
      }, []);
  }, []);

  return (
    <Container
      className="d-flex justify-content-center mb-2"
      style={{
        borderRadius: '10px',
        backgroundColor: 'gray',
        padding: '35px',
      }}
    >
      <Container
        style={{
          borderRadius: '10px',
          backgroundColor: 'white',
        }}
      >
        <CardGroup>
          {memesImg &&
            memesImg.map(
              (meme) =>
                (meme.box_count === 2 || meme.box_count === 1) && (
                  <CardMeme key={meme.id} meme={meme} />
                )
            )}
        </CardGroup>
      </Container>
    </Container>
  );
};

export default CardsMemes;
