import React, {PropTypes} from 'react';
import MultipleChoiceForm from '../../../components/templates/types/MultipleChoiceForm.jsx';


let styles = {
  height: '300px',
  center_align:"center",
  left_align:"left"
};

let optionFiles = {
    audio:'',
    vo:'',
    image:''
}
let dialogTitle = 'Add';
let optionSelectedIndex = 0;
const optionFields= ['optiontext','feedbacktext', 'optionaudiofile','optionimagefile','optionanswer'];
const levels =['easy','medium','hard'];
const required_fields = ['instruction','questiontext']
let activity_shortcode = '0';
class MultipleChoicePage extends React.Component {
    /**
    * Class Constructor
    */    
    constructor(props){
        super(props);
        activity_shortcode = this.props.shortcode;		
        //Set the initial state //
        this.state = {
            loaded:false,
            files: [],
            question_id : this.props.question_id,
            questionContent: this.initialContentState,
            errors: {
                instruction:'',
                questiontext: '',
                optiontext: '',
                feedbacktext:'',
                helptext:'',
                optionanswer: '',
				optionaudiofile:'',
                optionimagefile:'',
				eloselection:''
            },
            textFields: {
                instruction:'',
                questiontext: '',
                optiontext: '',
                feedbacktext:'',
                helptext:'',
                optionaudiofile:'',
                optionimagefile:''
            },
            dialogToggle : false,
            selectedAnswer:1,
            selectedLevel:1,
			selectedELO:''
        };       
        
        this.onChangeText = this.onChangeText.bind(this);
		this.deleteAudioFile = this.deleteAudioFile.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onClickOption = this.onClickOption.bind(this);
        this.onChangeSelectAnswer = this.onChangeSelectAnswer.bind(this);
        this.onChangeSelectLevel = this.onChangeSelectLevel.bind(this);
        this.onRowClickEdit = this.onRowClickEdit.bind(this);
		this.onRowClickDelete = this.onRowClickDelete.bind(this)
        this.addOption = this.addOption.bind(this);
        this.updateOption = this.updateOption.bind(this);
		this.onChangeSelectELO = this.onChangeSelectELO.bind(this);
    }
	
	/** 
	* Get Initial Content State
	*/
	get initialContentState() {
		return {
			instruction :{
                    text : '',
                    audio:'',
                },
                questiontext:{
                    text: '',
                    image:'',
                    audio:'',
                    vo:''
                },
                option :[],
				levels:{
					easy:'null',
					medium: 'null',
					hard: 'null'
				},
				help:{
					text:'',
					image:'',
					audio:''					
				}
		}
	}

	/**
	* Component Did Mount
	*/
	componentWillMount(){
		if(this.state.question_id != 0){
			this.fetchQuestionInfo();
		}
	}
	
	/**
	* Fetch Question Info
	*/
	
	fetchQuestionInfo() {
		this.setState({
			loaded:true,
		})
		var data = new FormData();
		data.append('json',JSON.stringify({question_id: this.state.question_id}));		
		fetch("http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/questionInfo?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx",{
				method:'POST',
				body:data           
			})
			.then(response => response.json())
			.then(json=>{
				if(json) {					
					const textFields = this.state.textFields;
					let selectedLevel = this.state.selectedLevel;
					textFields['instruction'] = json['que_info']['instruction']['text']					
					textFields['questiontext'] = json['que_info']['questiontext']['text']					
					textFields['helptext'] = json['que_info']['help']['text']
					if(json['que_info']['levels']['easy'] == 1){
						selectedLevel = 1;
					} else if(json['que_info']['levels']['medium'] == 1){
						selectedLevel = 2;
					} else if(json['que_info']['levels']['hard'] == 1){
						selectedLevel = 3;
					} 
					console.log(json['que_info']);
					this.setState({
						questionContent : json['que_info'],
						textFields:textFields,
						loaded:false,
						selectedLevel:selectedLevel,
						selectedELO:json['eloid']
						
					}, function (){
						console.log("tesst");
						console.log(this.state.questionContent)
						console.log("test");
					})
					
				}
				else {                
					this.setState({						
						loaded:false,
						nodata:'No Data Available',
					});
				}		
				
				
			})
	}
	
    
    /** 
    * On Change text Fileds
    */
    onChangeText(event) {              
        const field = event.target.name;
        const textFields = this.state.textFields;         
        const errors = this.state.errors;
        textFields[field] = event.target.value        
        errors[field] = '';
        this.setState({
            textFields:textFields,
            errors:errors,            
        })        
    }    
    
    /** 
    * On Change File
    */
    onFileChange(event,obj,type) {		
        const files = this.state.files;
        const questionContent = this.state.questionContent;
        if(obj == "option"){
            optionFiles[type] = event.target.files[0]['name'];
        }else{
			questionContent[obj][type] = event.target.files[0]['name']; 
		}		
		for (var x = 0;x<event.target.files.length;x++){
			files.push(event.target.files[x]);
		}
        
        this.setState({
            files:files,
            questionContent:questionContent
        }, function(){
            
        })
    }
    
