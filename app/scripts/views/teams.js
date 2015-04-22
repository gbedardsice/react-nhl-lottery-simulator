'use strict';

var React = require('react'),
    _ = require('lodash'),
    TEAMS = require('../constants/teams.json');

var Combination = React.createClass({
  render: function() {
    return (
      <div className="col-md-2 col-xs-6">
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
          <h3 className="panel-title">{this.props.model.name}</h3>
        </div>
        <div className="panel-body">
          <div className="row">
            {this.props.model.combinations.map(function(combination) {
              return <Combination numbers={combination}/>
            })}
          </div>
        </div>
      </div>
    );
  }
});

var Teams = React.createClass({
  getTeams: function() {
    return _(TEAMS).chain()
      .map(function(team) {
        return _.extend({}, team, {
          combinations: getCombinations(team.combinations, this.props.drawn)
        });
      }, this)
      .filter(function(team) {
        return !!team.combinations.length;
      })
      .sortBy(function(team) {
        return -team.combinations.length;
      })
      .value();
  },

  render: function() {
    return (
      <div>
        {this.getTeams().map(function(team) {
          return <Team model={team}/>
        })}
      </div>
    );
  }
});

module.exports = Teams;
