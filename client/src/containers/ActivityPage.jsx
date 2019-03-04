import React, {PropTypes} from 'react';
import ActivityMapping from '../components/ActivityForm.jsx';
import ImportComponents from './ImportActivityComponents.jsx';

const data = [
];

let styles = {
  height: '300px',
  center_align:"center",
  left_align:"left"
};

let rows = [];
let activity_type_ref_id = 0;
let activity_type = 'Sample';


let activityInfo =  {
				clas:'',
				subject:'',
				lesson:'',
				type: '',
				id: '',			
			}


class ActivityMapPage extends React.Component {
    /**
    * Class Constructor
    */    
    constructor(props){
        super(props);        
        //Set the initial state //
        this.state = {
            errors :{},
            ActivityList:[],
            classID : this.props.class_id,
            loaded: false,
            nodata:'',            
            openDialog : false,
			courseID:this.props.course_id,
			chapterID:this.props.chapter_id,
			ActivityID:'',
			onSubmitAction:'',
			title:'Add',
			textFields:{				
				description:'',
				code:'',
				activityNo:''
			},
			errors :{
				emptyString : '',				
				description:'',
                activitytype:'',
				code:'',
				activityNo:''
			},
            activityNo: 0,
            activityTypes:[],
            typeSelected: '',
			showComponents: false,			
			activityName:'',		
        };        
        this.selectChange = this.selectChange.bind(this); 
        this.rowClickEdit = this.rowClickEdit.bind(this);
        this.rowClickDelete = this.rowClickDelete.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
		this.newCourseChange = this.newCourseChange.bind(this);
		this.changeTextField = this.changeTextField.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.getActivitiesOnClick = this.getActivitiesOnClick.bind(this);
		this.newChapterChange = this.newChapterChange.bind(this);
        this.activityTypeHandleChange = this.activityTypeHandleChange.bind(this);
		
    }
    
   
    /**
    *Component Mount
    */
    componentDidMount() {		
		if(this.state.chapterID != undefined){
			this.fetchActivities();
		}
        //this.fecthCourses();
    }
    
    /**
    *Select onChange
    */
    selectChange (event,index,id) {			
		//activityInfo['clas'] = event.target.innerHTML;
		activityInfo['clas'] = id;
        this.setState ({
            classID : id
        }, function(){       
           //this.fecthCourses();		   
        }); 
    }
    
    
    /**
    *Table Row onclick on edit
    */
    rowClickEdit(id,activity_code,activitytype_ref_id,activitytype) {		
		return function (event) {			
			activity_type_ref_id = activitytype_ref_id
			activity_type = activitytype
			this.setState({					
				ActivityID:id,
				showComponents : true,
			})			
			
		}.bind(this)		
    }
    
    /**
    *Table Row onclick on delete
    */
    rowClickDelete(event) {
		var result = confirm("Want to delete?");
		if (result) {
			event.preventDefault();
			var data = new FormData();
			if(event.target.id !="" ){			
				data.append('json',JSON.stringify({id : event.target.id}));
				//this.fetchPost('http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/deleteClassCourse?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx',data);
				
			} else {
				alert("ID is missing. Unable to delete. Please contact admin")
			}
		}
        
    }
    
    /**
    *Handle Open
    */
    handleOpen (event) {
        if(this.state.chapterID != ''){
            this.setState({openDialog: true});
        } else {
            alert("Select Chapter!");
        }
    };
    
    /**
    *Handle Close
    */
    handleClose () {
        this.setState({openDialog: false});
    };
    
	 /**
    *New Course Chnage
    */
    newCourseChange (event,index,value) {
		activityInfo['subject'] = event.target.innerHTML
        this.setState({
            chapterID: '',
            typeSelected: '',
            ActivityList : []   
        })
        this.setState({courseID: value});		
    };
	
