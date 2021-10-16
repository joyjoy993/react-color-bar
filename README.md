# React color bar

This is a color bar built to display data breakdown in a horizontal bar.

Inspired by color bar of `Payment calculator` in [Redfin](https://www.redfin.com).

![desktop](./imgs/redfin.png)

## Screenshot

![desktop](./imgs/demo.png)

## Install

```
$ npm i react-color-bar
```

## Demo

[Online Demo](https://joyjoy993.github.io/react-color-bar/)

Run local demo

```
$ npm install && npm run dev
```

Go to [http://127.0.0.1:8000](http://127.0.0.1:8000) to check to demo.

## Example

```
import React from 'react';
import { render } from 'react-dom';
import { FaApple } from 'react-icons/fa';
import ColorBar, { Data } from '../lib/ColorBar';
import './style.css';

function Demo() {
  const data: Data[] = [
    {
      value: 300,
      color: '#21bbce',
      tooltip: {
        text: 'interest is $300',
        props: {
          type: 'info',
          place: 'top',
        },
      },
      legend: {
        value: 300,
        label: 'interest',
        icon: <FaApple />,
      },
    }, {
      value: 200,
      color: '#4bc97d',
      tooltip: {
        text: 'tax is $200',
        props: {
          type: 'error',
          place: 'top',
        },
      },
      legend: {
        value: 200,
        label: 'tax',
        tooltip: {
          text: 'legend supports tooltip',
          props: {
            type: 'error',
            place: 'top',
          },
        },
      },
    }, {
      value: 100,
      color: '#eb5be1',
      tooltip: {
        text: 'insurance is $100',
        props: {
          type: 'success',
          place: 'top',
        },
      },
      legend: {
        value: 100,
        label: 'insurance',
      },
    },
     {
      value: 300,
      color: 'red',
      tooltip: {
        text: "I don't have legend",
        props: {
          type: 'success',
          place: 'bottom',
        },
      },
    },
  ];
  return (
    <div className="container">
      <h1>Demo of ColorBar</h1>
      <ColorBar data={data} />
    </div>
  );
}

render(<Demo />, document.getElementById('app'));

```
