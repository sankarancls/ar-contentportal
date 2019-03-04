import React ,{PropTypes} from 'react';
import {Link} from 'react-router';
import {Card,CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import Menu from 'material-ui/Menu';
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
import ELOs from '../common/ELOMapping.jsx';
import Loader from '../common/Loader.jsx';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import {Table,
        TableBody,
        TableHeader,
        TableHeaderColumn,
        TableRow,
        TableRowColumn
        } from 'material-ui/Table';
        
const options = {
    text:false,
    audiofile:false,
    imagefile:true,
    answer:true,
    feedback:false
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
      
const movingGameForm = ({
    onChangeText,
    styles,
    errors,
    textFields,
    loaded,
    onFileChange,    
    onSubmit,
    openDialog,
    closeDialog,
    dialogToggle,
    onClickOption,
    selectedAnswer,    
    onChangeSelectAnswer,    
    questionContent,    
    deleteAudioFile,
    dialogTitle,
    onChangeSelectELO,
    onDeletePictureIndex,
	chapter_id,
	selectedELO,
	activityShortCode
    
    }) => (    
    
    
    <Card className="left-container">
		<Loader loaded={loaded} />          
        <p className="container">Moving Game</p>        
        
        <div >          
            <InstructionForm onChangeText={onChangeText} errorText={errors.instruction} instruction={textFields.instruction}/>
        </div>        
        <br/>         
        <div >          
            <QuestionTextForm 
                onChangeText={onChangeText} 
                errorText={errors.questiontext} 
                questiontext={textFields.questiontext}
            />
            <div style = {{display:'flex'}}>
                 <AudioFileAdd shortcode = {activityShortCode}  
                    onFileChange = {onFileChange} 
                    filetype="image/*" 
                    label = "Image File" 
                    obj="questiontext" 
                    objtype="image"
                    filename = {questionContent.questiontext.image}
                    deleteAudioFile = {deleteAudioFile}
                    />                
                 <AudioFileAdd shortcode = {activityShortCode}  
                    onFileChange = {onFileChange} 
                    filetype="audio/*" 
                    label = "Audio File" 
                    obj="questiontext" 
                    objtype="audio"
                    filename = {questionContent.questiontext.audio}
                    deleteAudioFile = {deleteAudioFile}
                />
                 <AudioFileAdd shortcode = {activityShortCode}  
                    onFileChange = {onFileChange} 
                    filetype="audio/*" 
                    label = "VO File" 
                    obj="questiontext" 
                    objtype="audio"
                    filename = {questionContent.questiontext.vo}
                    deleteAudioFile = {deleteAudioFile}
                />
            </div>
        </div>  
        <br/>
        <br/>
        <Divider />
        <br/>
        <br/> 
        <div>
            <RaisedButton
                label = "Add Option"                
                onClick = {openDialog}
            />
        </div>
        <br/>
        
       <div>
			<List style= {style.list}>
				{questionContent.option.map((row,index) => (
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
        
        <Dialog
          title = {dialogTitle+" Option"}
          actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={closeDialog}
                style={{textAlign:'left'}}
              />,
              <FlatButton
                label={dialogTitle}
                primary={true}                
                onClick={onClickOption}
                style={{textAlign:'left'}}
              />,
              
            ]}
          modal={true}
          open={dialogToggle}		  
        >
            <div>
                <OptionTextForm
					shortcode = {activityShortCode} 
                    onChangeText={onChangeText} 
                    onFileChange = {onFileChange}
                    onChangeSelectAnswer = {onChangeSelectAnswer}
                    errors = {errors}
                    fields = {textFields}                    
                    obj="option" 
                    objtype="audio"
                    answer = {selectedAnswer}
                    deleteAudioFile = {deleteAudioFile}
                    optionvisible = {options}
                />
            </div>
        </Dialog>
        <Divider />
        <br/>
        <br/>       
        <div>            
            <TextField                      
                floatingLabelText = "Help Text"
                name = "helptext"
                style={{width:'80%'}}
                onChange={onChangeText}                
                value = {textFields.helptext}                   
            />
            <div style = {{display:'flex'}}>                
                 <AudioFileAdd shortcode = {activityShortCode}  
                    onFileChange = {onFileChange} 
                    filetype="image/*" 
                    label = "Image File" 
                    obj="help" 
                    objtype="image"
                    filename = {questionContent.help.image}
                    deleteAudioFile = {deleteAudioFile}
                />
            </div>            
        </div>
        <div>            
            <ELOs 
				onChangeSelectELO = {onChangeSelectELO} 
				chapter_id = {chapter_id} 
				selectedELO = {selectedELO}
				errors = {errors} />
        </div>          
                  
        <RaisedButton
            label = "Submit"
            className='left-center'
            primary = {true}
            onClick = {onSubmit}            
       />
    </Card>   

);
export default movingGameForm;