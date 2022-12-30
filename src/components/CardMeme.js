import React, { useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import ModalMeme from './ui/ModalMeme';

const CardMeme = ({ meme }) => {
  const [show, setShow] = useState(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  return (
    <Col className="d-flex justify-content-center">
      {show && <ModalMeme props={[show, setShow, meme]} />}
      <Card style={{ width: '18rem', cursor: 'pointer' }} className="m-1 ">
        <Card.Body>
          <Card.Img
            variant="top"
            /* className="fluid" */
            style={{
              cursor: 'pointer',
              width: '100%',
              maxWidth: '250px',
              height: 'auto',
            }}
            src={meme.url}
            onClick={handleShow}
          />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardMeme;
