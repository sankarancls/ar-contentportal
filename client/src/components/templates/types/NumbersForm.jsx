import React ,{PropTypes} from 'react';
import {Link} from 'react-router';
import {Card,CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

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

const style = { 
  radioButton: {
    marginBottom: 16,
  },
  rowStyle:{
	  marginLeft:15,
	  width:'150px'
  }
  
};


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
        
const NumbersForm = ({
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
	onChangeOperator,
    operatorValue,
	rowCount,
	activityShortCode
    
    }) => (    
    
    
    <Card className="left-container">
		<Loader loaded={loaded} />       
        <p className="container">Number</p> 
		<QuestionTextForm 
			onChangeText={onChangeText} 
			errorText={errors.questiontext} 
			questiontext={textFields.questiontext}
		/>		
        <br/>
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
			label = "VO" 
			obj="questiontext" 
			objtype="vo"
			filename = {questionContent.questiontext.vo}
			deleteAudioFile = {deleteAudioFile}
		/>
		 <div>
			<p>Operator</p>
			<RadioButtonGroup name="operator" valueSelected={operatorValue} onChange={onChangeOperator}>
				<RadioButton
					value="+"
					label="+ Add"
					style={style.radioButton}
				/>
				<RadioButton
					value="-"
					label="- Subraction"
					style={style.radioButton}
				/>				  
			</RadioButtonGroup>
		</div>
        <br/> 
		
		<div>
			<h4>Row 2</h4>
			<div style={{display:'flex',marginTop:'-30px'}}>
				<TextField
				  floatingLabelText="ones"
				  name="row2ones"
				  errorText={errors.row2ones}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.row2ones}
				/>
				
				<TextField
				  floatingLabelText="tens"
				  name="row2tens"
				  errorText={errors.row2tens}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.row2tens}
				/>
				
				<TextField
				  floatingLabelText="hundred"
				  name="row2hundred"
				  errorText={errors.row2hundred}
				 style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.row2hundred}
				/>
				<TextField
				  floatingLabelText="thousand"
				  name="row2thousand"
				  errorText={errors.row2thousand}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.row2thousand}
				/>
				<TextField
				  floatingLabelText="tenthousand"
				  name="row2tenthousand"
				  errorText={errors.row2tenthousand}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.row2tenthousand}
				/>
			</div>				
			<p style={{color:'#000000',marginLeft:15}}>Decimal</p>
			<div style={{display:'flex',marginTop:'-30px'}}>				
				<br/><TextField
				  floatingLabelText="thousandth"
				  name="row2thousandth"
				  errorText={errors.row2thousandth}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.row2thousandth}
				/>
				<br/><TextField
				  floatingLabelText="hundredth"
				  name="row2hundredth"
				  errorText={errors.row2hundredth}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.row2hundredth}
				/>
				<br/><TextField
				  floatingLabelText="tenth"
				  name="row2tenth"
				  errorText={errors.row2tenth}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.row2tenth}
				/>
			</div>
		</div>
		
		<br/>
		<div>
			<h4>Row 3</h4>
			<div style={{display:'flex',marginTop:'-30px'}}>
				<TextField
				  floatingLabelText="ones"
				  name="row3ones"
				  errorText={errors.row3ones}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.row3ones}
				/>
				
				<TextField
				  floatingLabelText="tens"
				  name="row3tens"
				  errorText={errors.row3tens}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.row3tens}
				/>
				
				<TextField
				  floatingLabelText="hundred"
				  name="row3hundred"
				  errorText={errors.row3hundred}
				 style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.row3hundred}
				/>
				<TextField
				  floatingLabelText="thousand"
				  name="row3thousand"
				  errorText={errors.row3thousand}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.row3thousand}
				/>
				<TextField
				  floatingLabelText="tenthousand"
				  name="row3tenthousand"
				  errorText={errors.row3tenthousand}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.row3tenthousand}
				/>
			</div>				
			<p style={{color:'#000000',marginLeft:15}}>Decimal</p>
			<div style={{display:'flex',marginTop:'-30px'}}>				
				<br/><TextField
				  floatingLabelText="thousandth"
				  name="row3thousandth"
				  errorText={errors.row3thousandth}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.row3thousandth}
				/>
				<br/><TextField
				  floatingLabelText="hundredth"
				  name="row3hundredth"
				  errorText={errors.row3hundredth}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.row3hundredth}
				/>
				<br/><TextField
				  floatingLabelText="tenth"
				  name="row3tenth"
				  errorText={errors.row3tenth}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.row3tenth}
				/>
			</div>
		</div>
		<br/>
		<div>
			<h4>Answer</h4>
			<div style={{display:'flex',marginTop:'-30px'}}>
				<TextField
				  floatingLabelText="ones"
				  name="ones"
				  errorText={errors.ones}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.ones}
				/>
				
				<TextField
				  floatingLabelText="tens"
				  name="tens"
				  errorText={errors.tens}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.tens}
				/>
				
				<TextField
				  floatingLabelText="hundred"
				  name="hundred"
				  errorText={errors.hundred}
				 style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.hundred}
				/>
				<TextField
				  floatingLabelText="thousand"
				  name="thousand"
				  errorText={errors.thousand}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.thousand}
				/>
				<TextField
				  floatingLabelText="tenthousand"
				  name="tenthousand"
				  errorText={errors.tenthousand}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.tenthousand}
				/>
			</div>				
			<p style={{color:'#000000',marginLeft:15}}>Decimal</p>
			<div style={{display:'flex',marginTop:'-30px'}}>				
				<br/><TextField
				  floatingLabelText="thousandth"
				  name="thousandth"
				  errorText={errors.thousandth}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.thousandth}
				/>
				<br/><TextField
				  floatingLabelText="hundredth"
				  name="hundredth"
				  errorText={errors.hundredth}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.hundredth}
				/>
				<br/><TextField
				  floatingLabelText="tenth"
				  name="tenth"
				  errorText={errors.tenth}
				  style={style.rowStyle}
				  onChange={onChangeText}
				  value={textFields.tenth}
				/>
			</div>
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
export default NumbersForm;