    /** 
    * On Delete File
    */
    deleteAudioFile(obj,type) {		
		const questionContent = this.state.questionContent;
		if(obj=='option'){
			this.deleteFile(questionContent[obj][optionSelectedIndex][type]);			
			optionFiles[type] = '';		
		} else {
			this.deleteFile(questionContent[obj][type]);
			questionContent[obj][type] = "";			
		}
				
		this.setState({            
			questionContent:questionContent
		})
		
    }
	
	/**
    * Delete File from Array 
    */
    deleteFile(name) {
        const files = this.state.files
        for(var i=0;i<files.length;i++){
            if(files[i]['name'] == name){
                files.splice(i,1);
            }
        }
        this.setState({
            files:files,
        })           
    }
    
    /**
    * Open Dialog Handler
    */
    openDialog(){
        this.setState({dialogToggle: true});
    }
    
    /**
    * Close Dialog Handler
    */
    closeDialog(){
        dialogTitle = "Add";
        this.setState({dialogToggle: false});
    }
    
    /**
    * Add Option Handler
    */
    onClickOption(){
        const questionContent = this.state.questionContent;        
        const textFields = this.state.textFields
        const errors = this.state.errors
		var answer = this.state.selectedAnswer;
        var fieldValidation = true;		
        if(textFields['optiontext'] == ''){
            errors['optiontext'] = 'Filed Cannot be Empty!';
            fieldValidation = false;
        }        
        /*if(!this.state.selectedAnswer){
			
            errors['optionanswer'] = 'Select an Answer!';
            fieldValidation = false;
        }*/
        
        if(fieldValidation) {            
            if(dialogTitle == "Add"){
                this.addOption();
            } else if(dialogTitle == "Update"){
                this.updateOption()
            }            
            this.closeDialog();            
        } else{
             this.setState({                
                errors:errors,               
            })
        }
    }
	
	/**
	* Empty Text Fields 
	*/
	clearOptionFields(){
		const textFields = this.state.textFields
		const errors = this.state.errors		
		for(var i in optionFields){		
				textFields[optionFields[i]] = '';		
				errors[optionFields[i]] = '';	
		}		
		this.setState({
			textFields:textFields,
			errors:errors,
			selectedAnswer:1
		}, function(){
			
		})
	}
	
    /**
	* Add Option
	*/
    addOption () {
        const textFields = this.state.textFields
        const questionContent = this.state.questionContent;
        let optionvalues = {
            text:textFields['optiontext'],
            audio:optionFiles['audio'],
            image:optionFiles['image'],
            value : this.state.selectedAnswer,
            feedback:textFields['feedbacktext']
        };
        questionContent['option'].push(optionvalues);
		this.setState({
			questionContent:questionContent,                
		},function(){
			this.clearOptionFields();
		})
    }
    
    updateOption() {
        const textFields = this.state.textFields
        const questionContent = this.state.questionContent;
        questionContent['option'][optionSelectedIndex]['text'] = textFields['optiontext']
        questionContent['option'][optionSelectedIndex]['feedback'] = textFields['feedbacktext']
        questionContent['option'][optionSelectedIndex]['value'] = this.state.selectedAnswer
        for(var i in optionFiles){
           questionContent['option'][optionSelectedIndex][i] = optionFiles[i]
        }
		this.setState({
			questionContent:questionContent,                
		},function(){
			this.clearOptionFields();
		})        
    }    
    
    /**
    * onChangeSelectAnswer
    */
    onChangeSelectAnswer(event,index,value){        
        const errors = this.state.errors;
        errors['optionanswer'] = '';
        this.setState({
            selectedAnswer:value,
            errors:errors
        })
    }
	
	/**
    * on Change ELO
    */
    onChangeSelectELO(event,index,value){        
        const errors = this.state.errors;
        errors['eloselection'] = '';
        this.setState({
            selectedELO:value,
            errors:errors
        })
    }
    
    /**
    * onChangeSelectLevel
    */
    onChangeSelectLevel(event,index,value){
		const questionContent = this.state.questionContent
		var primarytext = event.target.innerHTML
		
		for(var i in levels){
			primarytext = primarytext.toLowerCase();
			if(primarytext == levels[i]) {
				questionContent['levels'][levels[i]] = 1
			}else{
				questionContent['levels'][levels[i]] = 'null'
			}
		}		
        this.setState({
            selectedLevel:value,
			questionContent:questionContent
        }, function(){
			
		})
    }
    
    /**
    * Table Row Click Edit
    */
    onRowClickEdit(index){
        return function(event){
            optionSelectedIndex = index;
            dialogTitle = "Update";
            const questionContent = this.state.questionContent            
            const textFields = this.state.textFields
            textFields['optiontext'] = questionContent['option'][index]['text']
            textFields['feedbacktext'] = questionContent['option'][index]['feedback']
            for(var i in optionFiles){
                optionFiles[i] = questionContent['option'][index][i]
            }            
            textFields['optionaudiofile'] = questionContent['option'][index]['audio']
            textFields['optionimagefile'] = questionContent['option'][index]['image']
            
            this.setState({
                textFields:textFields,
                selectedAnswer : parseInt(questionContent['option'][index]['value'])
            })
            
            this.openDialog();
        }.bind(this)
                
    }
	
