import React ,{PropTypes} from 'react';
import {Link} from 'react-router';
import {Card,CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import AssessmentType from '../../AssessmentTypes.jsx';
import {Edit,Delete} from 'material-ui-icons'
import Loader from '../common/Loader.jsx';


const CommonForm = ({        
    activityCode,
	errors,
	textFields,
	loaded,
	nodata,	
	onSubmit,
	onChangeText,
	styles,		
	questions,
	onChangeAssessment,
	addNewAssessmentOnClick,
	onQuestionRowClickEdit,
	onQuestionRowClickDelete, 
	activity_type_ref_id,
	activity_type,
	activity_coderef
    }) => (    
    
    
    <Card className="left-container">
		<Loader loaded={loaded} />
        <div>
			<p className="container">Type : {activity_type}</p>
            <p>{"Activity Short Code :"+textFields.act_code}</p>
			<p>{"Activity Code : "+activity_coderef}</p>
        </div>
        <div className="">
            <TextField
              floatingLabelText="Description"
              name="description"
              style={{width:'70%'}}
              multiLine={true}	 
              rowsMax={2}
              errorText={errors.description}
              onChange={onChangeText}
              value={textFields.description}
            />
        </div>
        
		<div style={{marginTop:20}}>
            <RaisedButton 
            primary = {true}            
            label="Submit"
            onClick = {onSubmit}
            style={{marginLeft:'50%'}} />
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
export default CommonForm;