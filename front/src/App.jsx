import { Container, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/datos/leer')
      .then(response => {
        setData(response.data.productos);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);


  return (
    <>
      <div>
        <Container>
          <h2>Tarea</h2> <br />
          <div>
            <Button variant='primary' >
              Insertar Datos
            </Button>
          </div>
          <br /><br />
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {data.map((item, key) => {
              return (
                <Card key={key} style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{item.nombre}</Card.Title>
                    <div style={{ width: '100%', height: '100px', display:'flex', justifyContent:'center'}}>
                      <img src={`http://localhost:4000/${item.foto}`}
                        alt={item.descripcion_categoria} style={{ width: '100px', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <Card.Text>
                      Precio: {item.valorCompra}
                      <br />
                      Fecha de Compra: {item.fechaCompra}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer style={{ backgroundColor: 'gray', color: 'white' }}>
                    Categoría: {item.descripcion_categoria}
                    <br />
                    Colección: {item.descripcion_coleccion}
                    <br />
                    <Button variant="info">Actualizar</Button>
                  </Card.Footer>
                </Card>
              )
            })}
          </div>
        </Container>
      </div>
    </>
  )
}

export default App
