import React, {PropTypes} from 'react';
import AudioForm from '../../../components/templates/activitytypes/WeblinkForm.jsx';
import AssessmentPage from '../../AssessmentPage.jsx';

let styles = {
  height: '300px',
  center_align:"center",
  left_align:"left",
  margin_right:'80%'
};

let chapter_activity_ref_id = 0;
let shortcode = 0;
let activity_coderef = '';
let activity_info = {};
class WeblinkPage extends React.Component {
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
                url:'',
                description:''
			},     
            loaded: true,
            nodata:'',
			ActivityID:'',
			quizRefID:'',
			onSubmitAction:'',
			title:'Add',
			requiredFields : {
				url_description:'',
				url : '',				
			},
			
			textFields:{				
				description:'',
				act_code:'',
				url : '',
				url_description:'',				
			},
			errors :{
				description:'',
				url : '',
				url_description:'',		
			},
			addNewAssessmentType: '',
			showAssessmentComponent : false
        };
        		
		this.changeTextField = this.changeTextField.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
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
						chapter_activity_ref_id = common_content['chapter_activity_ref_id'];
						shortcode = common_content['activity_shortcode'];
						activity_coderef = common_content['activity_code'];
						const textFields = this.state.textFields;
						const activityContent = this.state.activityContent;
						textFields['description'] = common_content['activity_description'];						
						textFields['act_code'] = common_content['activity_shortcode'];
						if(common_content['common_content_info']){
							textFields['url'] = common_content['common_content_info']['url'];
							textFields['url_description'] = common_content['common_content_info']['description'];
							activityContent['url'] = common_content['common_content_info']['url'];
							activityContent['description'] = common_content['common_content_info']['description'];
						}
                        
						this.setState({
							textFields:textFields,
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
		let invokeAjax = true;
		const requiredFields = this.state.requiredFields;
		for(var i in requiredFields) {
			console.log("ii "+i);
			console.log("i "+textFields[i]);
			if(textFields[i] == "" ){				
				const errors = this.state.errors;
				invokeAjax = false;
				errors[i] = "Field cannot be empty.";
				this.setState ({
					errors:errors
				})
			} 
		}	
		
		if(invokeAjax) {
            this.update_ajax();		
        }	
			
    }
	
	/**
	* Update Ajax Call
	*/
	update_ajax(){
		const activityContent = this.state.activityContent;	
		const textFields = this.state.textFields;
		activityContent['url'] = textFields['url']
		activityContent['description'] = textFields['url_description']
		this.setState({
			activityContent:activityContent
		})
		var data = new FormData();	
		data.append('json',JSON.stringify({id : this.props.id,
										   quiz_ref_id : this.state.quizRefID,
										   description: textFields['description'],
										   activity_code: activity_coderef,
										   activity_content: this.state.activityContent,												   
									  }));	    					
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
				console.log(json);
				if(json['content']['status'] == 'success'){
					//alert(json['content']['message']);
					this.setState({
						loaded:false
					})
					//this.fetchActivityContent();
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
						textFields = {this.state.textFields}
						onChangeText = {this.changeTextField}
						onSubmit = {this.onSubmit}
						errors = {this.state.errors}
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

export default WeblinkPage;
