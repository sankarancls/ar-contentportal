import React ,{PropTypes} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';

const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

class Loader extends React.Component {
	constructor(props){
		super(props);
		console.log(props);
		this.state = {
			loaded:this.props.loaded
		}
		
	}
	
	/**
	* Component Recceive Props
	*/
	componentWillReceiveProps(props){
		if(props.loaded!=this.state.loaded){
			console.log(props);
			console.log(this.state.loaded);
			this.setState({
				loaded:props.loaded,
			})
		}
	}
	
	render () {		
		return (
			<Dialog
				title = "Please Wait!"
				style = {{fontSize:15}}
				open={this.state.loaded}
			   >
			<CircularProgress className='center-align' />
		   </Dialog>
		<div className="my-spinner">
			<CircularProgress size={59.5} />
		</div>
		)
	}
}

export default Loader;
