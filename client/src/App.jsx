import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Label from './common-components/Label';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      successMessage: '',
    };
  }

  handleLogin = async (event) => {
    event.preventDefault();

    this.setState({ errorMessage: '', successMessage: '' });

    const { email, password } = this.state;

    const response = await fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 401) {
      const result = await response.json();
      if (result.errorMessage) this.setState({ errorMessage: result.errorMessage });
    }
    if (response.status === 200) {
      const result = await response.json();
      this.setState({ successMessage: `You are sucessfully logged in as ${result.email}` });
    }
  };

  render() {
    const { email, password, errorMessage, successMessage } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
        <form onSubmit={this.handleLogin}>
          <p>
            <strong>Login form:</strong>
          </p>
          <div>
            <Label htmlFor="email">Email:</Label>
            <input id="email" type="text" value={email} onChange={(e) => this.setState({ email: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="password">Password:</Label>
            <input
              id="password"
              type="text"
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <div>{errorMessage && errorMessage}</div>
          <div>{successMessage && successMessage}</div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default App;
