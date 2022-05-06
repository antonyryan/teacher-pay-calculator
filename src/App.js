import {
  Container,
  Col,
  Row,
} from 'react-bootstrap'

import PayCalulator from './components/PayCalculator'

const App = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className="mt-5">Teacher Pay Calculator</h1>
          <PayCalulator />
        </Col>
      </Row>
    </Container>
  )
}

export default App
