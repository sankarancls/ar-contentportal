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
import ELOs from '../common/ELOMapping.jsx';
import Loader from '../common/Loader.jsx';
import AnswerForm from '../common/AnswerForm.jsx';

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
        
const MatchForm = ({
    onChangeText,
    styles,
    errors,
    textFields,
    loaded,
    onFileChange,    
    onSubmit,
    selectedLevel,
    onChangeSelectLevel,
    questionContent,    
    deleteAudioFile,    
	onChangeSelectELO,
	chapter_id,
	selectedELO,
	activityShortCode
    
    }) => (    
    
    
    <Card className="left-container">
		<Loader loaded={loaded} />       
        <p className="container">Match</p>
        <div >          
            <InstructionForm onChangeText={onChangeText} errorText={errors.instruction} instruction={textFields.instruction}/>           
        </div>  
		<br/> <br/>
        <div >          
            <QuestionTextForm onChangeText={onChangeText} errorText={errors.questiontext} questiontext={textFields.questiontext}/>
                                        
			 <AudioFileAdd shortcode = {activityShortCode}  
				onFileChange = {onFileChange} 
				filetype="audio/*" 
				label = "Audio" 
				obj="questiontext" 
				objtype="audio"
				filename = {questionContent.questiontext.audio}
				deleteAudioFile = {deleteAudioFile}
			/>           
        </div>  
        <br/> <br/>
        <AnswerForm 
            onChangeText={onChangeText} 
            errorText={errors.answertext} 
            answertext={textFields.answertext}
        /><br/>
		 <AudioFileAdd shortcode = {activityShortCode}  
			onFileChange = {onFileChange} 
			filetype="image/*" 
			label = "Image" 
			obj="answer" 
			objtype="image"
			filename = {questionContent.answer.image}
			deleteAudioFile = {deleteAudioFile}
		/>        
        <br/>
		<TextField                      
            floatingLabelText = "Feedback"            
            name = "feedbacktext"                
            onChange={onChangeText}                
            value = {textFields.feedbacktext}                   
        /><br/><br/>
        <div>            
            <SelectField
                floatingLabelText = "Select Level"
                onChange = {onChangeSelectLevel}
                value = {selectedLevel}
            >
            <MenuItem key={1} value={1} primaryText = "Easy"/>
            <MenuItem key={2} value={2} primaryText = "Medium"/>
            <MenuItem key={3} value={3} primaryText = "Hard"/>            
            </SelectField>
        </div>
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
export default MatchForm;
