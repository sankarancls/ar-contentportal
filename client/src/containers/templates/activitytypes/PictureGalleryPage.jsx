import React, {PropTypes} from 'react';
import AudioForm from '../../../components/templates/activitytypes/PictureGalleryForm.jsx';
import AssessmentPage from '../../AssessmentPage.jsx';

let styles = {
  height: '300px',
  center_align:"center",
  left_align:"left",
  margin_right:'80%'
};

let rows = [];
let picture_length = 0;
let termAction = "Add";
let termRowIndex = '';
let chapter_activity_ref_id = 0;
let shortcode = 0;
let activity_coderef = '';

let activity_info = {};
class PictureGalleryPage extends React.Component {
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
				text: '',
				picture: [],
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
				text:'',
			},
			requiredPictureFields : {
				image_text:'',
				galleryimage: ''			
			},
			textFields:{				
				description:'',
				act_code : '',
				text:'',
				image_text:'',
				galleryimage:'',				
			},
			errors :{
				emptyString : '',				
				description:'',                
				act_code:'',
				text:'',
				image_text:'',
				galleryimage:'',
			},            
			files:[],
			addNewAssessmentType: '',
			showAssessmentComponent : false,
			showPicture:true
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);		
		this.changeTextField = this.changeTextField.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		this.deleteFile = this.deleteFile.bind(this);
		this.termOnClick = this.termOnClick.bind(this);
		this.rowClickEdit = this.rowClickEdit.bind(this);
        this.rowClickDelete = this.rowClickDelete.bind(this);
		this.fileChange = this.fileChange.bind(this);
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
    *Handle Open
    */
    handleOpen (event) {
		const requiredPictureFields = this.state.requiredPictureFields;
		if(event) {
			const textFields = this.state.textFields
			const errors = this.state.errors			
			for(var i in requiredPictureFields) {
				textFields[i] = '';	
				errors[i] = '';			
			}
			termAction = "Add";
			this.setState({				
				textFields:textFields,
				errors:errors								
			})
		} else{
			const errors = this.state.errors
			for(var i in requiredPictureFields) {			
				errors[i] = '';			
			}
			this.setState({				
				errors:errors								
			})
			termAction = "Update";
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
						activity_coderef = common_content['activity_code'];
						const textFields = this.state.textFields;
						textFields['description'] = common_content['activity_description'];
						textFields['act_code'] = common_content['activity_shortcode'];										
						if(common_content['common_content_info']){					
							textFields['text'] = common_content['common_content_info']['text'];
							activityContent['text'] = common_content['common_content_info']['text'];
							activityContent['filename'] = common_content['common_content_info']['filename'];						
							activityContent['picture'] = common_content['common_content_info']['picture'];
							picture_length = activityContent['picture'].length
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
		
	fileChange (event,type){
		const textFields = this.state.textFields;
		const activityContent = this.state.activityContent
		if(type=="picture"){
			textFields['galleryimage'] = event.target.files[0]['name'];
		} 
		
		const files= this.state.files		
		files.push(event.target.files[0]);			
		this.setState({
			files:files,
			textFields:textFields,
			activityContent:activityContent
		}, function () {
			
		});
			
	}
	
	/**
	*Delete Content Audio File
	*/
	deleteFile(type){		
		if(type=='content') {
			const activityContent = this.state.activityContent;
			activityContent['filename'] = '';
			this.setState({
				activityContent:activityContent,
			})
		} else {
			const textFields = this.state.textFields;
			this.deleteFile(textFields ['galleryimage']);
			textFields ['galleryimage'] = ''
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
		if(termAction == "Add") {
			this.addTerm();
		} else if(termAction == "Update"){
			this.updateTerm();
		}
	}
	/**
	* Add Term
	*/
	addTerm() {
		const textFields = this.state.textFields;
		const errors = this.state.errors;
		const requiredPictureFields = this.state.requiredPictureFields;
		let addboo = true;
		if(textFields['galleryimage'] == ''){
			addboo = false;
			alert('Upload an audio File');
		}
		for(var i in requiredPictureFields) {			
			if(textFields[i] == ''){
				errors[i] = "Field cannot be empty!";
				addboo = false;
			}				
		}
		this.setState({
			errors:errors
		});
		
		if(addboo){			
			const textFields = this.state.textFields;
			picture_length+=1;
			const addnewPicture = {
				'number':picture_length,
				'text':textFields['image_text'],
				'image':textFields['galleryimage'],			
			}
			const activityContent = this.state.activityContent;
			activityContent['picture'].push(addnewPicture);
			activityContent['text'] = textFields['text'];
			this.setState({
				showPicture:false,
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
		const requiredPictureFields = this.state.requiredPictureFields;
		var updateboo = true;
		for(var i in requiredPictureFields) {
			if(textFields['galleryimage'] == ''){
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
			activityContent['text'] = textFields['text']
			activityContent['picture'][termRowIndex]['text'] = textFields['image_text']
			activityContent['picture'][termRowIndex]['image'] = textFields['galleryimage']			
			this.setState({
				showPicture:false,
				activityContent:activityContent
			}, function(){
				this.update_ajax();	
			})
		}
	}
	/** 
	*Edit Term
	*/
	rowClickEdit(text,image,rowindex) {		
		return function (event){
			termRowIndex = rowindex
			const textFields = this.state.textFields;
			textFields['image_text'] = text
			textFields['galleryimage'] =  image			
			this.setState({				
				textFields:textFields
			});			
			this.handleOpen();			
		}.bind(this)
	}
	
	/** 
	*Delete Term
	*/
	
	rowClickDelete(index,name) {
		return function(event){
			const activityContent = this.state.activityContent;
			activityContent['picture'].splice(index, 1);
			this.deleteFile(name);
			this.setState({
				activityContent:activityContent
			}, function(){
				this.update_ajax();	
			})
		}.bind(this)		
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
            showAssessmentComponent : true
        });
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
		activityContent['text'] = textFields['text']				
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
		console.log(this.state.quizRefID);
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
		this.setState({
			loaded:true,
			showPicture:false
		})
		fetch(url,{
				method:'POST',
				body:data				
			})
			.then(response => response.json())
			.then(json=>{				
				if(json['content']['status'] == 'success'){
					//alert(json['content']['message']);
					//this.fetchActivityContent();
					this.setState({
						files:[],
						loaded:false,
						showPicture:true
					})
					termAction = "Add";					
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
						deleteFile = {this.deleteFile}					
						termOnClick = {this.termOnClick}
						onRowClickEdit = {this.rowClickEdit}
						onRowClickDelete = {this.rowClickDelete}
						fileChange= {this.fileChange}
						questions = {this.state.questionTypes}
						onChangeAssessment = {this.onChangeAssessment}
						addNewAssessmentOnClick = {this.addNewAssessmentOnClick}
						onQuestionRowClickEdit = {this.onQuestionRowClickEdit}
						onQuestionRowClickDelete = {this.onQuestionRowClickDelete}
						termAction = {termAction}
						activity_type_ref_id = {this.props.activity_type_ref_id}
						showPicture = {this.state.showPicture}
						activity_coderef = {activity_coderef}
					/>
					: null
				}
				{this.state.showAssessmentComponent ?
					<AssessmentPage
						quiz_type_ref_id = {this.state.addNewAssessmentType}
						chapter_activity_ref_id = {chapter_activity_ref_id}
						shortcode = {shortcode}
						question_id = {this.state.question_id}
						chapter_id = {this.props.chapter_id}
						activity_info = {activity_info}
						activity_coderef = {activity_coderef}
					/>
					:null
				}
            </div>
                
        );
        
    }    
}

export default PictureGalleryPage;
