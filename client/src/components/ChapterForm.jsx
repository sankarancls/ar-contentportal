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
import ClassListMenu from './ClassListPage.jsx';
import CourseListMenu from './CourseListPage.jsx';
import {Edit,Delete} from 'material-ui-icons';
import Loader from './templates/common/Loader.jsx';

import {Table,
        TableBody,
        TableHeader,
        TableHeaderColumn,
		
        TableRow,
        TableRowColumn
        } from 'material-ui/Table';



const CourseMapping = ({        
        classID,		
        selectChange,
        chapterList,
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
		getChaptersOnClick,
		dialogTitle
        
    }) => (    
    
    
    <Card className="container">    
        <Loader loaded={loaded} />   
        <h4 className="card-heading">Chapter Course Mapping</h4>      
        <div style = {{display: 'flex'}} >          
            <ClassListMenu onRequestChange={selectChange}  />
			<CourseListMenu classid={classID} onRequestChange={newCourseChange}  />			
            <RaisedButton
                label="Get"
                primary={true}
				onClick = {getChaptersOnClick}            
				style={{textAlign:'left', height:30,marginTop:30,marginLeft:20}}
              />         
        </div>
        
        <Dialog
          title={dialogTitle+" Chapter"}
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
            <div>
				<TextField
					floatingLabelText = "Chapter #"
					name="chapterno"
					type="number"					
					onChange={onChangeText}
					errorText = {errors.chapterno}
					value = {textFields.chapterno}
				/> 
			</div>
			<div>
				<TextField
					floatingLabelText = "Chapter Name"
					name="chaptername"
					onChange={onChangeText}
					errorText = {errors.chaptername}
					value = {textFields.chaptername}
				/>   
			</div>
        </div>
        
        
        </Dialog>     
        
            <FlatButton primary label="Add New Chapter" style = {{marginLeft:'70%'}} onClick={handleOpen}/>
            <Table>
                <TableHeader displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}>
                    <TableRow>       
                        <TableHeaderColumn id={0} className="table-th" style={{textAlign:styles.left_align,cursor:'pointer'}}>Chapter Name</TableHeaderColumn>
                        <TableHeaderColumn id={1} className="table-th" style={{textAlign:styles.center_align}}>Chapter No</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Edit</TableHeaderColumn>
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Delete</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
               
                <TableBody displayRowCheckbox = {false}>
                    {chapterList.map((row,index)=>(                   
                        <TableRow key={index} >                       
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.name}</TableRowColumn>
                            <TableRowColumn className="table-td" style={{textAlign:styles.center_align}}>{row.chapterno}</TableRowColumn> 
							<TableRowColumn style={{textAlign:styles.center_align}}>
                                <Edit className="material-icons" style = {{cursor:'pointer'}} id={row.id} onClick={onRowClickEdit(row.id,row.name,row.chapterno)}/>								
                            </TableRowColumn>
                            <TableRowColumn style={{textAlign:styles.center_align}}>
                                <Delete className="material-icons" style = {{cursor:'pointer'}} id={row.id} onClick={onRowClickDelete}/>
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>                
            </Table>        
        <p className="card-heading">{nodata}</p> 
    </Card>   

);
export default CourseMapping;
