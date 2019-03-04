import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';

const style = {
    margin : 12,
}

const buttonStyle = {
    backgroundColor: 'transparent',
    color: 'white'
  };

const rightButtons = (
    <div>
        <FlatButton label="Chapter" primary = {true} style={buttonStyle} containerElement = {<Link to="/chapter">Chapter</Link>}/>
        <FlatButton label="Topic" primary = {true} style={buttonStyle} containerElement = {<Link to="/topic">Topic</Link>}/>
		<FlatButton label="ELO" primary = {true} style={buttonStyle} containerElement = {<Link to="/elo">ELO</Link>}/>        
        <FlatButton label="Activity" primary = {true} style={buttonStyle} containerElement = {<Link to="/activity">Activity</Link>}/>
		<FlatButton label="AR Forms" primary = {true} style={buttonStyle} containerElement = {<Link to="/arforms">Activity</Link>}/>
        
    </div>
  );
const Base = ({ children }) => (
  <div>
	<AppBar
		title="AR Content Portal"
		showMenuIconButton={false}
		iconElementRight={rightButtons}
	/>
    
    <muithemeprovider>        
        {children}
    </muithemeprovider>
  </div>
);

/*Base.propTypes = {
  children: PropTypes.object.isRequired
};*/

export default Base;
