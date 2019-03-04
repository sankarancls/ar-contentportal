import React, {PropTypes} from 'react';
import AudioForm from '../../../components/templates/activitytypes/AudioForm.jsx';
import AssessmentPage from '../../AssessmentPage.jsx';

let styles = {
  height: '300px',
  center_align:"center",
  left_align:"left",
  margin_right:'80%'
};

let rows = [];
let glossary_length = 0;
let termAction = 'Add';
let termRowIndex = '';
let chapter_activity_ref_id = 0;
let shortcode = 0;
let activity_coderef = '';
let activity_info = {};
class AudioPage extends React.Component {
    /**
    * Class Constructor
    */    
    constructor(props){
        super(props);        
        //Set the initial state //
		
        this.state = {            
			activityCode: '',
			question_id:0,
			questionTypes: [],
            activityContent: {
				filename : '',
				text: '',
				glossaryroot: {
					glossary: []
				}
			},     
            loaded: true,
            nodata:'',            
            openDialog : false,			
			ActivityID:'',
			quizRefID:'',
			onSubmitAction:'',
			title:'Add',
			requiredFields : {
				description:'',
				act_code : '',
				audio_text:'',
			},
			requiredTermFields : {
				term:'',
				meaning : '',
				pronunciation:''				
			},
			textFields:{				
				description:'',
				act_code : '',
				audio_text:'',
				term:'',
				meaning:'',
				pronunciation:''
			},
			errors :{
				emptyString : '',				
				description:'',
                activitytype:'',
				act_code:'',
				audio_text:'',
				term:'',
				meaning: '',
				pronunciation:''			
			},            
			files:[],			
			addNewAssessmentType: '',
			showAssessmentComponent : false,
			updateComponent:false
        };
		
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);		
		this.changeTextField = this.changeTextField.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		this.deleteAudioFile = this.deleteAudioFile.bind(this);
		this.termOnClick = this.termOnClick.bind(this);
		this.rowClickEdit = this.rowClickEdit.bind(this);
        this.rowClickDelete = this.rowClickDelete.bind(this);
		this.audioFileChange = this.audioFileChange.bind(this);
		this.onChangeAssessment = this.onChangeAssessment.bind(this);
		this.addNewAssessmentOnClick = this.addNewAssessmentOnClick.bind(this);
		this.onQuestionRowClickEdit = this.onQuestionRowClickEdit.bind(this);
		this.onQuestionRowClickDelete = this.onQuestionRowClickDelete.bind(this);
    }
    
   
    /**
    *Component Mount
    */
    componentDidMount() {		
        this.fetchActivityContent();
    }    
	
	/**
	*Component Receive Props
	*/
	componentWillReceiveProps(props){
		if(!props.componentToggle){
			this.setState({
				showAssessmentComponent : false
			})
		}
	}
	
	shouldComponentUpdate(){
		return true
	}
	
	componentWillUpdate (nextProps, nextState){		
		if(this.state.updateComponent){
			this.setState({
				updateComponent:false
			}, function (){
				this.fetchActivityContent();
			})
			
		}
		
	}
    
    
    /**
    *Handle Open
    */
    handleOpen (event) {
		const requiredTermFields = this.state.requiredTermFields;
		if(event) {
			const textFields = this.state.textFields
			const errors = this.state.errors			
			for(var i in requiredTermFields) {
				textFields[i] = '';	
				errors[i] = '';			
			}
			termAction = 'Add';
			this.setState({				
				textFields:textFields,
				errors:errors								
			})
		} else{
			const errors = this.state.errors
			for(var i in requiredTermFields) {			
				errors[i] = '';			
			}
			this.setState({				
				errors:errors								
			})
			termAction = 'Update';
		}
		this.setState({openDialog: true});
    };
    
    /**
    *Handle Close
    */
    handleClose () {
        this.setState({openDialog: false});
    };
    
	
	/** 
    *Change Textfield 
    */
    changeTextField(event) {		
        const field = event.target.name;        
		const textFields = this.state.textFields;
		const errors = this.state.errors;
		textFields[field] = event.target.value;
		errors[field] = ''
        this.setState ({
            textFields : textFields,			
			errors:errors
        })		
    }
	
	
	fetchActivityContent() {		
        var data = new FormData();
		data.append('json',JSON.stringify({activity_ref_id: this.props.id}));		
		fetch("http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/activityContent?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx",{
				method:'POST',
				body:data           
			})
			.then(response => response.json())
			.then(json=>{
				if(json) {
					if(json['question_types']){
						this.setState({
							questionTypes : json['question_types'], 
						})
					}
					if(json['content']){
						const common_content = json['content'];
						activity_info = common_content['activity_info'];
						const activityContent = this.state.activityContent;						
						chapter_activity_ref_id = common_content['chapter_activity_ref_id'];
						shortcode = common_content['activity_shortcode'];
						activity_coderef = common_content['activity_code']
						const textFields = this.state.textFields;
						textFields['description'] = common_content['activity_description'];
						textFields['act_code'] = common_content['activity_shortcode'];
						
						if(common_content['common_content_info']){						
							textFields['audio_text'] = common_content['common_content_info']['text'];
							activityContent['text'] = common_content['common_content_info']['text'];
							activityContent['filename'] = common_content['common_content_info']['filename'];						
							activityContent['glossaryroot']['glossary']=[]
							activityContent['glossaryroot']['glossary'] = common_content['common_content_info']['glossaryroot']['glossary'];
							glossary_length = activityContent['glossaryroot']['glossary'].length
							
						}
						this.setState({
							textFields:textFields,
							files:[],
							activityContent : activityContent,
							quizRefID : common_content['quiz_ref_id'],						
							loaded:false,
							nodata:'',
							
						});
						
					}
					else {                
						this.setState({						
							loaded:false,
							nodata:'No Data Available',
						});
					}
					
					
				} 		
				
				
			})
	}
    
	/**
	* On Change File	
	*/
		
	audioFileChange (event,type){
		const textFields = this.state.textFields;
		const activityContent = this.state.activityContent
		if(type=="term"){
			textFields['pronunciation'] = event.target.files[0]['name'];
		} else if(type=='content'){
			activityContent['filename'] = event.target.files[0]['name']
		}
		
		const files= this.state.files		
		files.push(event.target.files[0]);			
		this.setState({
			files:files,
			textFields:textFields,
			activityContent:activityContent
		}, function () {
			console.log(this.state.textFields)
		});
			
	}
	
	/**
	*Delete Content Audio File
	*/
	deleteAudioFile(type){		
		if(type=='content') {
			const activityContent = this.state.activityContent;
			activityContent['filename'] = '';
			this.setState({
				activityContent:activityContent,
			})
		} else {
			const textFields = this.state.textFields;
			textFields ['pronunciation'] = ''
			this.setState({
				textFields:textFields,					
			})
		}		
	}
	/**
	* Get Object Keys and Values
	*/
	getObjectKeys(obj){
		let arr = '';
		Object.keys(obj).map(function(keyName, keyIndex) {			
			arr = obj[keyName]['name'];
		})
		return arr;
	}
	
	
	
	/**
	* Term on Click
	*/
	termOnClick(event) {
		if(termAction == 'Add') {
			this.addTerm();
		} else if(termAction == 'Update'){
			this.updateTerm();
		}
	}
	/**
	* Add Term
	*/
	addTerm() {
		const textFields = this.state.textFields;
		const errors = this.state.errors;
		const requiredTermFields = this.state.requiredTermFields;
		let addboo = true;
		if(textFields['pronunciation'] == ''){
			addboo = false;
			alert('Upload an audio File');
		}
		for(var i in requiredTermFields) {			
			if(textFields[i] == ''){
				errors[i] = "Field cannot be empty!";
				addboo = false;
			}				
		}
		this.setState({
			errors:errors
		});
		
		if(addboo){			
			//const pronunciation = this.getObjectKeys(termAudioFile);
			const textFields = this.state.textFields;
			glossary_length+=1;
			const addnewGlossary = {
				'number':glossary_length,
				'term':textFields['term'],
				'meaning':textFields['meaning'],
				'pronunciation': textFields['pronunciation']
			}
			const activityContent = this.state.activityContent;
			activityContent['glossaryroot']['glossary'].push(addnewGlossary);
			this.setState({
				activityContent:activityContent
			}, function(){
				this.update_ajax();	
			})
		}
	}
	
	/**
	* Update Term
	*/
	updateTerm(){
		const textFields = this.state.textFields
		const errors = this.state.errors
		const requiredTermFields = this.state.requiredTermFields;
		var updateboo = true;
		for(var i in requiredTermFields) {
			if(textFields['pronunciation'] == ''){
				updateboo = false;
				return alert('Upload an audio File');
			}
			if(textFields[i] == ''){
				errors[i] = "Field cannot be empty!";
				updateboo = false;
			}				
		}
		this.setState({
			errors:errors
		})
		
		if(updateboo){
			const activityContent = this.state.activityContent;
			activityContent['glossaryroot']['glossary'][termRowIndex]['term'] = textFields['term']
			activityContent['glossaryroot']['glossary'][termRowIndex]['meaning'] = textFields['meaning']
			activityContent['glossaryroot']['glossary'][termRowIndex]['pronunciation'] = textFields['pronunciation']
			this.setState({
				activityContent:activityContent
			}, function(){
				this.update_ajax();	
			})
		}
	}
	/** 
	*Edit Term
	*/
	rowClickEdit(term,meaning,pronunciation,rowindex) {		
		return function (event){
			termRowIndex = rowindex
			const textFields = this.state.textFields;
			textFields['term'] = term
			textFields['meaning'] =  meaning
			textFields ['pronunciation'] = pronunciation
			this.setState({				
				textFields:textFields
			});			
			this.handleOpen();			
		}.bind(this)
	}
	
	/** 
	*Delete Term
	*/
	
	rowClickDelete(index) {
		return function(event){
			const activityContent = this.state.activityContent;
			activityContent['glossaryroot']['glossary'].splice(index, 1);
			this.setState({
				activityContent:activityContent
			}, function(){
				this.update_ajax();	
			})
		}.bind(this)		
	}
	
	/** 
	*On Change Assessment Types
	*/
	onChangeAssessment(event,index,value){        
        this.setState({
            addNewAssessmentType : value
        })
    }
	
	/** 
	*Add new question
	*/    
	addNewAssessmentOnClick(event) {
		this.props.onClickBackIncrement();
		this.setState({			
		    showAssessmentComponent : true,
			question_id:0,
			updateComponent:true
		});
	}
	
	/**
	* on Question Row Click Edit
	*/
	onQuestionRowClickEdit(id,quiz_type_ref_id){		
		return function(event){
			this.props.onClickBackIncrement();
			this.setState({							
				showAssessmentComponent : true,
				question_id:id,
				addNewAssessmentType:quiz_type_ref_id
			});
		}.bind(this)
	}
	
	/**
	* on Question Row Click Delete
	*/
	onQuestionRowClickDelete(event){
		
	}

	
	/** 
    *On Submit
    */
    onSubmit(event) {
        event.preventDefault();       	
		const textFields = this.state.textFields;				
		const activityContent = this.state.activityContent;	
		let invokeAjax = true;
		const requiredFields = this.state.requiredFields;
		for(var i in requiredFields) {
			if(textFields[i] == "" ){				
				const errors = this.state.errors;
				invokeAjax = false;
				errors[i] = "Field cannot be empty.";
				this.setState ({
					errors:errors
				})
			} 
		}
		//activityContent['filename'] = contentaudioFileNames
		activityContent['text'] = textFields['audio_text']
		if(activityContent['filename'] == ''){
			return alert("Please upload a audio file for main content!");			
		}		
		this.setState({
			activityContent:activityContent
		}, function(){			
			if(invokeAjax) {
				this.update_ajax();		
			}
		})		
			
    }
	
	/**
	* Update Ajax Call
	*/
	update_ajax(){
		var data = new FormData();
		const textFields = this.state.textFields;
		
		data.append('json',JSON.stringify({id : this.props.id,
										   quiz_ref_id : this.state.quizRefID,
										   description: textFields['description'],
										   activity_code: activity_coderef,
										   activity_content: this.state.activityContent,												   
									  }));
	    
	    const files = this.state.files;
		for (var i in files) {
			data.append('file'+i,files[i]);
		}						
		this.fetchPost('http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/updateActivityCommonContent?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx',data);
	}
	
	
	/**
	* Fetch Post 
	*/
	fetchPost(url,data) {
		//this.handleClose();
		this.setState({
			loaded:true
		})
		fetch(url,{
				method:'POST',
				body:data				
			})
			.then(response => response.json())
			.then(json=>{
				console.log(json);
				if(json['content']['status'] == 'success'){
					//alert(json['content']['message']);
					//this.fetchActivityContent();
					this.setState({
						files:[],
						loaded:false
					});
					termAction = 'Add';					
					this.handleClose();
				} else{					
					alert(json['message']);
				}
			})
	}
	
    /**
    *Render the components
    */
    render () {        
        return (
            <div>
				{!this.state.showAssessmentComponent ?
					<AudioForm
						styles={styles}
						activityContent = {this.state.activityContent}
						loaded={this.state.loaded}
						nodata = {this.state.nodata}
						handleOpen= {this.handleOpen}
						handleClose = {this.handleClose}
						openDialog = {this.state.openDialog}													
						textFields = {this.state.textFields}
						onChangeText = {this.changeTextField}
						onSubmit = {this.onSubmit}
						errors = {this.state.errors}										
						deleteAudioFile = {this.deleteAudioFile}					
						termOnClick = {this.termOnClick}
						onRowClickEdit = {this.rowClickEdit}
						onRowClickDelete = {this.rowClickDelete}
						audioFileChange= {this.audioFileChange}
						questions = {this.state.questionTypes}
						onChangeAssessment = {this.onChangeAssessment}
						addNewAssessmentOnClick = {this.addNewAssessmentOnClick}
						onQuestionRowClickEdit = {this.onQuestionRowClickEdit}
						onQuestionRowClickDelete = {this.onQuestionRowClickDelete}
						activity_type_ref_id = {this.props.activity_type_ref_id}
						termAction = {termAction}
						activity_coderef = {activity_coderef}
					/>
					: null
				}
				{this.state.showAssessmentComponent ?
					<AssessmentPage
						quiz_type_ref_id = {this.state.addNewAssessmentType}
						chapter_activity_ref_id = {chapter_activity_ref_id}
						shortcode = {shortcode}
						activity_coderef = {activity_coderef}
						question_id = {this.state.question_id}
						chapter_id = {this.props.chapter_id}
						activity_info = {activity_info}
					/>
					:null
				}
            </div>
                
        );
        
    }    
}

export default AudioPage;
