import React from "react";
import { render } from "react-dom";
import ColorBar from "../../lib";
import "./style.css";

function Demo() {
  const data = [
      {
          value: 300,
          color: '#21bbce',
          legendLabel: 'interest',
          legendValue: 300,
          tooltip: 'interest is $300',
      }, {
          value: 200,
          color: '#4bc97d',
          legendLabel: 'tax',
          legendValue: 200,
          tooltip: 'tax is $200',
      }, {
          value: 100,
          color: '#eb5be1',
          legendLabel: 'insurance',
          legendValue: 100,
          tooltip: 'insurance is $100',
      },
  ];
  return (
    <div className="container">
      <h1>Demo of ColorBar</h1>
      <ColorBar data={data} />
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
