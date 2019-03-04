import React ,{PropTypes} from 'react';
import {Link} from 'react-router';
import {Card,CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { Edit, Delete } from 'material-ui-icons';

import Divider from 'material-ui/Divider';
import AudioFileAdd from '../common/FileUploadComponent.jsx'
import InstructionForm from '../common/InstructionForm.jsx';
import QuestionTextForm from '../common/QuestionTextForm.jsx';
import OptionTextForm from '../common/Option.jsx';
import AnswerForm from '../common/AnswerForm.jsx';
import ELOs from '../common/ELOMapping.jsx';
import Loader from '../common/Loader.jsx';

const options = {
    text:true,
    audiofile:true,
    imagefile:true,
    answer:true,
    feedback:true
}

import {Table,
        TableBody,
        TableHeader,
        TableHeaderColumn,
        TableRow,
        TableRowColumn
        } from 'material-ui/Table';
        
const SnowmanForm = ({
    onChangeText,
    styles,
    errors,
    textFields,
    loaded,
    onFileChange,    
    onSubmit,    
    questionContent,   
    deleteAudioFile,    
	onChangeSelectELO,
	chapter_id,
	selectedELO,
	activityShortCode
    
    }) => (    
    
    
    <Card className="left-container">
		<Loader loaded={loaded} />       
        <p className="container">Snowman</p>               
		<InstructionForm onChangeText={onChangeText} errorText={errors.instruction} instruction={textFields.instruction}/>		
		<br/>
        <br/> 		
		<QuestionTextForm 
			onChangeText={onChangeText} 
			errorText={errors.questiontext} 
			questiontext={textFields.questiontext}
		/>
		 <AudioFileAdd shortcode = {activityShortCode}  
			onFileChange = {onFileChange} 
			filetype="image/*" 
			label = "Image" 
			obj="questiontext" 
			objtype="image"
			filename = {questionContent.questiontext.image}
			deleteAudioFile = {deleteAudioFile}
		/>
		 <AudioFileAdd shortcode = {activityShortCode}  
			onFileChange = {onFileChange} 
			filetype="audio/*" 
			label = "Audio" 
			obj="questiontext" 
			objtype="audio"
			filename = {questionContent.questiontext.audio}
			deleteAudioFile = {deleteAudioFile}
		/>
		 <AudioFileAdd shortcode = {activityShortCode}  
			onFileChange = {onFileChange} 
			filetype="audio/*" 
			label = "VO" 
			obj="questiontext" 
			objtype="vo"
			filename = {questionContent.questiontext.vo}
			deleteAudioFile = {deleteAudioFile}
		/>
        <br/>		
		<AnswerForm 
            onChangeText={onChangeText} 
            errorText={errors.answertext} 
            answertext={textFields.answertext}
        /><br/>
       
		<div>
            <TextField                      
                floatingLabelText = "Help Text"
                name = "helptext"
                style={{width:'80%'}}
                onChange={onChangeText}                
                value = {textFields.helptext}                   
            />                            
			 <AudioFileAdd shortcode = {activityShortCode}  
				onFileChange = {onFileChange} 
				filetype="image/*" 
				label = "Image" 
				obj="help" 
				objtype="image"
				filename = {questionContent.help.image}
				deleteAudioFile = {deleteAudioFile}
			/>            
		</div>	
		<br/>
        <div>            
            <ELOs 
				onChangeSelectELO = {onChangeSelectELO} 
				selectedELO = {selectedELO} 
				chapter_id = {chapter_id} 
				errors = {errors} />
        </div> 
        <br/><br/>   
		<RaisedButton
			label = "Submit"
			primary = {true}
			className='left-center'
			onClick = {onSubmit}
			style={{marginLeft:'50%'}}
	   /><br/>       
    </Card>   

);
export default SnowmanForm;
