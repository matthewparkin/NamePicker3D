import { useEffect } from 'react';
import Form from './components/Form';
import Reveal from './components/game/Reveal';
import { initGame, pickAgainRequest, pickNameRequest, resetWinner } from './store/game/actions';
import { useAppDispatch, useAppSelector } from './store/hooks';
import './App.css';

const App = () => {
  const dispatch = useAppDispatch();
  const { winner, losers, allNames } = useAppSelector((state) => state.game);

  useEffect(() => {
    dispatch(initGame());
  }, [dispatch]);

  return winner ? (
    <Reveal
      winner={winner}
      losers={losers}
      onBack={() => dispatch(resetWinner())}
      onPickAgain={() => dispatch(pickAgainRequest())}
    />
  ) : (
    <Form onPick={(names) => dispatch(pickNameRequest(names))} initialNames={allNames} />
  );
};

export default App;
