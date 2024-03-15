import { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, InputGroup, FloatingLabel } from 'react-bootstrap';
import axios from "axios";
import Swal from 'sweetalert2'

const InsertarModal = ({ abrirModal, cerrarModal }) => {
    //manejo campo foto
    const imgref = useRef(null);
    //campos a insertar
    const [nombre, setNombre] = useState('');
    const [valorCompra, setValorCompra] = useState(0);
    const [fechaCompra, setFechaCompra] = useState('');
    const [foto, setFoto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [colecciones, setColecciones] = useState('');
    //select Options
    const [categoriasL, setCategoriasL] = useState([]);
    const [coleccionesL, setColeccionesL] = useState([]);

    //limpiar campos
    const limpiarCampos = () => {
        cerrarModal();
        setNombre('');
        setValorCompra('');
        setFechaCompra('');
        setCategoria('');
        setColecciones('');
        if (imgref.current) { imgref.current.value = '' }; // reseteo del campo de la imagen 
    };

    useEffect(() => {
        const datosTablas = async () => {
            try {
                const categoriasLista = await axios.get('http://localhost:4000/datos/leer/categorias');
                setCategoriasL(categoriasLista.data.respuesta);

                const coleccionesLista = await axios.get('http://localhost:4000/datos/leer/colecciones');
                setColeccionesL(coleccionesLista.data.respuesta);
            }
            catch (error) {
                Swal.fire("Error", error.response ? error.response.data.mensaje : "No se recibio respuesta del servidor", "error");
            };
        };
        datosTablas();
    }, []);

    //INSERTAR DATOS
    const agregarPieza = (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('foto', foto);
        fd.append('nombre', nombre);
        fd.append('valorCompra', valorCompra);
        fd.append('fechaCompra', fechaCompra);
        fd.append('categoria', categoria);
        fd.append('colecciones', colecciones);

        axios.post('http://localhost:4000/datos/agregar', fd, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                Swal.fire("Exito", "producto agregado", "success");
                limpiarCampos();
            })
            .catch((error) => {
                Swal.fire("Error", error.response ? error.response.data.mensaje : "No se recibio respuesta del servidor", "error");
            });
    };
    return (
        <div>
            <Modal show={abrirModal} onHide={cerrarModal}>
                <Form onSubmit={agregarPieza}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Insertar Datos de Compra
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form.Group controlId='formnombre'>
                            <FloatingLabel label='Nombre:' className='mb-3'>
                                <Form.Control value={nombre} type='text' name='nombre' onChange={(event) => { setNombre(event.target.value) }} required />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group controlId='formprecio'>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Valor Compra:</InputGroup.Text>
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control value={valorCompra} type='number' name='precio' onChange={(event) => { setValorCompra(event.target.value) }} required />
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId='formfecha'>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Fecha:</InputGroup.Text >
                                <Form.Control value={fechaCompra} type='date' name='fecha' onChange={(event) => { setFechaCompra(event.target.value) }} required />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId='formfoto'>
                            <InputGroup className="mb-3">
                                <Form.Control ref={imgref} type='file' name='foto' onChange={(event) => { setFoto(event.target.files[0]) }} required />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="formcategoria">
                            <Form.Select value={categoria} name="categoria" className="mb-3" onChange={(event) => { setCategoria(event.target.value) }} required>
                                <option value=''>Seleccione una Categoria</option>
                                {categoriasL.map((dato, key) => {
                                    return (
                                        <option key={key} value={dato.id_categoria}>{dato.descripcion}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formcategoria">
                            <Form.Select value={colecciones} name="categoria" className="mb-3" onChange={(event) => { setColecciones(event.target.value) }} required>
                                <option value=''>Seleccione una Coleccion</option>
                                {coleccionesL.map((dato, key) => {
                                    return (
                                        <option key={key} value={dato.id_coleccion}>{dato.descripcion}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">Insertar Datos</Button>
                        <Button variant='danger' onClick={cerrarModal}>Cancelar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default InsertarModal;