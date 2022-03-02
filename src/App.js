import logo from './logo.svg';
import './App.css';
import React from 'react';

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
    const regexp = /^(\d+)d(\d+)$/;
    const match = regexp.exec(this.state.value);
    if (match && match.length >= 2) {
      const number = parseInt(match[1]);
      const surfaces = parseInt(match[2]);
      let sum = 0;
      for (let i = 0;i < number;i++) {
        sum += Math.floor(surfaces * Math.random()) + 1;
      }

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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <InputDiceForm />
      </header>
    </div>
  );
}

export default App;
