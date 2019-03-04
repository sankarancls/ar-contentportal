import React, {PropTypes} from 'react';
import AudioForm from '../../components/templates/AudioForm.jsx';

let styles = {
  height: '300px',
  center_align:"center",
  left_align:"left",
  margin_right:'80%'
};

let rows = [];
let glossary_length = 0;
let termAction = '';
let termRowIndex = '';

class AudioPage extends React.Component {
    /**
    * Class Constructor
    */    
    constructor(props){
        super(props);
        
        //Set the initial state //
        this.state = {            
			activityCode: '',
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
            termAudioFile:[],
			contentAudioFile:[],
			audioFile:[],
			showContentUploadButton:'none',
			showDeleteContentAudioButton: 'block',
			showTermUploadButton:'none',
			showDeleteTermAudioButton: 'block',			
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);		
		this.changeTextField = this.changeTextField.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.changeTermFile = this.changeTermFile.bind(this);
		this.changeContentFile = this.changeContentFile.bind(this);
		this.deleteContentAudio = this.deleteContentAudio.bind(this);
		this.termOnClick = this.termOnClick.bind(this);
		this.rowClickEdit = this.rowClickEdit.bind(this);
        this.rowClickDelete = this.rowClickDelete.bind(this);
		this.audioFileChange = this.audioFileChange.bind(this);
		
    }
    
   
    /**
    *Component Mount
    */
    componentDidMount() {
        this.fetchActivityContent();
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
			termAction = 'add';
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
			termAction = 'update';
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
				if(json){
					console.log(json);
                    const textFields = this.state.textFields;
					textFields['description'] = json['activity_description'];
					textFields['act_code'] = json['activity_shortcode'];										
					const activityContent = this.state.activityContent;
					if(json['common_content_info']){
						textFields['audio_text'] = json['common_content_info']['text'];
						activityContent['text'] = json['common_content_info']['text'];
						activityContent['filename'] = json['common_content_info']['filename'];
						console.log(activityContent['filename']);
						activityContent['glossaryroot']['glossary'] = json['common_content_info']['glossaryroot']['glossary'];
						glossary_length = activityContent['glossaryroot']['glossary'].length
					}
					if(activityContent['filename'] == ''){
						this.setState({
							showContentUploadButton:'block',
							showDeleteContentAudioButton: 'none'
						})
						
					}
					this.setState({
						textFields:textFields,
						activityContent : activityContent,
						quizRefID : json['quiz_ref_id'],						
						loaded:true,
						nodata:'',
					});
				} 		
				else {                
					 this.setState({						
						loaded:true,
						nodata:'No Data Available',
					 });
				}
				
			})
	}
    
	/**
	* On Change File	
	*/
	
	changeTermFile (event){
		const textFields = this.state.textFields;
		this.setState({
			termAudioFile:event.target.files
		}, function () {			
			textFields['pronunciation'] = this.getObjectKeys(this.state.termAudioFile);			
		});		
	}
	
	/**
	* On Change Content File	
	*/
	
	changeContentFile (event){		
		this.setState({
			contentAudioFile:event.target.files
		}, function () {
			console.log(this.state.contentAudioFile)
		});		
	}
	
	audioFileChange (event,type){
		const textFields = this.state.textFields;
		const activityContent = this.state.activityContent
		if(type=="term"){
			textFields['pronunciation'] = event.target.files[0]['name'];
		} else if(type=='content'){
			activityContent['filename'] = event.target.files[0]['name']
		}
		
		const audioFile= this.state.audioFile		
		audioFile.push(event.target.files[0]);			
		this.setState({
			audioFile:audioFile,
			textFields:textFields,
			activityContent:activityContent
		}, function () {
			console.log(this.state.textFields)
		});
			
	}
	
	/**
	*Delete Content Audio File
	*/
	deleteContentAudio(type){		
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
		/*return function(event) {
		var result = confirm("Are you sure, you want to delete?");
		if (result) {
			console.log(type);
			if(type=='content') {
				const activityContent = this.state.activityContent;
				activityContent['filename'] = '';
				this.setState({
					activityContent:activityContent,
					showContentUploadButton:'block',
					showDeleteContentAudioButton: 'none'
					
				})
			} else {
				const textFields = this.state.textFields;
				textFields ['pronunciation'] = ''
				this.setState({
					textFields:textFields,
					showTermUploadButton:'block',
					showDeleteTermAudioButton: 'none'
				})
			}
		}
		}.bind(this)*/
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
		if(termAction == 'add') {
			this.addTerm();
		} else if(termAction == 'update'){
			this.updateTerm();
		}
	}
	/**
	* Add Term
	*/
	addTerm() {
		const textFields = this.state.textFields;
		const errors = this.state.errors;
		const termAudioFile = this.state.termAudioFile
		let addboo = true;
		if(textFields['term'] == ''){
			errors['term'] = 'Field cannot be empty!';
			addboo = false;
		} if(textFields['meaning'] == ''){
			errors['meaning'] = 'Field cannot be empty!';
			addboo = false;
		} if(textFields['pronunciation'] == ''){
			alert('Upload an audio File');
			addboo = false;
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
				showTermUploadButton:'none',
				showDeleteTermAudioButton: 'block',
				textFields:textFields
			});
			if(pronunciation == ''){
				this.setState({
					showTermUploadButton:'block',
					showDeleteTermAudioButton: 'none',					
				})
			}
			this.handleOpen();			
		}.bind(this)
	}
	
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
    *On Submit
    */
    onSubmit(event) {
        event.preventDefault();       	
		const textFields = this.state.textFields;				
		const activityContent = this.state.activityContent;
		//const contentAudioFile = this.state.contentAudioFile;		 
		// contentaudioFileNames = this.getObjectKeys(contentAudioFile);
		
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
												   activity_code: textFields['act_code'],
												   activity_content: this.state.activityContent,												   
												   }));
		data.append('content_audiofile',this.state.contentAudioFile);	
		data.append('term_audiofile',this.state.termAudioFile);					
		this.fetchPost('http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/updateActivityCommonContent?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx',data);
	}
	
	
	/**
	* Fetch Post 
	*/
	fetchPost(url,data) {
		fetch(url,{
				method:'POST',
				body:data				
			})
			.then(response => response.json())
			.then(json=>{
				
				if(json['status'] == 'succuess'){
					alert(json['message']);
					this.fetchActivityContent();								
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
					changeContentFile = {this.changeContentFile}
					changeTermFile = {this.changeTermFile}
					showContentUploadButton = {this.state.showContentUploadButton}
					deleteContentAudio = {this.deleteContentAudio}
					showDeleteContentAudioButton = {this.state.showDeleteContentAudioButton}
					showTermUploadButton = {this.state.showTermUploadButton}					
					showDeleteTermAudioButton = {this.state.showDeleteTermAudioButton}
					termOnClick = {this.termOnClick}
					onRowClickEdit = {this.rowClickEdit}
					onRowClickDelete = {this.rowClickDelete}
					audioFileChange= {this.audioFileChange}
					
                />
            </div>
                
        );
        
    }    
}

export default AudioPage;
