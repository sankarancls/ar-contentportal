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
import {Edit, Delete} from 'material-ui-icons';

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



const PictureGalleryForm = ({        
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
		fileChange,		
		deleteFile,		
		termOnClick,
		onRowClickEdit,
		onRowClickDelete,
		questions,
		onChangeAssessment,
		addNewAssessmentOnClick,
		onQuestionRowClickEdit,
		onQuestionRowClickDelete,
		termAction,
		activity_type_ref_id,
		showPicture,
		activity_coderef
    }) => (    
    
    
    <Card className="left-container">
		<Loader loaded={loaded} />
		<div>
			<p className="container">Type : Picture Gallery</p>
            <p>{"Activity Short Code :"+textFields.act_code}</p>
			<p>{"Activity Code "+activity_coderef}</p>
            
        </div>
		       
        <Dialog
          title={termAction+" Picture"}
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
		<div>
			<TextField
			  floatingLabelText="Image Description"
			  name="image_text"
			  errorText={errors.image_text}
			  onChange={onChangeText}
			  value={textFields.image_text}
			/>
		</div>
		
		<FileUpload shortcode = {activity_coderef} 
			label="Image :" 
			filename={textFields.galleryimage} 
			type='picture'
			filetype="Image/*" 
			onFileChange={fileChange} 
			deleteAudioFile = {deleteFile}/>	
             
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
		<br/>		
		<br/> 
      
		<div>
			<RaisedButton			            
			label="Add Picture"
			onClick = {handleOpen}
			 />
		</div>
		
		<div>			
			<Table>
                <TableHeader displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}>
                    <TableRow>       
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.left_align}}>Picture Description</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.left_align}}>Image Name</TableHeaderColumn> 
						<TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Image</TableHeaderColumn>                       
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Edit</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Delete</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
               
                <TableBody displayRowCheckbox = {false}>
                    {activityContent.picture.map((row,index)=>(                   
                        <TableRow key={index} >                       
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.text}</TableRowColumn>
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.image}</TableRowColumn>
							<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>
								{showPicture ?
									<img width='100' height='100' style={{borderRadius:'50%'}} src={'../resources/'+activity_coderef+'/'+row.image} alt="No Preview" />
								: null
								}
							</TableRowColumn>                            
							<TableRowColumn style={{textAlign:styles.center_align}}>
                                <Edit className="material-icons" style = {{cursor:'pointer'}} id={row.number} onClick={onRowClickEdit(row.text,row.image,index)} />
                            </TableRowColumn>
                            <TableRowColumn style={{textAlign:styles.center_align}}>
                                <Delete className="material-icons" style = {{cursor:'pointer'}} id={row.number} onClick={onRowClickDelete(index,row.image)}/>
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
export default PictureGalleryForm;