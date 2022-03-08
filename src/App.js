import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { FixedSizeList as List } from 'react-window';

function rollDice(text) {
  const regexp = /^(\d+)d(\d+)$/;
  const match = regexp.exec(text);

  if (match && match.length >= 2) {
    const number = parseInt(match[1]);
    const surfaces = parseInt(match[2]);
    let sum = 0;
    for (let i = 0;i < number;i++) {
      sum += Math.floor(surfaces * Math.random()) + 1;
    }

    return sum;
  }

  return undefined;
}

const Row = ({ index, style }) => (
  <div style={style}>Row {index} {rollDice("2d6")}</div>
);

const DiceList = () => (
  <List
    height={150}
    itemCount={1000}
    itemSize={35}
    width={300}
  >
    {Row}
  </List>
);

function InputDiceForm({ diceText, onChange = f => f, onSubmit = f => f }) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Dice:
        <input type="text" value={diceText} onChange={onChange} placeholder="2d6" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

function App() {
  const [diceText, setDiceText] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <InputDiceForm
          diceText={diceText}
          onChange={event => {
            setDiceText(event.target.value);
          }}
          onSubmit={event => {
            const sum = rollDice(diceText);
            if (sum) {
              alert(sum);
            }

            event.preventDefault();
          }}
        />
        <DiceList></DiceList>
      </header>
    </div>
  );
}

export default App;
