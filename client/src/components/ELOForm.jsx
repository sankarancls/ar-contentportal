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
import ChapterListMenu from './ChapterListPage.jsx';
import {Edit,Delete} from 'material-ui-icons';
import Loader from './templates/common/Loader.jsx';
import AutoComplete from 'material-ui/AutoComplete';

import {Table,
        TableBody,
        TableHeader,
        TableHeaderColumn,
        TableRow,
        TableRowColumn
        } from 'material-ui/Table';


const dataSourceConfig = {
	text: 'name',
	value: 'id',
};

const ELOMapping = ({        
        classID,		
        selectChange,
        eloList,
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
		getElosOnClick,
		dialogTitle,
		chapterID,
		newChapterChange,
		autoCompleteHandleUpdateInput,
		searchText,
		mapTopicBoo,
		topicList
        
    }) => (    
    
    
    <Card className="container">
		<Loader loaded={loaded} />         
        <h4 className="card-heading">ELO Chapter Mapping</h4>
        <div style = {{display: 'flex'}} >          
            <ClassListMenu onRequestChange={selectChange}  />
			<CourseListMenu classid={classID} onRequestChange={newCourseChange}  />	
			<ChapterListMenu courseid={courseID} onRequestChange={newChapterChange}  />				
            <RaisedButton
                label="Get"
                primary={true}
				onClick = {getElosOnClick}            
				style={{textAlign:'left', height:30,marginTop:30,marginLeft:20}}
              />         
        </div>
        
        <Dialog
          title={dialogTitle+" ELO"}
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
					floatingLabelText = "ELO Name"
					name="eloname"
					onChange={onChangeText}
					errorText = {errors.eloname}
					value = {textFields.eloname}
				/>   
			</div>
			<br/>
			<h5>Map Topic :</h5>
			
			<div>				
				<AutoComplete
					disabled = {mapTopicBoo}
					hintText="Type Topic Name"
					searchText = {searchText}
					fullWidth={true}					
					errorText = {errors.topicname}
					dataSource={topicList}
					onUpdateInput={autoCompleteHandleUpdateInput}
					maxSearchResults = {5}
					dataSourceConfig={dataSourceConfig}					
					openOnFocus={true}
					
				/>
			</div>
        </div>
        
        
        </Dialog> 
		<FlatButton primary label="Add New ELO" style = {{marginLeft:'70%'}} onClick={handleOpen}/>
		<Table>
			<TableHeader displaySelectAll={false}
			adjustForCheckbox={false}
			enableSelectAll={false}>
				<TableRow>       
					<TableHeaderColumn id={0} className="table-th" style={{textAlign:styles.left_align,cursor:'pointer'}}>ELO Name</TableHeaderColumn>
					<TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Edit</TableHeaderColumn>
					<TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Delete</TableHeaderColumn>
				</TableRow>
			</TableHeader>
		   
			<TableBody displayRowCheckbox = {false}>
				{eloList.map((row,index)=>(                   
					<TableRow key={index} >                       
						<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.name}</TableRowColumn>                           
						<TableRowColumn style={{textAlign:styles.center_align}}>
							<Edit className="material-icons" style = {{cursor:'pointer'}} id={row.id} onClick={onRowClickEdit(row.id,row.name,row.skill_topic_elo_mapping_ref_id,row.topic_ref_id)}/>								
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
export default ELOMapping;
