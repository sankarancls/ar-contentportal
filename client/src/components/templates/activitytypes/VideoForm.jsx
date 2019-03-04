import React ,{PropTypes} from 'react';
import {Link} from 'react-router';
import {Card,CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';

import FileUpload from '../../FileUploadComponent.jsx';
import AssessmentType from '../../AssessmentTypes.jsx';
import {Edit,Delete} from 'material-ui-icons';
import Loader from '../common/Loader.jsx';

import {Table,
        TableBody,
        TableHeader,
        TableHeaderColumn,
        TableRow,
        TableRowColumn
        } from 'material-ui/Table';


const style = {
    paper: {
        display: 'inline-block',        
        margin: '16px 32px 16px 0',
    },
    rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
    },
};

const VideoForm = ({        
    activityCode,
	errors,
	textFields,
	loaded,
	nodata,	
	onSubmit,
	onChangeText,
	styles,
	activityContent,	
	videoChangeFile,	
	deleteVideoFile,	
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
			<p className="container">Type : Video</p>
            <p>{"Activity Short Code :"+textFields.act_code}</p>
			<p>{"Activity Code "+activity_coderef}</p>
            
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

        <div className="">
            <TextField
              floatingLabelText="Text"          
              name="text"
              multiLine={true}
              rowsMax={2}
              onChange={onChangeText}
              style={{width:'70%'}}
              errorText={errors.text}
              value={textFields.text}
            />
        </div>
	
        <FileUpload shortcode = {activity_coderef} 
            filename={activityContent.filename}
			label = "Video :"
            type='content'
			filetype="video/*"
            onFileChange={videoChangeFile} 
            deleteAudioFile = {deleteVideoFile}
        />
		<br/><br/>
		<div style={{marginTop:20}}>
            <RaisedButton 
            primary = {true}            
            label="Submit"
            onClick = {onSubmit}
            style={{marginLeft:'45%'}} />
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
        
        <h4 className="container">{nodata}</h4>
    </Card>   

);
export default VideoForm;