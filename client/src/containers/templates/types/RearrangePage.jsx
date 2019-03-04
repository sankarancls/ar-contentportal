import React, {PropTypes} from 'react';
import RearrangeForm from '../../../components/templates/types/RearrangeForm.jsx';


let styles = {
  height: '300px',
  center_align:"center",
  left_align:"left"
};

const required_fields = ['instruction','questiontext', 'answertext']
const optionFields= ['optiontext','meaningtext', 'optionaudiofile'];
let glossary_length = 0;
let optionSelectedIndex = 0;
let optionFiles = {
    audio:'',    
}
let dialogTitle = 'Add';
let activity_shortcode = '0';
class RearrangePage extends React.Component {
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
			dialogToggle : false,
            errors: {
                instruction:'',
                questiontext: '',
                answertext: '',                
                helptext:'',                			
				eloselection:'',
				optionaudiofile:'',
				optiontext: '',
				meaningtext:''
            },
            textFields: {
                instruction:'',
                questiontext: '',
                answertext: '',                
                helptext:'',
				optionaudiofile:'',
				optiontext: '',
				meaningtext:''
            },
			
			selectedELO:''
        };       
        
        this.onChangeText = this.onChangeText.bind(this);
		this.deleteAudioFile = this.deleteAudioFile.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);        
		this.onChangeSelectELO = this.onChangeSelectELO.bind(this);
		this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onClickOption = this.onClickOption.bind(this);
		this.onRowClickEdit = this.onRowClickEdit.bind(this);
		this.onRowClickDelete = this.onRowClickDelete.bind(this)
    }
	
	/** 
	* Get Initial Content State
	*/
	get initialContentState() {
		return {
			instruction:'',
			questiontext:{
				text: '',                    
			},
			answer :{
				text: '',
				audio:'',			
			},				
			help:{
				text:'',
				image:'',										
			},
			glossaryroot: {		
				glossary: []
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
					textFields['instruction'] = json['que_info']['instruction']					
					textFields['questiontext'] = json['que_info']['questiontext']['text']
					textFields['helptext'] = json['que_info']['help']['text']
					textFields['answertext'] = json['que_info']['answer']['text']					
					glossary_length = json['que_info']['glossaryroot']['glossary'].length
					
					this.setState({
						questionContent : json['que_info'],
						textFields:textFields,
						loaded:false,						
						selectedELO:json['eloid']
						
					}, function (){						
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
			this.deleteFile(questionContent['glossaryroot']['glossary'][optionSelectedIndex][type]);			
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
		for(var i in optionFiles){
			optionFiles[i] = '';
		}		
		this.setState({
			textFields:textFields,
			errors:errors,			
		}, function(){
			
		})
	}
	
    /**
	* Add Option
	*/
    addOption () {
        const textFields = this.state.textFields
        const questionContent = this.state.questionContent;
		glossary_length+=1;
        let optionvalues = {			
			number:glossary_length,
            term:textFields['optiontext'],                      
            meaning:textFields['meaningtext'],
			audio:optionFiles['audio']
        };
        questionContent['glossaryroot']['glossary'].push(optionvalues);		
		this.setState({
			questionContent:questionContent,                
		},function(){
			
		})
		this.clearOptionFields();
		
    }
    
    updateOption() {
        const textFields = this.state.textFields
        const questionContent = this.state.questionContent;
        questionContent['glossaryroot']['glossary'][optionSelectedIndex]['term'] = textFields['optiontext']
        questionContent['glossaryroot']['glossary']['meaning'] = textFields['meaningtext']
        
        for(var i in optionFiles){
           questionContent['glossaryroot']['glossary'][optionSelectedIndex][i] = optionFiles[i]
        }
		this.setState({
			questionContent:questionContent,                
		},function(){
			this.clearOptionFields();
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
            textFields['optiontext'] = questionContent['glossaryroot']['glossary'][index]['term']
            textFields['meaningtext'] = questionContent['glossaryroot']['glossary'][index]['meaning']
            for(var i in optionFiles){
                optionFiles[i] = questionContent['glossaryroot']['glossary'][index][i]
            }            
            textFields['optionaudiofile'] = questionContent['glossaryroot']['glossary'][index]['audio']			
            
            this.setState({
                textFields:textFields,                
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
				const questionContent = this.state.questionContent	
			if (result) {
				questionContent['glossaryroot']['glossary'].splice(index, 1);	
				this.setState({
					questionContent:questionContent
				})
				
			}
        }.bind(this)
                
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
    *On Submit
    */
    onSubmit(event) {
		var validationstatus = this.onSubmitFieldValidation();		
		if(validationstatus){
			const textFields = this.state.textFields			
			const questionContent = this.state.questionContent
			if(questionContent['glossaryroot']['glossary'].length <=0){			
				alert("Options Cannot be Empty!");
				questionContent['glossaryroot']['glossary'] = [];				
			}
			questionContent['instruction'] = textFields['instruction'];			
			questionContent['questiontext']['text'] = textFields['questiontext'];
			questionContent['help']['text'] = textFields['helptext'];
			questionContent['answer']['text'] = textFields['answertext'];
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
		textFields['answertext'] = '';
		textFields['instructiontitle'] = '';
		
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
                <RearrangeForm 
                    onChangeText = {this.onChangeText}
                    styles={styles}
                    errors = {this.state.errors}
                    textFields = {this.state.textFields}
                    loaded = {this.state.loaded}
                    deleteAudioFile = {this.deleteAudioFile}
                    onFileChange = {this.onFileChange}
                    onSubmit = {this.onSubmit}                    
                    questionContent ={this.state.questionContent}                    
					chapter_id = {this.props.chapter_id}
					onChangeSelectELO = {this.onChangeSelectELO}
					selectedELO = {this.state.selectedELO}
					dialogToggle = {this.state.dialogToggle}
                    openDialog = {this.openDialog}
                    closeDialog = {this.closeDialog}
                    onClickOption = {this.onClickOption}
					onRowClickEdit= {this.onRowClickEdit}
					onRowClickDelete = {this.onRowClickDelete}
                    dialogTitle = {dialogTitle}
                    activityShortCode = {activity_shortcode}
                />
            </div>
                
        );
        
    }    
}

export default RearrangePage;
