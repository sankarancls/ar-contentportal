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
import AnswerForm from '../common/AnswerForm.jsx';
import ELOs from '../common/ELOMapping.jsx';
import Loader from '../common/Loader.jsx';
import Menu from 'material-ui/Menu';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';


const options = {
    text:true,
    audiofile:true,
    imagefile:true,
    answer:true,
    feedback:true
}
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
        
const JigsawForm = ({
    onChangeText,
    styles,
    errors,
    textFields,
    loaded,
    onFileChange,    
    onSubmit,    
    questionContent,   
    deleteAudioFile,    
	onChangeSelectELO,
	chapter_id,
	selectedELO,
	loadPictures,    
    onDeletePictureIndex,
	activityShortCode
    
    }) => (    
    
    
    <Card className="left-container">
		<Loader loaded={loaded} />       
        <p className="container">Jig Saw</p>          
		<br/>
		<TextField                      
            floatingLabelText = "Row Count"
            style={{width:'10%'}}
            name = "rowcount"                
            onChange={onChangeText}
			errorText={errors.rowcount}
            value = {textFields.rowcount}                   
        />
		<br/>
		<TextField                      
            floatingLabelText = "Column Count"
            style={{width:'10%'}}
            name = "columncount"                
            onChange={onChangeText}
			errorText={errors.columncount}
            value = {textFields.columncount}                   
        />
        <br/>
		<div>
            <p className="">Pictures</p>
            <RaisedButton 
                containerElement='label'>
                 <input type="file" onChange={loadPictures} multiple accept='image/*'></input>			
            </RaisedButton>
            <div>
				<List style= {style.list}>
					{questionContent.jigsaw.map((row,index) => (
							<div key={index}>
								<ListItem  style={style.listitem} 
								primaryText={row.image}
								leftAvatar={<Avatar size={100} style={style.avatar}  src={'../resources/'+activityShortCode+'/'+row.image} />}
								rightIcon={<Delete style={style.deletetop} onClick = {onDeletePictureIndex(index,row.image)} />} />
								<Divider/>
							</div>
					))}  
					
				</List>				              
            </div>
        </div><br/><br/>
		<p>Answer</p>
		 <AudioFileAdd shortcode = {activityShortCode}  
			onFileChange = {onFileChange} 
			filetype="image/*" 
			label = "Image" 
			obj="answer" 
			objtype="image"
			filename = {questionContent.answer.image}
			deleteAudioFile = {deleteAudioFile}
		/>
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
export default JigsawForm;
