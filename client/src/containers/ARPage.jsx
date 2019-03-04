import React, {PropTypes} from 'react';
import ARForm from '../components/ARForm.jsx';
import ARTargetPage from './ARTargetPage.jsx';
import FlatButton from 'material-ui/FlatButton';
const data = [
];

let styles = {
  height: '300px',
  center_align:"center",
  left_align:"left"
};


class ARPage extends React.Component {
    /**
    * Class Constructor
    */    
    constructor(props){
        super(props);
        
        //Set the initial state //
        this.state = {
            errors :{},
            targetId:0,
            classID : '',
			className:'',
            loaded: false,      
			addNewBoo:true,
			showTargetComponent: false,
			targetContents:[]
        }; 
		this.selectChange =this.selectChange.bind(this);
    }    
   
       
   /**
    *Select onChange
    */
    selectChange (event,index,id) {		
        this.setState ({
            classID : id,
			showTargetComponent:true,
			className:event.target.innerHTML
        }); 
    }
	
    	
    /**
    *Render the components
    */
    render () {        
        return (
            <div>
				<ARForm
					classID ={this.state.classID}						
					selectChange = {this.selectChange}
					styles={styles}
					loaded={this.state.loaded}
					nodata = {this.state.nodata}
				/>				
				{this.state.showTargetComponent ?
				<div>					
					<ARTargetPage 
						classname={this.state.className} 
						classid={this.state.classID}
						targetId = {this.state.targetId}
					/>
				</div>
				:null
				}
				
            </div>
                
        );
        
    }    
}

export default ARPage;
