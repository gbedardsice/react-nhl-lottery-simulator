'use strict';

var React = require('react'),
    teams = require('../constants/teams.json');

var Combination = React.createClass({
  render: function() {
    return (
      <div className="col-md-3 col-xs-6">
        {this.props.numbers.map(function(number) {
          return <span className="badge">{number}</span>;
        })}
      </div>
    );
  }
});

function getCombinations(combinations, drawn) {
  return combinations.filter(function(combination) {
    return drawn.every(function(number) {
      return combination.indexOf(number) !== -1;
    })
  });
}

var Team = React.createClass({
  render: function() {
    return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{this.props.name}</h3>
          </div>
          <div className="panel-body">
            <div className="row">
              {getCombinations(this.props.combinations, this.props.drawn).map(function(combination) {
                return <Combination numbers={combination}/>
              })}
            </div>
          </div>
        </div>
    );
  }
});

var Teams = React.createClass({
  render: function() {
    return (
      <div>
        {teams.filter(function(team) {
          return !!getCombinations(team.combinations, this.props.drawn).length;
        }.bind(this)).map(function(team) {
          return <Team combinations={team.combinations} name={team.name} drawn={this.props.drawn}/>
        }.bind(this))}
      </div>
    );
  }
});

module.exports = Teams;
