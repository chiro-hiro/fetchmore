# react-ajax
React Ajax

## Installation
```
$ npm i react-ajax
```

## GET method
```javascript
import ajax from 'react-ajax';

ajax({
    url: 'http://localhost/?'
}, {
    username: 'chiro',
    email: 'chiro@fkguru.com',
}, console.log, console.warn);
```
Result:
```
http://localhost/?username=chiro&email=chiro%40fkguru.com
```

## POST method
```javascript
import ajax from 'react-ajax';

ajax({
    url: 'http://localhost/',
    method: 'POST'
}, {
    username: 'chiro',
    email: 'chiro@fkguru.com',
    products: [
        {id: 3, name: 'cake', price: 2000},
        {id: 4, name: 'coffe', price: 6000}
    ]
}, console.log, console.warn);
```
Parsed data:
```
username: chiro
email: chiro@fkguru.com
products[id][0]: 3
products[name][0]: cake
products[price][0]: 2000
products[id][1]: 4
products[name][1]: coffe
products[price][1]: 6000
```
Auto encoded data:
```
username=chiro&email=chiro%40fkguru.com&products[id][0]=3&products[name][0]=cake&products[price][0]=2000&products[id][1]=4&products[name][1]=coffe&products[price][1]=6000
```

# License
This package distributed under [MIT License](https://github.com/chiro-hiro/react-ajax/blob/master/LICENSE)