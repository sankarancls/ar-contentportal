import React ,{PropTypes} from 'react';
import {Link} from 'react-router';
import {Card,CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton'
import Loader from 'react-loader';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import FileUpload from '../FileUploadComponent.jsx';


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
		changeTermFile,
		changeContentFile,
		showContentUploadButton,
		deleteContentAudio,
		showDeleteContentAudioButton,
		showTermUploadButton,		
		showDeleteTermAudioButton,
		termOnClick,
		onRowClickEdit,
		onRowClickDelete
    }) => (    
    
    
    <div style={{marginRight:20}}>    
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        rel="stylesheet"></link>    
        <h4 style={{marginLeft:'50%'}} className="">Activity Type - Audio</h4>
       
        
        <Dialog
          title="Add Term"
          actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={handleClose}
				style={{textAlign:'left'}}
              />,
              <FlatButton
                label="Add"
                primary={true}                
                onClick={termOnClick}
				style={{textAlign:'left'}}
              />,
			  
            ]}
          modal={true}
          open={openDialog}		  
        >
		<div>
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
		
		<div className="field-line" style = {{display: 'flex'}} >
			<h4>Audio File :</h4>
			<h4>{textFields.pronunciation}</h4>
			<i className="material-icons" style = {{cursor:'pointer', marginTop:15, display:showDeleteTermAudioButton}} onClick = {deleteContentAudio('term')}>delete</i>
			<RaisedButton style = {{display:showTermUploadButton , height:35,marginTop:10,marginLeft:20}}
				containerElement='label'			
				>
				<input type="file" onChange={changeTermFile} accept='.mp3'></input>				
			</RaisedButton>
						
		</div>
		
             
        </Dialog>
        
        <Loader loaded={loaded} lines={13} length={15} width={5} radius={15}
            corners={1} rotate={0} direction={1} color="#000" speed={1}
            trail={60} shadow={false} hwaccel={false} className="spinner"
            zIndex={2e9} top="50%" left="50%" scale={1.00}
            >
		<div className="field-line">
		<h4>{"Activity Code "+textFields.act_code}</h4>			
		</div>

		<div className="field-line">
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

		<div className="field-line">
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
		
		<div className="field-line" style = {{display: 'flex'}} >
			<h4>Audio File :</h4>
			<h4>{activityContent.filename}</h4>
			<i className="material-icons" style = {{cursor:'pointer', marginTop:15, display:showDeleteContentAudioButton}} onClick = {deleteContentAudio('content')}>delete</i>
			<RaisedButton style = {{display:showContentUploadButton , height:35,marginTop:10,marginLeft:20}}
				containerElement='label'
				
				label="Choose an Audio File">
				<input type="file" onChange={changeContentFile} accept='.mp3'></input>				
			</RaisedButton>
						
		</div>
		<Divider />  
      
		<div style={{marginTop:20}}>
			<RaisedButton 
			primary = {true}            
			label="Add Term"
			onClick = {handleOpen}
			style={{float:'right'}} />
		</div>
		
		<div>
			<Table>
                <TableHeader displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}>
                    <TableRow>       
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Term</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Meaning</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Audio Filename</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Edit</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Delete</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
               
                <TableBody displayRowCheckbox = {false}>
                    {activityContent.glossaryroot.glossary.map((row,index)=>(                   
                        <TableRow key={index} >                       
                            <TableRowColumn className="table-td" style={{textAlign:styles.center_align}}>{row.term}</TableRowColumn>
                            <TableRowColumn className="table-td" style={{textAlign:styles.center_align}}>{row.meaning}</TableRowColumn>
                            <TableRowColumn className="table-td" style={{textAlign:styles.center_align}}>{row.pronunciation}</TableRowColumn>
							<TableRowColumn style={{textAlign:styles.center_align}}>
                                <i className="material-icons" style = {{cursor:'pointer'}} id={row.number} onClick={onRowClickEdit(row.term,row.meaning,row.pronunciation,index)} >edit</i>
                            </TableRowColumn>
                            <TableRowColumn style={{textAlign:styles.center_align}}>
                                <i className="material-icons" style = {{cursor:'pointer'}} id={row.number} onClick={onRowClickDelete(index)}>delete</i>
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
                
            </Table> 
		
		</div>
		<div style={{marginTop:20}}>
			<RaisedButton 
			primary = {true}            
			label="Submit"
			onClick = {onSubmit}
			style={{marginLeft:'50%'}} />
		</div>
        </Loader>
        <h4 className="card-heading">{nodata}</h4>
		
		
    </div>   

);
export default AudioForm;