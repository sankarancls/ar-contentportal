import React ,{PropTypes} from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Dialog from 'material-ui/Dialog';

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
			  bodyStyle={{margin:0, padding:0}}
			  open={this.state.loaded}
			  style={{width: '200px', marginLeft: '40%', backgroundColor: 'transparent', zIndex:2000}}
			  title= 'Processing'
			  titleStyle={{paddingTop: '0px', paddingLeft: '45px', fontSize: '15px', lineHeight: '40px'}}
			>
				<RefreshIndicator
				  style= {{display: 'inline-block'}}
				  size={50}
				  left={50}
				  top={30}
				  loadingColor="#FF9800"
				  status="loading"    
				/>
			</Dialog>
		)
	}
}

export default Loader;
