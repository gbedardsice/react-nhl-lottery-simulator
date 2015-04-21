'use strict';

var React = require('react'),
    Teams = require('./teams');

var max = 4;

var Layout = React.createClass({
  getInitialState: function() {
    return {
      toDraw: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      drawn: []
    };
  },

  draw: function() {
    if (this.state.drawn.length >= max) {
      return;
    }

    var maxIndex = this.state.toDraw.length - 1,
        index = Math.floor(Math.random() * (maxIndex + 1));

    this.state.drawn.push(this.state.toDraw[index]);
    this.state.toDraw.splice(index, 1);

    this.setState({toDraw: this.state.toDraw, drawn: this.state.drawn});
  },

  reset: function() {
    this.replaceState(this.getInitialState());
  },

  render: function() {
    return (
      <div>
        <div className="jumbotron">
          <div className="btn-group">
            <button onClick={this.draw} className="btn btn-success">Draw</button>
            <button onClick={this.reset} className="btn btn-danger">Reset</button>
          </div>
          <div className="row">
            {this.state.drawn.map(function(number) {
              return <span className="badge">{number}</span>;
            })}
          </div>
        </div>
        <div>
          <Teams drawn={this.state.drawn}/>
        </div>
      </div>
    );
  }
});

module.exports = Layout;

