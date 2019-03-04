import React ,{PropTypes} from 'react';
import {Link} from 'react-router';
import {Card,CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField';
import {Edit,Delete} from 'material-ui-icons';
import ClassListMenu from './ClassListPage.jsx';
import CourseListMenu from './CourseListPage.jsx';
import ChapterListMenu from './ChapterListPage.jsx';
import Loader from './templates/common/Loader.jsx';

import {Table,
        TableBody,
        TableHeader,
        TableHeaderColumn,
        TableRow,
        TableRowColumn
        } from 'material-ui/Table';



const ActivityMapping = ({        
        classID,		
        selectChange,
        ActivityList,
        styles,
        onRowClickEdit,
        onRowClickDelete, 
        loaded,
        nodata,
        handleOpen,
        handleClose,
        openDialog,		
		courseID,
		newCourseChange,
		textFields,
		onChangeText,
		errors,
		onSubmit,
		getActivitiesOnClick,
		dialogTitle,
		chapterID,
		newChapterChange,
        activityNo,        
        activityTypes,
        typeSelected,
        activityTypeHandleChange,
        
    }) => (    
    
    
    <Card className="container">
		<Loader loaded={loaded} />
        <h4 className="card-heading">Activity Chapter Mapping</h4>
        <div style = {{display: 'flex'}} >          
            <ClassListMenu onRequestChange={selectChange} class_id = {classID}  />
			<CourseListMenu classid={classID} onRequestChange={newCourseChange} course_id = {courseID}  />	
			<ChapterListMenu classid={classID} courseid={courseID} onRequestChange={newChapterChange} chapter_id = {chapterID}  />				
            <RaisedButton
                label="Get"
                primary={true}
				onClick = {getActivitiesOnClick}            
				style={{textAlign:'left', height:30,marginTop:30,marginLeft:20}}
              />         
        </div>
        
        <Dialog
          title={dialogTitle+" Activity"}
          actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={handleClose}
				style={{textAlign:'left'}}
              />,
              <FlatButton
                label="Submit"
                primary={true}                
                onClick={onSubmit}
				style={{textAlign:'left'}}
              />,
			  
            ]}
          modal={true}
          open={openDialog}
		  
        >        
             <div>               
                <h4>{"Activity Code "+activityNo}</h4>
				<TextField                      
                    floatingLabelText = "Activity Short Code"
                    name="activityNo"
                    fullWidth
                    onChange={onChangeText}
                    errorText = {errors.description}
                    value = {textFields.activityNo}                   
                />
                <TextField                      
                    floatingLabelText = "Description"
                    name="description"
                    fullWidth
                    onChange={onChangeText}
                    errorText = {errors.description}
                    value = {textFields.description}                   
                />
				<TextField                      
                    floatingLabelText = "Activity Code"
                    name="code"
                    fullWidth
                    onChange={onChangeText}
                    errorText = {errors.code}
                    value = {textFields.code}                   
                />
                <SelectField 
                    value = {typeSelected}
                    floatingLabelText = "Activity Type"
                    errorText = {errors.activitytype}
                    onChange = {activityTypeHandleChange}
                >
                {activityTypes.map((row,index)=> (
                    <MenuItem key = {index} value={row.activity_type_ref_id} primaryText={row.activity_type}/>
                ))}
                </SelectField>
            </div>
        </Dialog>        
        
            <FlatButton primary label="Add New Activity" style = {{marginLeft:'70%'}} onClick={handleOpen}/>
            <Table>
                <TableHeader displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}>
                    <TableRow>       
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.left_align}}>Acitivity Code</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.left_align}}>Acitivity Type</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.left_align,width:'30%'}}>Description</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.left_align}}>Edit</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.left_align}}>Delete</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
               
                <TableBody displayRowCheckbox = {false}>
                    {ActivityList.map((row,index)=>(                   
                        <TableRow key={index} >                       
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.code}</TableRowColumn>
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.type}</TableRowColumn>
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align,wordWrap:'break-word', whiteSpace:'normal',width:'30%'}}>{row.description}</TableRowColumn>
							<TableRowColumn style={{textAlign:styles.left_align}}>
                                <Edit className="material-icons" style = {{cursor:'pointer'}} id={row.id} onClick={onRowClickEdit(row.id,row.code,row.activity_type_ref_id,row.type)}/>							
                            </TableRowColumn>
                            <TableRowColumn style={{textAlign:styles.left_align}}>
                                <Delete className="material-icons" style = {{cursor:'pointer'}} id={row.id} onClick={onRowClickDelete}/>
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>                
            </Table>        
        <p className="card-heading">{nodata}</p> 
    </Card>   

);
export default ActivityMapping;