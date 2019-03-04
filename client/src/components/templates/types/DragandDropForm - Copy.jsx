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

const options = {
    text:true,
    audiofile:false,
    imagefile:true,
    answer:true,
    feedback:true,
	feedbackimage:true
}

import {Table,
        TableBody,
        TableHeader,
        TableHeaderColumn,
        TableRow,
        TableRowColumn
        } from 'material-ui/Table';
        
const DragandDropForm = ({
    onChangeText,
    styles,
    errors,
    textFields,
    loaded,
    onFileChange,    
    onSubmit,
    openDialog,
    closeDialog,
    dialogToggle,
    onClickOption,
    selectedAnswer,    
    onChangeSelectAnswer,    
    questionContent,
    onRowClickEdit,
    deleteAudioFile,
    dialogTitle,
	onRowClickDelete,
	onChangeSelectELO,
	chapter_id,
	selectedELO,
	activityShortCode
    
    }) => (    
    
    
    <Card className="left-container">
		<Loader loaded={loaded} />       
        <p className="container">Drag and Drop</p>        
        <div >          
            <QuestionTextForm onChangeText={onChangeText} errorText={errors.questiontext} questiontext={textFields.questiontext}/>
            <div style = {{display:'flex'}}>                              
                 <AudioFileAdd shortcode = {activityShortCode}  
                    onFileChange = {onFileChange} 
                    filetype="audio/*" 
                    label = "VO" 
                    obj="questiontext" 
                    objtype="vo"
                    filename = {questionContent.questiontext.vo}
                    deleteAudioFile = {deleteAudioFile}
				/>
            </div>
        </div>  
        <br/> <br/>
		<div>
			<TextField                      
                floatingLabelText = "Drop Answer Text"
                name = "answertext"
                style={{width:'80%'}}
                onChange={onChangeText}
                errorText = {errors.answertext}
                value = {textFields.answertext}                   
            />
			 <AudioFileAdd shortcode = {activityShortCode}  
                    onFileChange = {onFileChange} 
                    filetype="image/*" 
                    label = "Drop Image File :" 
                    obj="drop" 
                    objtype="image"
                    filename = {questionContent.drop.image}
                    deleteAudioFile = {deleteAudioFile}
				/>
		</div>
		<br/> <br/>
        <div>
            <RaisedButton
                label = "Add Drag Option"                
                onClick = {openDialog}
            />
        </div>
        <br/>
        <div>
            <Table>
                <TableHeader displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}>
                    <TableRow>       
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.left_align}}>Option Text</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.left_align}}>Answer</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.left_align}}>Feedback</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Edit</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Delete</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
               
                <TableBody displayRowCheckbox = {false}>
                    {questionContent.option.map((row,index)=>(                   
                        <TableRow key={index} >                       
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.text}</TableRowColumn>
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.value}</TableRowColumn>
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align,wordWrap:'break-word', whiteSpace:'normal'}}>{row.feedback}</TableRowColumn>
							<TableRowColumn style={{textAlign:styles.center_align}}>                                
                                <Edit style = {{cursor:'pointer'}} id={index} onClick={onRowClickEdit(index)} />								
                            </TableRowColumn>
                            <TableRowColumn style={{textAlign:styles.center_align}}>                                
                                <Delete style = {{cursor:'pointer'}} id={row.id} onClick={onRowClickDelete(index)} />	
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>                
            </Table>             
        </div><br/> <br/>
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
            <div>
                <OptionTextForm 
					shortcode = {activityShortCode}
                    onChangeText={onChangeText} 
                    onFileChange = {onFileChange}
                    onChangeSelectAnswer = {onChangeSelectAnswer}
                    errors = {errors}
                    fields = {textFields}                    
                    obj="option" 
                    objtype="audio"
                    answer = {selectedAnswer}
                    deleteAudioFile = {deleteAudioFile}
					optionvisible = {options}
                />
            </div>
        </Dialog>
        <br/><br/>
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
export default DragandDropForm;
