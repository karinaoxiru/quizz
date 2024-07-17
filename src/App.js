import React, { useState } from 'react';
import './App.css';
import questions from './questions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

function App() {
  // Declaração dos estados do componente
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Função para lidar com cliques nas respostas
  const handleAnswerClick = (answer) => {
    if (answer === questions[currentQuestionIndex].correct) {
      setScore(score + 1); // Incrementa a pontuação se a resposta estiver correta
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex); // Passa para a próxima pergunta
      } else {
        setGameOver(true); // Fim do jogo se não houver mais perguntas
      }
    } else {
      setGameOver(true); // Fim do jogo se a resposta estiver errada
    }
  };

  // Função para reiniciar o jogo
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
  };

  // Renderização condicional
  if (gameOver) {
    return (
      <Container className="text-center mt-5">
        <h1>Fim de Jogo!</h1>
        <p>Sua pontuação: {score}</p>
        <Button onClick={handleRestart} variant="primary">Reiniciar</Button>
      </Container>
    );
  }

  // Renderização padrão (jogo em andamento)
  return (
    <Container className="card" >
      <h5 className="card-title">Quiz Game</h5>
      <h2>{questions[currentQuestionIndex].question}</h2>
      <Row className="justify-content-center">
        {questions[currentQuestionIndex].answers.map((answer, index) => (
          <Col md="auto" key={index} className="mb-2">
            <Button onClick={() => handleAnswerClick(answer)} variant="outline-primary">
              {answer}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
