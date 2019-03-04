import React ,{PropTypes} from 'react';
import TextField from 'material-ui/TextField'
import AddFile from './templates/common/FileUploadComponent.jsx';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import {Table,
        TableBody,
        TableHeader,
        TableHeaderColumn,
        TableRow,
        TableRowColumn
        } from 'material-ui/Table';
const styles = {
  height: '300px',
  center_align:"center",
  left_align:"left"
};
class AddTarget extends React.Component {
    constructor(props){
        super(props);        
        this.state = {
			errors:this.props.errors,
            fields:this.props.fields,            
        }
        const classid = this.props.class_ref_id.replace(" ", "");
		
        this.onFileChange = this.onFileChange.bind(this);
		this.deleteAudioFile = this.deleteAudioFile.bind(this);
    }
    
    /**
    *Component Will Receive Props 
    */
    componentWillReceiveProps(props){        
        const fields = this.state.fields
        const errors = this.state.errors        
        
		if(props.fields['targetname']!=this.state.fields['targetname']){
			fields['targetname'] = props.fields['targetname']            
		}
		if(props.errors['targetname']!=this.state.errors['targetname']){
			errors['targetname'] = props.errors['targetname']           
		}	
        console.log(errors['targetname']);   
        this.setState({
            errors:errors,
            fields:fields,            
        })
    }
	
	   
    /**
    * onFileChange
    */
    onFileChange(obj,type){
        return function(event) {            
            this.props.onFileChange(event,obj,type)
        }.bind(this)
    }
	
	/**
    * On Delete File
    */
    deleteAudioFile(obj,type){		
		this.props.deleteAudioFile(obj,type)
    }
    
    
    render() {
        return (
			<div>
				<TextField                      
					floatingLabelText = "Target Name"
					name = "targetname"
					style={{width:'80%'}}
					onChange={this.props.onChangeText}
					errorText = {this.state.errors['targetname']}
					value = {this.state.fields['targetname']}                   
				/>
				<div style={{width:'80%'}}>
					<Table>				   
						<TableBody displayRowCheckbox = {false}>							                   
								<TableRow >                       
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>Target Image</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>
										<AddFile shortcode = {classid} 
											onFileChange = {this.onFileChange} 
											filetype="image/*" 
											label = "" 
											obj="option" 
											objtype="image"
											filename = {this.state.fields['targetimagefile']}
											deleteAudioFile = {this.deleteAudioFile}
										/>
									</TableRowColumn>
								</TableRow>
								
								<TableRow >                       
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>Target Image</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>
										<AddFile shortcode = {classid} 
											onFileChange = {this.onFileChange} 
											filetype="image/*" 
											label = "" 
											obj="option" 
											objtype="database"
											filename = {this.state.fields['databasefile']}
											deleteAudioFile = {this.deleteAudioFile}
										/>
									</TableRowColumn>
								</TableRow>
								
								<TableRow >                       
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>Target Image</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>
										<AddFile shortcode = {classid} 
											onFileChange = {this.onFileChange} 
											filetype="image/*" 
											label = "" 
											obj="option" 
											objtype="xml"
											filename = {this.state.fields['xmlfile']}
											deleteAudioFile = {this.deleteAudioFile}
										/>
									</TableRowColumn>
								</TableRow>
								
								<TableRow >                       
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>Resourse Bundle File</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>
										<AddFile shortcode = {classid} 
											onFileChange = {this.onFileChange} 
											filetype="image/*" 
											label = "" 
											obj="option" 
											objtype="rosource_bundle"
											filename = {this.state.fields['bundlefile']}
											deleteAudioFile = {this.deleteAudioFile}
										/>
									</TableRowColumn>
								</TableRow>
							))}
						</TableBody>                
					</Table>
				</div>				
			</div>
        )
    }
}

AddTarget.propTypes = {
    onChangeText : PropTypes.func.isRequired,
	onFileChange : PropTypes.func.isRequired
}
export default AddTarget;
