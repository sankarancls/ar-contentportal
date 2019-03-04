import React ,{PropTypes} from 'react';
import {Link} from 'react-router';
import {Card,CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton'
import Loader from 'react-loader';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import ClassListMenu from './ClassListPage.jsx';

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
        courseList,
        styles,
        onRowClickEdit,
        onRowClickDelete, 
        loaded,
        nodata,
        handleOpen,
        handleClose,
        openDialog,
		newCourseList,
		newCourseSelected,
		newCourseChange,
		textFields,
		onChangeText,
		errors,
		onSubmit
        
    }) => (    
    
    
    <Card className="container">    
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        rel="stylesheet"></link>    
        <h4 className="card-heading">Class Course Mapping</h4>      
        <div style = {{display: 'flex'}} >          
            <ClassListMenu onRequestChange={selectChange}  /> 
                      
        </div>
        
        <Dialog
          title="Add New"
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
				<SelectField 
					floatingLabelText="Select Course"
					value = {newCourseSelected}
					onChange = {newCourseChange}					
					errorText = {errors.product}					
					>
					{newCourseList.map((row,index)=> (
						<MenuItem key = {index} value = {row.id}  primaryText={row.name}/>                
					))}               
                </SelectField>
			</div>
			<div>
				<TextField
					floatingLabelText = "Product Code"
					name="productcode"
					onChange={onChangeText}
					errorText = {errors.productcode}
					value = {textFields.productcode}
				/>   
			</div>
        </div>
        
        
        </Dialog>
        
        <Loader loaded={loaded} lines={13} length={15} width={5} radius={15}
            corners={1} rotate={0} direction={1} color="#000" speed={1}
            trail={60} shadow={false} hwaccel={false} className="spinner"
            zIndex={2e9} top="50%" left="50%" scale={1.00}
            >
            <RaisedButton primary label="Map New Course" style = {{marginLeft:'70%'}} onClick={handleOpen}/>
            <Table>
                <TableHeader displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}>
                    <TableRow>       
                        <TableHeaderColumn id={0} className="table-th" style={{textAlign:styles.left_align,cursor:'pointer'}}>Course Name</TableHeaderColumn>
                        <TableHeaderColumn id={1} className="table-th" style={{textAlign:styles.left_align}}>Product Code</TableHeaderColumn>
                       
                        <TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Delete</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
               
                <TableBody displayRowCheckbox = {false}>
                    {courseList.map((row,index)=>(                   
                        <TableRow key={index} >                       
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.name}</TableRowColumn>
                            <TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.productcode}</TableRowColumn>                            
                            <TableRowColumn style={{textAlign:styles.center_align}}>
                                <i className="material-icons" style = {{cursor:'pointer'}} id={row.id} onClick={onRowClickDelete}>delete</i>
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
                
            </Table> 
        </Loader>
        <h4 className="card-heading">{nodata}</h4> 
    </Card>   

);
export default CourseMapping;
