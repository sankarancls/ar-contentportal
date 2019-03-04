import React, {PropTypes} from 'react';
import NumbersForm from '../../../components/templates/types/NumbersForm.jsx';


let styles = {
  height: '300px',
  center_align:"center",
  left_align:"left"
};

const required_fields = ['questiontext']
const rows = ['2','3'];
let activity_shortcode = '0';
class NumbersPage extends React.Component {
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
                questiontext: '',                           
                helptext:'',                			
				eloselection:'',				
				operator:'',
				row2ones:'',
				row2tens:'',
				row2hundred:'',
				row2thousand:'',
				row2tenthousand:'',
				row2thousandth:'',
				row2hundredth:'',
				row2tenth:'',				
				row3ones:'',
				row3tens:'',
				row3hundred:'',
				row3thousand:'',
				row3tenthousand:'',
				row3thousandth:'',
				row3hundredth:'',
				row3tenth:'',
				ones:'',
				tens:'',
				hundred:'',
				thousand:'',
				tenthousand:'',
				thousandth:'',
				hundredth:'',
				tenth:'',
            },
            textFields: {                
                questiontext: '',
                answertext: '',                
                helptext:'',				
				row2ones:'',
				row2tens:'',
				row2hundred:'',
				row2thousand:'',
				row2tenthousand:'',
				row2thousandth:'',
				row2hundredth:'',
				row2tenth:'',				
				row3ones:'',
				row3tens:'',
				row3hundred:'',
				row3thousand:'',
				row3tenthousand:'',
				row3thousandth:'',
				row3hundredth:'',
				row3tenth:'',
				ones:'',
				tens:'',
				hundred:'',
				thousand:'',
				tenthousand:'',
				thousandth:'',
				hundredth:'',
				tenth:'',
				
				
            },
			
			selectedELO:'',
			operatorValue:''
        };       
        
        this.onChangeText = this.onChangeText.bind(this);
		this.deleteAudioFile = this.deleteAudioFile.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);        
		this.onChangeSelectELO = this.onChangeSelectELO.bind(this);		
		this.onChangeOperator = this.onChangeOperator.bind(this);
    }
	
	/** 
	* Get Initial Content State
	*/
	get initialContentState() {
		return {			
			questiontext:{
				text: '',
				image:'',
				vo:''				
			},
			answer:'',
			help:{
				text:'',
				image:'',										
			},
			rows:{
				operator:'',
				row:[]
			}
			
		}
	}

	/**
	* Component Will Mount
	*/
	componentDidMount(){
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
									
					textFields['questiontext'] = json['que_info']['questiontext']['text']
					textFields['helptext'] = json['que_info']['help']['text']										
					for(var i in json['que_info']['rows']['row']){			
						textFields["row"+json['que_info']['rows']['row'][i]['rownum']+"ones"] =json['que_info']['rows']['row'][i]['ones']
						textFields["row"+json['que_info']['rows']['row'][i]['rownum']+"tens"]=json['que_info']['rows']['row'][i]['tens']
						textFields["row"+json['que_info']['rows']['row'][i]['rownum']+"hundred"]=json['que_info']['rows']['row'][i]['hundred']
						textFields["row"+json['que_info']['rows']['row'][i]['rownum']+"thousand"]=json['que_info']['rows']['row'][i]['thousand']
						textFields["row"+json['que_info']['rows']['row'][i]['rownum']+"tenthousand"]=json['que_info']['rows']['row'][i]['tenthousand']
						textFields["row"+json['que_info']['rows']['row'][i]['rownum']+"thousandth"]=json['que_info']['rows']['row'][i]['thousandth']
						textFields["row"+json['que_info']['rows']['row'][i]['rownum']+"hundredth"]=json['que_info']['rows']['row'][i]['hundredth'];
						textFields["row"+json['que_info']['rows']['row'][i]['rownum']+"tenth"]=json['que_info']['rows']['row'][i]['tenth'];	
					}
					textFields["ones"] =json['que_info']['answer']['ones']
					textFields["tens"]=json['que_info']['answer']['tens']
					textFields["hundred"]=json['que_info']['answer']['hundred']
					textFields["thousand"]=json['que_info']['answer']['thousand']
					textFields["tenthousand"]=json['que_info']['answer']['tenthousand']
					textFields["thousandth"]=json['que_info']['answer']['thousandth']
					textFields["hundredth"]=json['que_info']['answer']['hundredth'];
					textFields["tenth"]=json['que_info']['answer']['tenth'];					
					this.setState({
						questionContent : json['que_info'],
						textFields:textFields,
						operatorValue:json['que_info']['rows']['operator'],
						loaded:false,						
						selectedELO:json['eloid']
						
					}, function (){
						this.onChangeOperator(event, json['que_info']['rows']['operator'])
						console.log(this.state.operatorValue);
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
			this.deleteFile(questionContent['rows']['row'][optionSelectedIndex][type]);			
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
    * on Change Operators
    */
    onChangeOperator(event, value) {
        const errors = this.state.errors		
        errors['operator'] = '';
        this.setState({
            operatorValue : value,
            errors: errors
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
    *On Submit
    */
    onSubmit(event) {
		var validationstatus = this.onSubmitFieldValidation();		
		if(validationstatus){
			const textFields = this.state.textFields			
			const questionContent = this.state.questionContent
			let row_incr=0;
			for(var i in rows){
				var row = {
					ones:textFields["row"+rows[i]+"ones"],
					tens:textFields["row"+rows[i]+"tens"],
					hundred:textFields["row"+rows[i]+"hundred"],
					thousand:textFields["row"+rows[i]+"thousand"],
					tenthousand:textFields["row"+rows[i]+"tenthousand"],
					thousandth:textFields["row"+rows[i]+"thousandth"],
					hundredth:textFields["row"+rows[i]+"hundredth"],
					tenth:textFields["row"+rows[i]+"tenth"],
					rownum:rows[i]
				}
				questionContent['rows']['row'][row_incr]=row;
				row_incr++;				
			}
			var answerrow = {
					ones:textFields["ones"],
					tens:textFields["tens"],
					hundred:textFields["hundred"],
					thousand:textFields["thousand"],
					tenthousand:textFields["tenthousand"],
					thousandth:textFields["thousandth"],
					hundredth:textFields["hundredth"],
					tenth:textFields["tenth"],					
				}
			questionContent['answer']=answerrow;
			questionContent['rows']['operator'] = this.state.operatorValue									
			questionContent['questiontext']['text'] = textFields['questiontext'];
			questionContent['help']['text'] = textFields['helptext'];
			if(questionContent['answer'].length<=0){
				return alert("Answer Fields cannot be Empty!");
			} else if(questionContent['rows']['row'].length<=0){
				return alert("Row Fields cannot be Empty!");
			}
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
		textFields['questiontext'] = '';
		textFields['helptext'] = '';
		
		for(var i in rows){			
			textFields["row"+rows[i]+"ones"] =''
			textFields["row"+rows[i]+"tens"]=''
			textFields["row"+rows[i]+"hundred"]=''
			textFields["row"+rows[i]+"thousand"]=''
			textFields["row"+rows[i]+"tenthousand"]=''
			textFields["row"+rows[i]+"thousandth"]=''
			textFields["row"+rows[i]+"hundredth"]=''
			textFields["row"+rows[i]+"tenth"]=''			
		}
		textFields["ones"] =''
		textFields["tens"]=''
		textFields["hundred"]=''
		textFields["thousand"]=''
		textFields["tenthousand"]=''
		textFields["thousandth"]=''
		textFields["hundredth"]=''
		textFields["tenth"]=''
			
		
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
                <NumbersForm 
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
					onChangeOperator = {this.onChangeOperator}
					operatorValue = {this.state.operatorValue}
                    activityShortCode = {activity_shortcode}
                />
            </div>
                
        );
        
    }    
}

export default NumbersPage;
