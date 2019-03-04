import React, {PropTypes} from 'react';
import * as Components from './templates/activitytypes';
import ActivityPage from './ActivityPage.jsx';
import FlatButton from 'material-ui/FlatButton'

let componentName = '';
let toggleBack = 'activity';
let backToggleCount = 1;
class ImportComponents extends React.Component {
    /**
    * Class Constructor
    */    
    constructor(props){
        super(props);		
        this.state = {
			showComponent: false,
			componentToggle:true,			
		}
        //Audio //
		if(this.props.activity_type_ref_id == 2){
			componentName = 'Audio';			
		}
		// Web Link//
		else if(this.props.activity_type_ref_id == 1){
			componentName = 'Weblink';			
		}
		// Web Link//
		else if(this.props.activity_type_ref_id == 3){
			componentName = 'Core';			
		}
		// Video Link//
		else if(this.props.activity_type_ref_id == 22){
			componentName = 'Video';			
		}
		// Experiment Link//
		else if(this.props.activity_type_ref_id == 15){
			componentName = 'Experiment';
			
		}
		// Picture Gallery Link//
		else if(this.props.activity_type_ref_id == 6){
			componentName = 'PictureGallery';			
		}// Deck Link//
		else if(this.props.activity_type_ref_id == 9){
			componentName = 'Deck';			
		}
		// Book Link//
		else if(this.props.activity_type_ref_id == 8){
			componentName = 'Book';			
		} 
		else {
			componentName = 'Common';			
		}		
		this.onClickBack = this.onClickBack.bind(this);
		this.onClickBackIncrement = this.onClickBackIncrement.bind(this);
    }
    
	/**
	* on Click Back Button
	*/
	onClickBack(event){				
		this.toggleComponent();	
	}
	
	/**
	* back click increment
	*/
	onClickBackIncrement(){		
		backToggleCount = 2;
	}
	
	/**
	* Toggle Components
	*/
	toggleComponent(){		
		if(backToggleCount == 1){
			this.setState({
				showComponent: true,
				componentToggle:false,			
			});
		}else if(backToggleCount == 2){
			this.setState({
				showComponent: false,
				componentToggle:false,				
			});			
		}
		backToggleCount = 1		
	}
	
	
    /**
    *Render the components
    */
    render () {
		const ActivityComponents = Components[componentName];
		return (
			<div>
				{!this.state.showComponent ?
					<div>						
						<FlatButton			
							label='Back'
							secondary
							labelStyle = {{fontSize:'19px',marginLeft:20,marginTop:20}}
							onClick = {this.onClickBack}
						/>
						<ActivityComponents 
							id={this.props.id}
							componentToggle = {this.state.componentToggle}
							onClickBackIncrement = {this.onClickBackIncrement}
							chapter_id= {this.props.chapter_id} 
							activity_type_ref_id = {this.props.activity_type_ref_id}
							activity_type = {this.props.activity_type}
						/>
					</div>
					: null
				}
				
				{this.state.showComponent ?
					<div>
						<ActivityPage 
							class_id={this.props.class_id}
							course_id = {this.props.course_id}
							chapter_id = {this.props.chapter_id}
						/>
					</div>
					: null
				}
            </div>  
        );
        
    }    
}

export default ImportComponents;
