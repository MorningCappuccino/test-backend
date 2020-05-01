import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      successMessage: ''
    };
  }

  handleLogin = async event => {
    event.preventDefault();

    this.setState({ errorMessage: '', successMessage: ''});

    const response = await fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    });
    if (response.status === 401) {
      let result = await response.json();
      result.errorMessage && this.setState( {errorMessage: result.errorMessage});
    }
    if (response.status === 200) {
      let result = await response.json();
      this.setState( {successMessage: `You are sucessfully logged in as ${result.email}`});
    }
  };

  render() {
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
        </header>
        <form onSubmit={this.handleLogin}>
          <p>
            <strong>Login form:</strong>
          </p>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="text"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <div>{this.state.errorMessage && this.state.errorMessage}</div>
          <div>{this.state.successMessage && this.state.successMessage}</div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default App;