	/**
    * Table Row Click Delete
    */
    onRowClickDelete(index){
        return function(event){            
            var result = confirm("Want to delete?");
			if (result) {
				const questionContent = this.state.questionContent            
				questionContent['option'].splice(index, 1);
				this.setState({
					questionContent:questionContent
				})
			}
        }.bind(this)
                
    }
    
    /**
    *On Submit
    */
    onSubmit(event) {
		var validationstatus = this.onSubmitFieldValidation();		
		if(validationstatus){
			const textFields = this.state.textFields			
			const questionContent = this.state.questionContent
			questionContent['instruction']['text'] = textFields['instruction'];
			questionContent['questiontext']['text'] = textFields['questiontext'];
			questionContent['help']['text'] = textFields['helptext'];
			this.setState({
				questionContent:questionContent
			}, function(){				
				this.update_ajax()
			})
		} else{
			
		}
    }
	
	/**
	* Clear All Fields
	*/
	clearFields() {
		const textFields = this.state.textFields
		const questionContent = this.state.questionContent
		textFields['instruction'] = '';
		textFields['questiontext'] = '';
		textFields['helptext'] = '';
		
		this.setState({
			textFields :textFields,
			questionContent:this.initialContentState,
			selectedELO:'',
			selectedLevel:'',
			files:[]
			
		})
		
	}
	
	/**
	* Update Ajax Call
	*/
	update_ajax(){
		const formData = new FormData();
		const questionContent = this.state.questionContent;
		const files = this.state.files;		
		for (var key in files) {
			// check if this is a file:
			if (files.hasOwnProperty(key) && files[key] instanceof File) {
				formData.append(key, files[key]);				
			}
		}		
		formData.append('json',JSON.stringify({questionContent: questionContent,
										   activity_code: this.props.shortcode,
										   chapter_activity_ref_id: this.props.chapter_activity_ref_id,
										   quiz_type_ref_id : this.props.quiz_type_ref_id,
										   question_id: this.state.question_id,
										   elo:this.state.selectedELO,
										   activity_info:this.props.activity_info
									  }));	    
	    
		this.fetchPost('http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/updateQuestionInfo?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx',formData);
		
	}
	
	/**
	* Fetch Post 
	*/
	fetchPost(url,data) {
		this.setState({
			loaded:true
		})
		fetch(url,{
				method:'POST',
				body:data,				
			})
			.then(response => response.json())			
			.then(json=>{
				this.setState({
					loaded:false
				})
				if(json['content']['status'] == 'success'){					
					alert(json['content']['message']);
					if(this.state.question_id==0){
						this.clearFields();
					}
				} else{					
					alert(json['message']);
				}
			})
			.catch(function(error) {
				// If there is any error you will catch them here
				
			})
	}
	
	/** 
	* on Submit Field Validation
	*/
	onSubmitFieldValidation(){		
		const textFields = this.state.textFields
		const errors = this.state.errors;
		const questionContent = this.state.questionContent;
		var validation = true;
		for(var i in required_fields){			
			if(textFields[required_fields[i]] == ""){				
				errors[required_fields[i]] = "Field Cannot be Empty!";
				validation = false;
			}
		}
		if(questionContent['option'].length <=0){			
			alert("Options Cannot be Empty!");
			validation = false;
		} 
		if(this.state.selectedELO==''){
			alert("ELO Cannot be Empty!");
			errors['eloselection'] = 'Field Cannot be Empty!'
			validation = false;
		}
		
		this.setState({
			errors:errors
		})
		return validation;
	}
    
	
    /**
    *Render the components
    */
    render () {        
        return (
            <div> 
                <MultipleChoiceForm 
                    onChangeText = {this.onChangeText}
                    styles={styles}
                    errors = {this.state.errors}
                    textFields = {this.state.textFields}
                    loaded = {this.state.loaded}
                    deleteAudioFile = {this.deleteAudioFile}
                    onFileChange = {this.onFileChange}
                    onSubmit = {this.onSubmit}
                    dialogToggle = {this.state.dialogToggle}
                    openDialog = {this.openDialog}
                    closeDialog = {this.closeDialog}
                    onClickOption = {this.onClickOption}
                    selectedAnswer = {this.state.selectedAnswer}
                    selectedLevel = {this.state.selectedLevel}
                    onChangeSelectAnswer = {this.onChangeSelectAnswer}
                    onChangeSelectLevel = {this.onChangeSelectLevel}
                    questionContent ={this.state.questionContent}
                    onRowClickEdit= {this.onRowClickEdit}
					onRowClickDelete = {this.onRowClickDelete}
                    dialogTitle = {dialogTitle}
					chapter_id = {this.props.chapter_id}
					onChangeSelectELO = {this.onChangeSelectELO}
					selectedELO = {this.state.selectedELO}
					activityShortCode = {activity_shortcode}
                    
                />
            </div>
                
        );
        
    }    
}

export default MultipleChoicePage;
