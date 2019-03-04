import React ,{PropTypes} from 'react';
import {Link} from 'react-router';
import {Card,CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import AssessmentType from '../../AssessmentTypes.jsx';
import Loader from '../common/Loader.jsx';

        
const WeblinkForm = ({ 
		errors,
		textFields,
		loaded,
		nodata,
		onSubmit,
		onChangeText,
		styles,
		activityContent,
		questions,
		onChangeAssessment,
		addNewAssessmentOnClick,
		onQuestionRowClickEdit,
		onQuestionRowClickDelete,
		activity_type_ref_id,
		activity_coderef
    }) => (    
    
    
    <Card className="left-container">
		<Loader loaded={loaded} />
		<div>
			<p className="container">Type : Weblink</p>		
            <p>{"Activity Short Code :"+textFields.act_code}</p>
			<p>{"Activity Code "+activity_coderef}</p>
            
        </div>  

		<div>
            <p>Activity Description</p>
			<TextField
			  floatingLabelText="Description"
			  name="description"
			  style={{width:'70%'}}
			  multiLine={true}			 
			  rowsMax={2}			  
			  onChange={onChangeText}
			  value={textFields.description}
			/>
		</div>
        
		<div>            
			<TextField
			  floatingLabelText="Weblink URL"          
			  name="url"
			  multiLine={true}
			  rowsMax={2}
			  onChange={onChangeText}
			  style={{width:'70%'}}
			  errorText={errors.url}
			  value={textFields.url}
			/>
		</div>

        <div>            
			<TextField
			  floatingLabelText="Weblink URL Description"          
			  name="url_description"
			  multiLine={true}
			  rowsMax={2}
			  onChange={onChangeText}
			  style={{width:'70%'}}
			  errorText={errors.url_description}
			  value={textFields.url_description}
			/>
		</div>	        
		<br/><br/>
        <div style={{marginTop:20}}>
			<RaisedButton 
                primary = {true}            
                label="Submit"
                onClick = {onSubmit}
                style={{marginLeft:'45%'}} 
            />
		</div><br/><br/>
		<Divider /><br/>
		<div>	
			<AssessmentType 
				onRequestChange={onChangeAssessment}
				addNewAssessmentOnClick = {addNewAssessmentOnClick}
				onQuestionRowClickEdit = {onQuestionRowClickEdit}
				onQuestionRowClickDelete = {onQuestionRowClickDelete} 
				questions = {questions}
				activity_type_ref_id = {activity_type_ref_id}
			/>
		</div>
		       
        <p className="container">{nodata}</p>		
    </Card>   

);
export default WeblinkForm;
