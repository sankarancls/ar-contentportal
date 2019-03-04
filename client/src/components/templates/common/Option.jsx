import React ,{PropTypes} from 'react';
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import AudioFileAdd from './FileUploadComponent.jsx'


class Option extends React.Component {
    constructor(props){
        super(props);		
        this.state = { 
            errors:this.props.errors,
            fields:this.props.fields,
            selectedAnswer:this.props.answer,
			optionVisible : this.props.optionvisible
        }        
        this.onFileChange = this.onFileChange.bind(this); 
        this.onChangeSelectAnswer = this.onChangeSelectAnswer.bind(this);
        this.deleteAudioFile = this.deleteAudioFile.bind(this);       
    }
    
    
    
    /**
    * onFileChange
    */
    onFileChange(obj,type){
        return function(event) {            
            this.props.onFileChange(event,obj,type)
        }.bind(this)
    }
    
    /**
    *Component Will Receive Props 
    */
    componentWillReceiveProps(props){        
        const fields = this.state.fields
        const errors = this.state.errors
        var answer = this.state.selectedAnswer
        if(this.state.optionVisible['text']) {
			if(props.fields['optiontext']!=this.state.fields['optiontext']){
				fields['optiontext'] = props.fields['optiontext']            
			}
			if(props.errors['optiontext']!=this.state.errors['optiontext']){
				errors['optiontext'] = props.errors['optiontext']           
			} 
		}
		
		if(this.state.optionVisible['feedback']) {
			if(props.fields['feedbacktext']!=this.state.fields['feedbacktext']){
				fields['feedbacktext'] = props.fields['feedbacktext']            
			}
		}
              
         this.setState({
            errors:errors,
            fields:fields,
            selectedAnswer:answer
        })
    }
    
    /**
    * onChangeSelectAnswer
    */
    onChangeSelectAnswer(event,index,value){
        this.setState({
            selectedAnswer:value
        })
        this.props.onChangeSelectAnswer(event,index,value);
    }
    
    /**
    * On Delete File
    */
    deleteAudioFile(obj,type){		
		this.props.deleteAudioFile(obj,type);
    }
   
    
    
    render() {		
        return (
        <div>
			{this.state.optionVisible['text'] ?
				<TextField                      
					floatingLabelText = "Option Text"
					name = "optiontext"
					style={{width:'80%'}}
					onChange={this.props.onChangeText}
					errorText = {this.state.errors['optiontext']}
					value = {this.state.fields['optiontext']}                   
				/>
			:null
			}
			{this.state.optionVisible['audiofile'] ?
				<AudioFileAdd shortcode = {this.props.shortcode}
					onFileChange = {this.onFileChange(this.props.obj,'audio')} 
					filetype="audio/*" 
					label = "Audio File" 
					obj="option" 
					objtype="audio"
					filename={this.state.fields['optionaudiofile']}
					deleteAudioFile = {this.deleteAudioFile}
				/>
			: null
			}
			
			{this.state.optionVisible['imagefile'] ?
				<AudioFileAdd shortcode = {this.props.shortcode}
					onFileChange = {this.onFileChange(this.props.obj,'image')} 
					filetype="image/*" 
					label = "Image File" 
					obj="option" 
					objtype="image"
					filename={this.state.fields['optionimagefile']}
					deleteAudioFile = {this.deleteAudioFile}
				/>
			: null 
			}
			
            {this.state.optionVisible['answer'] ?            
				<SelectField
					floatingLabelText = "Correct / Incorrect"
					onChange = {this.onChangeSelectAnswer}
					value = {this.state.selectedAnswer}
					errorText = {this.state.errors['optionanswer']}
				>
				<MenuItem key={1} value={1} primaryText = "Correct"/>
				<MenuItem key={2} value={0} primaryText = "In Correct"/>            
				</SelectField>
			: null
			}
			
			{this.state.optionVisible['feedback'] ?
				<TextField                      
					floatingLabelText = "Feedback Text"
					name = "feedbacktext"
					style={{width:'80%'}}
					onChange={this.props.onChangeText}                    
					value = {this.state.fields['feedbacktext']}                   
				/>  
			: null
			}
			{this.state.optionVisible['feedbackimage'] ?				
				<AudioFileAdd shortcode = {this.props.shortcode}
					onFileChange = {this.onFileChange(this.props.obj,'feedbackimage')} 
					filetype="image/*" 
					label = "Feedback Image File" 
					obj="option" 
					objtype="feedbackimage"
					filename={this.state.fields['feedbackimage']}
					deleteAudioFile = {this.deleteAudioFile}
				/>  
			: null
			}			
            
        </div>
        )
    }
}

Option.propTypes = {
    onChangeText : PropTypes.func.isRequired,
    onFileChange : PropTypes.func.isRequired,
    onChangeSelectAnswer : PropTypes.func.isRequired,
    deleteAudioFile : PropTypes.func.isRequired
}
export default Option;
