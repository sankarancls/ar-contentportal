import React, {PropTypes} from 'react';
import CoreForm from '../../../components/templates/activitytypes/ExperimentForm.jsx';
import AssessmentPage from '../../AssessmentPage.jsx';

let styles = {
    height: '300px',
    center_align:"center",
    left_align:"left",
    margin_right:'80%'
};

let glossary_length = 0;
let chapter_activity_ref_id = 0;
let shortcode = 0;
let activity_coderef = '';
let activity_info = {};
let slide_trans = '';

class ExperimentPage extends React.Component {
    /**
    * Class Constructor
    */    
    constructor(props){
        super(props);
        this.state = {            
            activityCode: '',
            question_id:0,
            questionTypes: [],
            activityContent: {
                filename : '',
                text: '',               
            },     
            loaded: true,
            nodata:'', 
            ActivityID:'',
            quizRefID:'',
            onSubmitAction:'',           
            requiredFields : {
                description:'',
                act_code : '',
                text:'',
            },            
            textFields:{	
                description:'',
                act_code : '',
                text:'',
                
            },
            errors :this.errorState,            
            files:[],
            addNewAssessmentType: '',
            showAssessmentComponent : false,
            transitionSeconds:''
        };
        
        this.changeTextField = this.changeTextField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteVideoFile = this.deleteVideoFile.bind(this);
        this.videoChangeFile = this.videoChangeFile.bind(this);
        this.onChangeAssessment = this.onChangeAssessment.bind(this);
        this.addNewAssessmentOnClick = this.addNewAssessmentOnClick.bind(this);
        this.onQuestionRowClickEdit = this.onQuestionRowClickEdit.bind(this);
        this.onQuestionRowClickDelete = this.onQuestionRowClickDelete.bind(this);        
        this.deleteFile = this.deleteFile.bind(this);
    }
    
    
    /** 
    * Errors Initial State
    */
    get errorState(){
        return {
            description:'',            
            act_code:'',
            text:'',  
        }
    }
    
   
    /**
    *Component Mount
    */
    componentWillMount() {
        this.fetchActivityContent();
    }    
    
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
                    slide_trans = '';
                    const common_content = json['content']; 
                    const textFields = this.state.textFields;
                    const activityContent = this.state.activityContent;
                    activity_info = common_content['activity_info'];	
                    chapter_activity_ref_id = common_content['chapter_activity_ref_id'];
                    shortcode = common_content['activity_shortcode'];
					activity_coderef = common_content['activity_code'];
                    textFields['description'] = common_content['activity_description'];
                    textFields['act_code'] = common_content['activity_shortcode'];                    
                    if(common_content['common_content_info']){
                        textFields['text'] = common_content['common_content_info']['text'];
                        activityContent['text'] = common_content['common_content_info']['text'];
                        activityContent['filename'] = common_content['common_content_info']['filename'];                      
                    }
                    this.setState({
                        textFields:textFields,
                        files:[],
                        errors: this.errorState,
                        activityContent : activityContent,
                        quizRefID : common_content['quiz_ref_id'],	
                        loaded:false,
                        nodata:'',
                        transitionSeconds:parseInt(slide_trans)
                        
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
	videoChangeFile (event,type){        
        const activityContent = this.state.activityContent
        if(type=='content'){
            activityContent['filename'] = event.target.files[0]['name']
        }        
        const files= this.state.files	
        files.push(event.target.files[0]);	
        this.setState({
            files:files,            
            activityContent:activityContent
        });
	
	}
	
	/**
	*Delete Content Audio File
	*/
    deleteVideoFile(type){	
        if(type=='content') {
            const activityContent = this.state.activityContent;
            this.deleteFile(activityContent['filename']);
            activityContent['filename'] = '';
            this.setState({
                activityContent:activityContent,
            })
        } 
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
        const errors = this.state.errors;        
        const activityContent = this.state.activityContent;	
        let invokeAjax = true;
        const requiredFields = this.state.requiredFields;      
            
        for(var i in requiredFields) {
            if(textFields[i] == "" ){                
                invokeAjax = false;
                errors[i] = "Field cannot be empty.";
                this.setState ({
                    errors:errors
                })
            } 
        }
        
        activityContent['text'] = textFields['text']        
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
			loaded:true
		})
        fetch(url,{
            method:'POST',
            body:data	
        })
        .then(response => response.json())
        .then(json=>{       
            if(json['content']['status'] == 'success'){
                //alert(json['content']['message']);
                this.setState({
                    files:[],
					loaded:false,
                    errors:this.errorState
                })
                //this.fetchActivityContent();
            }else{	
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
                    <CoreForm
                        styles={styles}
                        activityContent = {this.state.activityContent}
                        loaded={this.state.loaded}
                        nodata = {this.state.nodata}		
                        textFields = {this.state.textFields}
                        onChangeText = {this.changeTextField}
                        onSubmit = {this.onSubmit}
                        errors = {this.state.errors}	
                        deleteVideoFile = {this.deleteVideoFile}
                        videoChangeFile= {this.videoChangeFile}
                        questions = {this.state.questionTypes}
                        onChangeAssessment = {this.onChangeAssessment}
                        addNewAssessmentOnClick = {this.addNewAssessmentOnClick}
                        onQuestionRowClickEdit = {this.onQuestionRowClickEdit}
                        onQuestionRowClickDelete = {this.onQuestionRowClickDelete}
						activity_type_ref_id = {this.props.activity_type_ref_id}		
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

export default ExperimentPage;