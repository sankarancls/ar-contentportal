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
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import {List, ListItem} from 'material-ui/List';
import FileUpload from '../../FileUploadComponent.jsx';
import AssessmentType from '../../AssessmentTypes.jsx';
import {Edit,Delete} from 'material-ui-icons'
import Loader from '../common/Loader.jsx';
import Avatar from 'material-ui/Avatar';
import {Table,
        TableBody,
        TableHeader,
        TableHeaderColumn,
        TableRow,
        TableRowColumn
        } from 'material-ui/Table';

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
/*
const style = {
    paper: {
        display: 'inline-block',        
        margin: '16px 32px 16px 0',
    },
    rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
    },
};*/

const DeckForm = ({        
    activityCode,
	errors,
	textFields,
	loaded,
	nodata,	
	onSubmit,
	onChangeText,
	styles,
	activityContent,	
	audioFileChange,	
	deleteAudioFile,	
	questions,
	onChangeAssessment,
	addNewAssessmentOnClick,
	onQuestionRowClickEdit,
	onQuestionRowClickDelete,   
    loadPictures,    
    onDeletePictureIndex,
	activity_type_ref_id,
	activity_coderef
    }) => (    
    
    
    <Card className="left-container">
		<Loader loaded={loaded} />
        <div>
			<p className="container">Type : Deck</p>
            <p>{"Activity Short Code :"+textFields.act_code}</p>
            <p>{"Activity Code "+activity_coderef}</p>
        </div>
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
            <h4 className="">Pictures</h4>
            <RaisedButton 
                containerElement='label'>
                 <input type="file" onChange={loadPictures} multiple accept='image/*'></input>			
            </RaisedButton>
			<div>
				<List style= {style.list}>
					{activityContent.picture.map((row,index) => (
							<div key={index}>
								<ListItem  style={style.listitem} 
								primaryText={row.image}
								leftAvatar={<Avatar size={100} style={style.avatar}  src={'../resources/'+activity_coderef+'/'+row.image} />}
								rightIcon={<Delete style={style.deletetop} onClick = {onDeletePictureIndex(index,row.image)} />} />
								<Divider/>
							</div>
					))}  
					
				</List>				              
            </div>
            
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
        <p className="container">{nodata}</p>
    </Card>   

);
export default DeckForm;