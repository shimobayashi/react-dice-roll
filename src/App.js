import './App.css';
import React, { useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import seedrandom from 'seedrandom';

function rollDice(text, seed) {
  const regexp = /^(\d+)d(\d+)$/;
  const match = regexp.exec(text);

  if (match && match.length >= 2) {
    const number = parseInt(match[1]);
    const surfaces = parseInt(match[2]);
    let sum = 0;
    const rng = seedrandom(seed);
    for (let i = 0;i < number;i++) {
      sum += Math.floor(surfaces * rng()) + 1;
    }

    return sum;
  }

  return undefined;
}

const Row = ({ index, style, data }) => (
  <div style={style}>Row {index} {rollDice(data, index)}</div>
);

const DiceList = ({ diceText }) => (
  <List
    height={300}
    itemCount={1000}
    itemSize={35}
    width={300}
    itemData={diceText}
  >
    {Row}
  </List>
);

function InputDiceTextForm({ diceText, onChange = f => f }) {
  return (
    <form>
      <label>
        Dice:
        <input type="text" value={diceText} onChange={onChange} placeholder="2d6" />
      </label>
    </form>
  )
}

function App() {
  const [diceText, setDiceText] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <InputDiceTextForm
          diceText={diceText}
          onChange={event => {
            setDiceText(event.target.value);
          }}
        />
        <DiceList
          diceText={diceText}
        />
      </header>
    </div>
  );
}

export default App;
