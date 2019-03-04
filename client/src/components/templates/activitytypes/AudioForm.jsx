import React ,{PropTypes} from 'react';
import {Link} from 'react-router';
import {Card,CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import {Edit,Delete} from 'material-ui-icons';

import FileUpload from '../../FileUploadComponent.jsx';
import AssessmentType from '../../AssessmentTypes.jsx';
import Loader from '../common/Loader.jsx';


import {Table,
        TableBody,
        TableHeader,
        TableHeaderColumn,
        TableRow,
        TableRowColumn
        } from 'material-ui/Table';



const AudioForm = ({        
        activityCode,
		errors,
		textFields,
		loaded,
		nodata,
		handleOpen,
		handleClose,
		openDialog,
		onSubmit,
		onChangeText,
		styles,
		activityContent,		
		audioFileChange,		
		deleteAudioFile,		
		termOnClick,
		onRowClickEdit,
		onRowClickDelete,
		questions,
		onChangeAssessment,
		addNewAssessmentOnClick,
		onQuestionRowClickEdit,
		onQuestionRowClickDelete,
		activity_type_ref_id,
		termAction,
		activity_coderef
		
    }) => (    
    
    <Card className="left-container">		
		<Loader loaded={loaded} />
		<p className="container">Type - Audio</p>		
		<p>{"Activity Short Code "+textFields.act_code}</p>
		<p>{"Activity Code "+activity_coderef}</p>
        <Dialog
          title={termAction +" Term"}
          actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={handleClose}
				style={{textAlign:'left'}}
              />,
              <FlatButton
                label={termAction}
                primary={true}                
                onClick={termOnClick}
				style={{textAlign:'left'}}
              />,
			  
            ]}
          modal={true}
          open={openDialog}		  
        >
		<div className="">
			<TextField
			  floatingLabelText="Term"
			  name="term"
			  errorText={errors.term}
			  onChange={onChangeText}
			  value={textFields.term}
			/>
		</div>
		<div>
			<TextField
			  floatingLabelText="Meaning"
			  name="meaning"
			  style={{width:'80%'}}
			  multiLine
			  errorText={errors.meaning}
			  onChange={onChangeText}
			  value={textFields.meaning}
			/>
		</div>
		<FileUpload 
			shortcode = {activity_coderef} 
			label = "Audio :" 
			filename={textFields.pronunciation}			
			type='term'
			filetype="audio/*" 
			onFileChange={audioFileChange} 
			deleteAudioFile = {deleteAudioFile}
		/>	
             
        </Dialog>

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
			  floatingLabelText="Audio Text"          
			  name="audio_text"
			  multiLine={true}
			  rowsMax={2}
			  onChange={onChangeText}
			  style={{width:'70%'}}
			  errorText={errors.audio_text}
			  value={textFields.audio_text}
			/>
		</div>
		
		<FileUpload 
			shortcode = {activity_coderef} 
			label ="Audio :" 
			filename={activityContent.filename} 
			type='content' 
			filetype="audio/*" 
			onFileChange={audioFileChange} 
			deleteAudioFile = {deleteAudioFile}
		/>
		<br/><br/>
		<Divider /> <br/><br/> 
      
		<div>
			<RaisedButton			            
			label="Add Term"			
			onClick = {handleOpen}
			/>
		</div>
		
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
                    {activityContent.glossaryroot.glossary.map((row,index)=>(                   
                        <TableRow key={index} >                       
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.term}</TableRowColumn>
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.meaning}</TableRowColumn>
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.pronunciation}</TableRowColumn>
							<TableRowColumn style={{textAlign:styles.center_align}}>
                                <Edit className="material-icons" style = {{cursor:'pointer'}} id={row.number} onClick={onRowClickEdit(row.term,row.meaning,row.pronunciation,index)} />
                            </TableRowColumn>
                            <TableRowColumn style={{textAlign:styles.center_align}}>
                                <Delete className="material-icons" style = {{cursor:'pointer'}} id={row.number} onClick={onRowClickDelete(index)}/>
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>                
            </Table>		
		</div><br/><br/>
		<div style={{marginTop:20}}>
			<RaisedButton 
			primary = {true}            
			label="Submit"
			onClick = {onSubmit}
			style={{marginLeft:'45%'}} />
		</div>
		<br/><br/>
		<Divider />
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
export default AudioForm;