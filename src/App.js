
import React, { Component } from 'react';
import { Form, FormGroup, Label, Button, Input, Spinner, Jumbotron } from 'reactstrap';
import './App.css';

const Card = (props) => {
  return (
    <div style={{ marginTop: '0.4em', padding: 5, border: '1px solid lightgray' }}>
      <img alt="" width="85" src={props.card.avatar_url} style={{ verticalAlign: 'top' }} />
      <div style={{ display: 'inline-block', marginLeft: 10 }}>
        <div style={{ fontSize: '1.05em', fontWeight: 'bold' }}>
          {props.card.name}
        </div>
        <div style={{ height: 5 }} />
        <div style={{ fontSize: '0.9em' }} >{props.card.company}</div>
        <div style={{ height: 5 }} />
        <button onClick={(event) => props.onRemoveClick(props.card)}
          style={{ fontSize: '0.9em' }}>Remove</button>
      </div>
    </div>
  );
};

const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => <Card card={card}
        onRemoveClick={props.onRemoveClick} />)}
    </div>
  );
}

class SearchForm extends Component {
  state = { userName: '', isDisabled: false }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isDisabled: true })
    fetch(`https://api.github.com/users/${this.state.userName}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp.id !== undefined) {
          this.props.onSubmit(resp)
          this.setState({ userName: '' })
        }
      })
      .catch((err) => {
        //noop..
      })
    this.setState({ isDisabled: false })
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
        <Label for="userName">Username:</Label>
        <Input type="text" id="userName"
          autoComplete="off"
          readOnly={this.state.isDisabled}
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          placeholder=".." />
        </FormGroup>
        <Button color="info" disabled={this.state.isDisabled}
        >Add card</Button>
        <Spinner color="primary"
          style={{ marginLeft: 15, visibility: this.state.isDisabled ? '' : 'hidden'}} />
      </Form>
    )
  }
}

class App extends Component {
  state = {
    cards: [
      {
        id: 515861,
        name: "Ali Ukani",
        avatar_url: "https://avatars2.githubusercontent.com/u/515861?v=4",
        company: "HubSpot"
      },
    ]
  }

  addNewCard = (cardInfo) => {
    var foundItems = this.state.cards.filter((card) => {
      return card.id === cardInfo.id;
    })
    if (foundItems.length === 0) {
      this.setState((prevState) => ({
        cards: prevState.cards.concat(cardInfo)
      }));
    }
  }

  removeCard = (cardInfo) => {
    var foundItems = this.state.cards.filter((card) => card.id === cardInfo.id);
    if (foundItems.length > 0) {
      var ps = this.state.cards.indexOf(foundItems[0])
      this.state.cards.splice(ps, 1);
      this.setState((prevState) => ({
        cards: this.state.cards
      }));
    }
  }

  render() {
    return (
      <div style={{margin: '1em'}}>
        <SearchForm onSubmit={this.addNewCard} />
        <Jumbotron style={{marginTop: 15, padding: '0.6em', visibility: this.state.cards.length === 0 ? 'hidden' : ''}}>
        <CardList cards={this.state.cards} onRemoveClick={this.removeCard} />
        </Jumbotron>
      </div>
    )
  }
}

export default App;
