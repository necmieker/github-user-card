# Github User Card

This is a sample project created to say hello world on react.<br /><br />
It simply shows a search panel and list of cards including information about users of github fetched by their usernames.

## Stateful components

```
class App extends Component {
  state = {
    cards: []
  }
  
  ...
```
  
```
class SearchForm extends Component {
  state = { userName: '', isDisabled: false }
  
  ...
```

## Stateless components

```
const Card = (props) => {
  ...
}
```

```
const CardList = (props) => {
  ...
}
```
