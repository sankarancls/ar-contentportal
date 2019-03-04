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
        
const RearrangeForm = ({
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
	openDialog,
    closeDialog,
    dialogToggle,
    onClickOption,
	onRowClickEdit,
	onRowClickDelete,
	dialogTitle,
	activityShortCode
    
    }) => (    
    
    
    <Card className="left-container">
		<Loader loaded={loaded} />       
        <p className="container">Rearrange</p>               
		<InstructionForm onChangeText={onChangeText} errorText={errors.instruction} instruction={textFields.instruction}/>		
		<br/>
        <br/> 		
		<QuestionTextForm 
			onChangeText={onChangeText} 
			errorText={errors.questiontext} 
			questiontext={textFields.questiontext}
		/>		
        <br/>		
		<AnswerForm 
            onChangeText={onChangeText} 
            errorText={errors.answertext} 
            answertext={textFields.answertext}
        /><br/>
		 <AudioFileAdd shortcode = {activityShortCode}  
			onFileChange = {onFileChange} 
			filetype="audio/*" 
			label = "Audio" 
			obj="answer" 
			objtype="audio"
			filename = {questionContent.answer.audio}
			deleteAudioFile = {deleteAudioFile}
		/>
		<br/>
		<br/>
		<Dialog
			title = {dialogTitle+" Option"}
			actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={closeDialog}
				style={{textAlign:'left'}}
              />,
              <FlatButton
                label={dialogTitle}
                primary={true}                
                onClick={onClickOption}
				style={{textAlign:'left'}}
              />,
			  
            ]}
          modal={true}
          open={dialogToggle}		  
        >
			<div className="">
				<TextField
				  floatingLabelText="Term"
				  name="optiontext"
				  errorText={errors.optiontext}
				  onChange={onChangeText}
				  value={textFields.optiontext}
				/>
			</div>
			<div>
				<TextField
				  floatingLabelText="Meaning"
				  name="meaningtext"
				  style={{width:'80%'}}
				  multiLine
				  errorText={errors.meaningtext}
				  onChange={onChangeText}
				  value={textFields.meaningtext}
				/>
			</div>
			 <AudioFileAdd shortcode = {activityShortCode}  
				onFileChange = {onFileChange} 
				filetype="audio/*" 
				label = "Audio" 
				obj="option" 
				objtype="audio"
				filename = {textFields.optionaudiofile}
				deleteAudioFile = {deleteAudioFile}
			/>            
        </Dialog>
		<div>
			<RaisedButton			            
			label="Add Term"			
			onClick = {openDialog}
			/>
		</div>
		<br/>
		<div>
			<p>Glossary</p>
			<Table>
                <TableHeader displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}>
                    <TableRow>       
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.left_align}}>Term</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.left_align}}>Meaning</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.left_align}}>Audio Filename</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Edit</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Delete</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
               
                <TableBody displayRowCheckbox = {false}>
                    {questionContent.glossaryroot.glossary.map((row,index)=>(                   
                        <TableRow key={index} >                       
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.term}</TableRowColumn>
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.meaning}</TableRowColumn>
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.audio}</TableRowColumn>
							<TableRowColumn style={{textAlign:styles.center_align}}>
                                <Edit className="material-icons" style = {{cursor:'pointer'}} id={row.number} onClick={onRowClickEdit(index)} />
                            </TableRowColumn>
                            <TableRowColumn style={{textAlign:styles.center_align}}>
                                <Delete className="material-icons" style = {{cursor:'pointer'}} id={row.number} onClick={onRowClickDelete(index)}/>
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>                
            </Table>		
		</div><br/><br/>
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
export default RearrangeForm;
