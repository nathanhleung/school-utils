"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FIRST_DAY = moment([2015, 7, 31]);
var LAST_DAY = moment([2016, 5, 1]);
var TOTAL_TIMESPAN = LAST_DAY.diff(FIRST_DAY);

var URL = window.location.hostname === "s.codepen.io" ? "https://cdn.rawgit.com/nathanhleung/club-utils/772df454bb1965c340a76583f83264bf6ddb5613/data.json" : "data.json";

var ClubBox = (function (_React$Component) {
  _inherits(ClubBox, _React$Component);

  function ClubBox() {
    _classCallCheck(this, ClubBox);

    _React$Component.call(this);
    var now = moment();
    var elapsed = now.diff(FIRST_DAY);
    this.state = {
      elapsed: elapsed,
      clubs: []
    };
  }

  ClubBox.prototype.tick = function tick() {
    this.setState({
      elapsed: this.state.elapsed + 1000
    });
  };

  ClubBox.prototype.componentDidMount = function componentDidMount() {
    var _this = this;

    $.get(URL, (function (data) {
      _this.setState({
        clubs: data
      });
    }).bind(this));
    this.interval = setInterval(this.tick.bind(this), 1000);
  };

  ClubBox.prototype.componentWillUnmount = function componentWillUnmount() {
    clearInterval(this.interval);
  };

  ClubBox.prototype.render = function render() {
    var _this2 = this;

    var createBox = function createBox(club, index) {
      return React.createElement(
        "div",
        { className: "col-sm-4", key: index + club.name },
        React.createElement(
          "div",
          { className: "panel panel-default" },
          React.createElement(
            "div",
            { className: "panel-heading" },
            React.createElement(
              "h2",
              { className: "panel-title" },
              club.name
            )
          ),
          React.createElement(
            "div",
            { className: "panel-body" },
            "You should have about ",
            React.createElement(
              "code",
              null,
              Math.round(_this2.state.elapsed / TOTAL_TIMESPAN * club.required * 10e7) / 10e7
            ),
            " ",
            club.creditsWord,
            ".  You need ",
            club.required,
            " ",
            club.creditsWord,
            " in total.",
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(
              "a",
              { className: club.creditSheet ? "btn btn-info" : "btn btn-info disabled", href: club.creditSheet, target: "_blank" },
              "View Credit Sheet  ",
              React.createElement("i", { className: "fa fa-share" })
            )
          )
        )
      );
    };
    return React.createElement(
      "div",
      { className: "jumbotron", id: "content" },
      React.createElement(
        "div",
        { className: "container", id: "main" },
        React.createElement(
          "h1",
          null,
          "Club Utilities"
        ),
        React.createElement(
          "p",
          null,
          "We are about ",
          Math.round(this.state.elapsed / TOTAL_TIMESPAN * 10e7) / 10e5,
          "% through the year."
        ),
        React.createElement("br", null),
        React.createElement(
          "div",
          { className: "row" },
          this.state.clubs.sort(function (a, b) {
            // Alphabetize clubs
            return a.name.localeCompare(b.name);
          }).map(createBox)
        )
      ),
      React.createElement(
        "div",
        { className: "container", id: "footer" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-xs-12 text-right" },
            React.createElement(
              "p",
              { className: "help-block small" },
              "If you liked this, try ",
              React.createElement(
                "a",
                { href: "https://xyz.nathanhleung.com/gradecalculator", target: "_blank" },
                "Final Grade Calculator"
              ),
              "!"
            )
          )
        )
      )
    );
  };

  return ClubBox;
})(React.Component);

ReactDOM.render(React.createElement(ClubBox, null), document.getElementById('app'));
