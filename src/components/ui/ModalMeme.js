import html2canvas from 'html2canvas';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

import Draggable from 'react-draggable';

const ModalMeme = ({ props }) => {
  const initText = {
    topText: '',
    bottomText: '',
  };

  const [validated, setValidated] = useState(false);
  const [size, setSize] = useState(24);
  const [formValues, setFormValues] = useState(initText);

  const [color, setColor] = useState('#FFFFFF');
  const [sizeBottom, setSizeBottom] = useState('16rem');

  const [show, setShow, meme] = props;
  const handleClose = () => setShow(false);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  useEffect(() => {
    if (meme.width / meme.height < 0.75) {
      setSizeBottom('33rem');
    } else if (meme.width / meme.height < 0.9) {
      setSizeBottom('28rem');
    } else if (meme.width / meme.height < 1) {
      setSizeBottom('30rem');
    } else if (
      meme.width / meme.height >= 1 &&
      meme.width / meme.height < 1.1
    ) {
      setSizeBottom('21rem');
    }
  }, [meme.height, meme.width]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      event.preventDefault();
      html2canvas(document.querySelector('#exportar'), {
        logging: true,
        letterRendering: 1,
        allowTaint: false,
        useCORS: true,
      }).then(function (canvas) {
        /*   document.body.appendChild(canvas); */
        const image = canvas.toDataURL('image/jpg', 1.0);
        let link = document.createElement('a');
        link.download = 'meme.jpg';
        link.href = image;
        link.click();
      });
      setValidated(true);
    }
  };
  const handleChangeSize = (e) => {
    setSize(e.target.value);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        // keyboard={false}
      >
        <Modal.Header closeButton className="align-center">
          <h2 className="m-auto">Generador de meme</h2>
        </Modal.Header>
        <Modal.Body className="text-center">
          <figure id="exportar">
            <img
              variant="top"
              src={meme.url}
              style={{
                width: '90%',
                height: '100%',
                position: 'relative',
              }}
              alt="meme"
            />
            <Draggable
              bounds={{ left: -450, top: -10, right: -50, bottom: 400 }}
            >
              <h2
                draggable="true"
                style={{
                  position: 'absolute',
                  fontFamily: 'impact, sans-serif',
                  fontSize: `${size}px`,
                  textTransform: 'uppercase',
                  color: `${color}`,
                  letterSpacing: '1px',
                  textShadow: '2px 2px 0 #000',
                  display: 'inline',
                }}
              >
                {formValues.topText}
              </h2>
            </Draggable>

            <Draggable
              bounds={{ left: -400, top: -400, right: -50, bottom: 100 }}
            >
              <h2
                draggable="true"
                style={{
                  position: 'absolute',
                  top: sizeBottom,
                  fontFamily: 'impact, sans-serif',
                  fontSize: `${size}px`,
                  textTransform: 'uppercase',
                  color: `${color}`,
                  letterSpacing: '1px',
                  textShadow: '2px 2px 0 #000',
                  display: 'inline',
                }}
              >
                {formValues.bottomText}
              </h2>
            </Draggable>
          </figure>
          <Col className="col-8" style={{ margin: 'auto' }}>
            <Form validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Form.Group as={Col} md="12" controlId="formMemeGenerator">
                  <Form.Label>Texto superior</Form.Label>
                  <Form.Control
                    className="form-control"
                    name="topText"
                    onChange={handleInputChange}
                    placeholder="Texto superior"
                    type="text"
                    value={formValues.topText}
                    minLength={2}
                    maxLength={20}
                  />
                  {/* <Form.Control.Feedback>Válido!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Completar
                  </Form.Control.Feedback> */}
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="formMemeGenerator">
                  <Form.Label>Texto inferior</Form.Label>
                  <Form.Control
                    className="form-control"
                    name="bottomText"
                    onChange={handleInputChange}
                    placeholder="Texto inferior"
                    type="text"
                    value={formValues.bottomText}
                    minLength={4}
                    maxLength={17}
                  />
                  {/* <Form.Control.Feedback>Válido!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Completar
                  </Form.Control.Feedback> */}
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="formMemeGenerator">
                  <Form.Label>Tamaño texto</Form.Label>
                  <Form.Select onChange={(e) => handleChangeSize(e)}>
                    <option value="24">24</option>
                    <option value="26">26</option>
                    <option value="30">30</option>
                    <option value="36">36</option>
                    <option value="40">40</option>
                    <option value="44">44</option>
                    <option value="48">48</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="formMemeGenerator">
                  <Form.Label>Color de texto</Form.Label>
                  <div>
                    <input
                      type="color"
                      name="topColor"
                      onChange={handleColorChange}
                    ></input>
                  </div>
                </Form.Group>
              </Row>

              <Row className="ms-5 me-5">
                <Button type="submit" className="mt-2 btn btn-success btn-sm">
                  Generar
                </Button>
              </Row>
            </Form>
          </Col>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalMeme;