	 /**
    *New Chapter Chnage
    */
    newChapterChange (event,index,value) {		
		//activityInfo['lesson'] = event.target.innerHTML
		console.log(event.parent);
		activityInfo['lesson'] = value
        this.setState({chapterID: value,
                       ActivityList : []
                    });		
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
	
	/** 
    *Get Activites
    */
	getActivitiesOnClick (event){		
        if(this.state.chapterID == ''){
            alert("Select Class, Course and Chapter from drop down!");
        } else {
            event.preventDefault();
            this.setState({
                title:'Add'
            });
            this.fetchActivities()
        }
	}
	
	fetchActivities() {
		this.setState({
			loaded:true,
		})
        var data = new FormData();
		data.append('json',JSON.stringify({chapterid: this.state.chapterID}));
		fetch("http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/ActivityList?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx",{
				method:'POST',
				body:data           
			})
			.then(response => response.json())
			.then(json=>{
				if(json){
                    let activityNo = parseInt(json['nextCodeNo']);
					const textFields = this.state.textFields					
                    activityNo += 1;
					textFields['activityNo'] = activityNo
					this.setState({
						ActivityList:json['activities'],
                        activityNo:activityNo,
						textFields:textFields,
                        activityTypes:json['activity_types'],
						loaded:false,
						nodata:'',
					});
					if(json['activities'].length<=0) {						
						this.setState({
							ActivityList:[],
							nodata:'No Data Available',
						});
					}
				} 		
				
				
			})
	}
    
    /** 
    * Activity Type Change Handeler
    */
    activityTypeHandleChange (event,index,value) {
		activityInfo['type'] = event.target.innerHTML
        this.setState ({typeSelected:value}); 
        const errors = this.state.errors;
        errors['activitytype'] = "";
        this.setState ({
                errors:errors
        })
    }
	
	/** 
    *On Submit
    */
    onSubmit(event) {
        event.preventDefault();
        var data = new FormData();		
		const textFields = this.state.textFields;		
		var invokeAjax = true;
		for(var i in textFields) {
			if(textFields[i] == "" ){
				const errors = this.state.errors;
				invokeAjax = false;
				errors[i] = "Field cannot be empty.";
				this.setState ({
					errors:errors
				})
			} 
		}
        if(this.state.typeSelected == ''){
			invokeAjax = false;
            const errors = this.state.errors;
            errors['activitytype'] = "Activity type cannot be empty.";
            this.setState ({
					errors:errors
            })
        }
					
		if(invokeAjax) {
			if(this.state.title == "Add"){
				activityInfo['id'] = textFields['code'];
				data.append('json',JSON.stringify({id : this.state.chapterID,											   
											   description: textFields['description'],
											   code: textFields['code'],
											   activityNumber: textFields['activityNo'],
                                               type : this.state.typeSelected,
											   activityinfo : activityInfo,
											   action:'add'}));			    
			} else{
				data.append('json',JSON.stringify({id : this.state.chapterID,												   
												   Activityname: textFields['Activityname'],
												   Activityid:this.state.ActivityID,
												   action:'update'
											   }));			    
			}
			this.fetchPost('http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/addNewActivity?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx',data);			
			
		}		
    }
	
	/**
	* Fetch Post 
	*/
	fetchPost(url,data) {
		this.setState({
			loaded:true,
		})
		fetch(url,{
				method:'POST',
				body:data           
			})
			.then(response => response.json())
			.then(json=>{
				
				if(json['status'] == 'success'){					
					this.fetchActivities(); 
					const errors = this.state.errors;
					errors['activitytype'] = "";
                    errors['description'] = "";	
					const textFields = this.state.textFields;					
					textFields['description'] = '';
					this.setState ({
						errors:errors,
						textFields:textFields,
                        typeSelected:'',
						loaded:false
					});					
					this.handleClose();
				} else{
					const errors = this.state.errors;					
					alert(json['message']);
					this.setState ({
						errors:errors,
						loaded:false
					})
				}
			})
	}
	
    /**
    *Render the components
    */
    render () {        
        return (
            <div>
			{!this.state.showComponents ?
                <ActivityMapping
                    classID ={this.state.classID}
                    selectChange = {this.selectChange}
                    ActivityList = {this.state.ActivityList}
                    styles={styles}
                    loaded={this.state.loaded}
                    nodata = {this.state.nodata}
                    handleOpen= {this.handleOpen}
                    handleClose = {this.handleClose}
                    openDialog = {this.state.openDialog}
					courseID= {this.state.courseID}
					chapterID= {this.state.chapterID}
					newCourseChange = {this.newCourseChange}					
					textFields = {this.state.textFields}
					onChangeText = {this.changeTextField}
					errors = {this.state.errors}
					onSubmit ={this.onSubmit}
					onRowClickEdit = {this.rowClickEdit}
					onRowClickDelete = {this.rowClickDelete}
					getActivitiesOnClick = {this.getActivitiesOnClick}
					dialogTitle = {this.state.title}
					newChapterChange = {this.newChapterChange}
                    activityNo = {this.state.activityNo}
                    activityTypes = {this.state.activityTypes}
                    typeSelected = {this.state.typeSelected}
                    activityTypeHandleChange = {this.activityTypeHandleChange}                    
                />
				:null
			}
			{this.state.showComponents ?
                <ImportComponents 
					id={this.state.ActivityID} 
					activity_type_ref_id={activity_type_ref_id}
					activity_type={activity_type}
					class_id = {this.state.classID}
					course_id = {this.state.courseID}
					chapter_id = {this.state.chapterID}
                                       
                />
				:null
			}
            </div>
                
        );
        
    }    
}

export default ActivityMapPage;
