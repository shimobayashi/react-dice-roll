import logo from './logo.svg';
import './App.css';
import React from 'react';
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

class InputDiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  
  handleSubmit(event) {
    const sum = rollDice(this.state.value);
    if (sum) {
      alert(sum);
    }

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Dice:
          <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="2d6" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <InputDiceForm />
        <DiceList></DiceList>
      </header>
    </div>
  );
}

export default App;
