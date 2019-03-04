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
import AddFile from './templates/common/FileUploadComponent.jsx'
import AutoComplete from 'material-ui/AutoComplete';

import Loader from './templates/common/Loader.jsx';
import {List, ListItem} from 'material-ui/List'
const options = {
    text:true,
    audiofile:true,
    imagefile:true,
    
}

const dataSourceConfig = {
  text: 'activity_searchcombination',
  value: 'activity_ref_id',
};

const dialogCustomContentStyle = {
  width: '70%',
  maxWidth: 'none',
};
const style = {
	list:{
		width:'fit-content',
		padding:0,
	},
	listitem:{		
		
	},
	deletetop:{
		top:50,
	},
	avatar:{
		position:'initial'
	},
    paper: {
        display: 'inline-block',        
        margin: '16px 32px 16px 0',
    },
    rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
    },
};
import {Table,
        TableBody,
        TableHeader,
        TableHeaderColumn,
        TableRow,
        TableRowColumn
        } from 'material-ui/Table';
        
const ARTargetForm = ({
    onChangeText,
    styles,
	classId,
    errors,
    textFields,
    loaded,
    onFileChange,    
    onSubmit,
    openDialog,
    closeDialog,
	addTargetBoo,
	addResourceBoo,
    resourceDialogToggle,
	targetDialogToggle,    
    deleteAudioFile,
    dialogTitle,
	onRowClickDelete,	
	activityShortCode,
	onChangeSelectType,
	selectedType,
	onSubmitResource,
	onSubmitTarget,
	targetContent,
	onDeleteTarget,
	onEditTarget,
	onEditResource,
	resourceFiles,
	buzzleActivities,
	activitiesList,
	languageList,
	selectedActivity,
	selectedLanguage,
	onChangeActivity,
	onChangeLanguage,
	onSubmitMapping,
	mappingDialogToggle,
	addActMappingBoo,
	onEditBuzzleMapping,
	autoCompleteHandleUpdateInput,
	searchText,
	className,
	mapActivityBoo
    }) => (    
    
    
    <Card className="left-container">
		<Loader loaded={loaded} />       
        <p className="container">AR Targets</p>
        <div> 
            <div style={{width:'50%'}}>
				<Table>				   
					<TableBody displayRowCheckbox = {false}>							                   
							<TableRow >                       
								<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>Database File :</TableRowColumn>
								<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>
									<AddFile shortcode = {classId} 
										onFileChange = {onFileChange} 
										filetype="*" 
										label = "" 
										obj="content" 
										objtype="databasefile"
										filename = {textFields.databasefile}
										deleteAudioFile = {deleteAudioFile}
									/>
								</TableRowColumn>
							</TableRow>		
							
							
							<TableRow >                       
								<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>XML File :</TableRowColumn>
								<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>
									<AddFile shortcode = {classId} 
										onFileChange = {onFileChange} 
										filetype="*" 
										label = "" 
										obj="content" 
										objtype="xmlfile"
										filename = {textFields.xmlfile}
										deleteAudioFile = {deleteAudioFile}
									/>
								</TableRowColumn>
							</TableRow>
						))}
					</TableBody>                
				</Table>
			</div>	  
		<br/>
		<RaisedButton
			label = "Submit"
			primary = {true}
			className='left-center'
			onClick = {onSubmit}
			style={{marginLeft:'50%'}}
	   />
        <div>
            <FlatButton
				disabled ={addTargetBoo}
				primary ={true}
                label = "Add Target"                
                onClick = {openDialog('target')}
            />
        </div>
        <br/>
        <div style={{width:'60%'}}>
			<Table>				   
				<TableBody displayRowCheckbox = {false}>
					{targetContent.targets.target.map((row,index) => (						
							<TableRow key={index}>                       
								<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.name}</TableRowColumn>
								<TableRowColumn className="table-td" style={{textAlign:styles.center_align}}>
									<Edit style = {{cursor:'pointer'}} onClick = {onEditTarget(index,row.id,row.name,row.targetfile,row.resource,row.buzzle)} />
								</TableRowColumn>
								<TableRowColumn className="table-td" style={{textAlign:styles.center_align}}>
									<Delete  style = {{cursor:'pointer'}} onClick = {onDeleteTarget(row.id,'target')} />
								</TableRowColumn>
							</TableRow>
							
					))}
				</TableBody>                
			</Table>
							              
		</div>
		
        <Dialog
          title = {dialogTitle+" Target"}
		  autoScrollBodyContent={true}
		  contentStyle={dialogCustomContentStyle}
          actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={closeDialog('target')}
				style={{textAlign:'left'}}
              />,         
			  
            ]}
          modal={true}
          open={targetDialogToggle}		  
        >
            <div>
                <TextField                      
					floatingLabelText = "Target Name"
					name = "targetname"
					style={{width:'80%'}}
					onChange={onChangeText}
					errorText = {errors.targetname}
					value = {textFields.targetname}                   
				/>
				<AddFile 
					shortcode = {classId}
					url = {'../BuzzleConceptCards/'+className+"/TargetImages"}
					onFileChange = {onFileChange} 
					filetype="image/*" 
					label = "Image File :" 
					obj="option" 
					objtype="image"
					filename = {textFields.targetimagefile}
					deleteAudioFile = {deleteAudioFile}
				/>
				<RaisedButton
					label = "Submit"
					primary = {true}
					className='left-center'
					onClick = {onSubmitTarget}
					style={{marginLeft:'45%'}}
			   /><br/>
				<FlatButton
					label = "Add Resourse"
					disabled = {addResourceBoo}
					primary = {true}
					className='left-center'					
					onClick = {openDialog('resource')}					
			    />
				<div>
					<Table>				   
						<TableBody displayRowCheckbox = {false}>
							<TableRow>                       
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>Type</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>Resource File</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.center_align}}>EDIT</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.center_align}}>DELETE</TableRowColumn>
								</TableRow>
							{resourceFiles.map((row,index) => (
								<TableRow key={index} >                       
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.type}</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.resourcefile}</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.center_align}}>
										<Edit style = {{cursor:'pointer'}} onClick = {onEditResource(index,row.id,row.type,row.resourcefile)}/>
									</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.center_align}}>
										<Delete style = {{cursor:'pointer'}} onClick = {onDeleteTarget(row.id,'resource')} />
									</TableRowColumn>
								</TableRow>	
							))}
							
						</TableBody>                
					</Table>
				</div>
				<br/>
				<br/>
				<FlatButton
					label = "Map Activity"
					disabled = {addActMappingBoo}
					primary = {true}
					className='left-center'					
					onClick = {openDialog('mapping')}					
			    />
				<div>
					<Table>				   
						<TableBody displayRowCheckbox = {false}>
							<TableRow>                       
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>Activity ShortCode</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>Description</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>Language</TableRowColumn>
									
									<TableRowColumn className="table-td" style={{textAlign:styles.center_align}}>EDIT
										
									</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.center_align}}>DELETE
										
									</TableRowColumn>
								</TableRow>
							{buzzleActivities.map((row,index) => (
								<TableRow key={index} >                       
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.activity_shortcode}</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.activity_desc}</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.language}</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.center_align}}>
										<Edit style = {{cursor:'pointer'}} onClick = {onEditBuzzleMapping(index,row.id,row.activity_ref,row.language_id)}/>
									</TableRowColumn>
									<TableRowColumn className="table-td" style={{textAlign:styles.center_align}}>
										<Delete  style = {{cursor:'pointer'}} onClick = {onDeleteTarget(row.id,'act_mapping')} />
									</TableRowColumn>
								</TableRow>	
							))}
							
						</TableBody>                
					</Table>
				</div>
            </div>
        </Dialog>
        <Dialog
          title = "Add Resourse"
          actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={closeDialog('resource')}
				style={{textAlign:'left'}}
              />,
              <FlatButton
                label={dialogTitle}
                primary={true}                
                onClick={onSubmitResource}
				style={{textAlign:'left'}}
              />,
			  
            ]}
          modal={true}
          open={resourceDialogToggle}		  
        >
            <div>
                <div>            
					<SelectField
						floatingLabelText = "Select Type"
						onChange = {onChangeSelectType}
						value = {selectedType}
					>
					<MenuItem key={1} value={1} primaryText = "3D_BUNDLE"/>
					<MenuItem key={2} value={2} primaryText = "VIDEO"/>
					<MenuItem key={3} value={3} primaryText = "VIDEO_BUNDLE"/>            
					</SelectField>
				</div>
				<AddFile shortcode = {classId} 
					onFileChange = {onFileChange} 
					filetype="*" 
					label = "" 
					obj="option" 
					objtype="resource"
					filename = {textFields.resourcefile}
					deleteAudioFile = {deleteAudioFile}
				/>
            </div>
        </Dialog>
		<Dialog
          title = "Map Activity"
          actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={closeDialog('mapping')}
				style={{textAlign:'left'}}
              />,
              <FlatButton
                label={dialogTitle}
                primary={true}                
                onClick={onSubmitMapping}
				style={{textAlign:'left'}}
              />,
			  
            ]}
          modal={true}
          open={mappingDialogToggle}		  
        >
            <div>				
				<AutoComplete
					disabled = {mapActivityBoo}
					hintText="Type activity shortcode /description"
					searchText = {searchText}
					fullWidth={true}					
					errorText = {errors.buzzleactivity}
					dataSource={activitiesList}
					onUpdateInput={autoCompleteHandleUpdateInput}
					maxSearchResults = {5}
					dataSourceConfig={dataSourceConfig}					
					openOnFocus={true}
				/>
			</div>
			<div>            
				<SelectField
					floatingLabelText = "Select Language"
					onChange = {onChangeLanguage}
					value = {selectedLanguage}
					errorText = {errors.language}
				>
				{languageList.map((row,index) => (
					<MenuItem key={index} value={row.language_id} primaryText = {row.language}/>					
				))}	          
				</SelectField>
			</div>
                
        </Dialog> 
		</div>	   
    </Card>   

);
export default ARTargetForm;
