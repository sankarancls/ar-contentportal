import React, {PropTypes} from 'react';
import ActivityMapping from '../components/ActivityForm.jsx';

const data = [
];

let styles = {
  height: '300px',
  center_align:"center",
  left_align:"left"
};

let rows = [];


const changeTable = (row) => {
    console.log(row)
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
            classID : '',
            loaded: true,
            nodata:'',            
            openDialog : false,
			courseID:'',
			chapterID:'',
			ActivityID:'',
			onSubmitAction:'',
			title:'Add',
			textFields:{				
				Activityname:''
			},
			errors :{
				emptyString : '',				
				Activityname:''
			},
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
		
    }
    
   
    /**
    *Component Mount
    */
    componentDidMount() {
        //this.fecthCourses();
    }
    
    /**
    *Select onChange
    */
    selectChange (event,index,id) {
        this.setState ({
            classID : id
        }, function(){       
           //this.fecthCourses();
		   //this.refs.child.getAlert();
        }); 
    }
    
    
    /**
    *Table Row onclick on edit
    */
    rowClickEdit(Activityname) {
		return function (event) {
			const textFields = this.state.textFields;			
			textFields['Activityname'] = Activityname;
			this.setState({				
				textFields : textFields,
				title:'Modify',
				ActivityID:event.target.id
			});
			this.handleOpen(); 
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
        this.setState({openDialog: true});
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
        this.setState({courseID: value});		
    };
	
	 /**
    *New Chapter Chnage
    */
    newChapterChange (event,index,value) {
        this.setState({chapterID: value});		
    };
	
	/** 
    *Change the class textfield 
    */
    changeTextField(event) {
		console.log(event.target.name);
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
		event.preventDefault();
		 this.setState({						
			loaded:false,
			title:'Add'
		 });					
		this.fetchActivities()
	}
	
	fetchActivites() {
		
        var data = new FormData();
		data.append('json',JSON.stringify({chapterid: this.state.chapterID}));
		fetch("http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/getActivities?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx",{
				method:'POST',
				body:data           
			})
			.then(response => response.json())
			.then(json=>{
				if(json){
					this.setState({
						ActivityList:json,
						loaded:true,
						nodata:'',
					});
				} 		
				else {                
					 this.setState({
						ActivityList:[],
						loaded:true,
						nodata:'No Data Available',
					 });
				}
				
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
					
		if(invokeAjax) {
			if(this.state.title == "Add"){
				data.append('json',JSON.stringify({id : this.state.chapterID,											   
											   Activityname: textFields['Activityname'],
											   action:'add'}));			    
			} else{
				data.append('json',JSON.stringify({id : this.state.chapterID,												   
												   Activityname: textFields['Activityname'],
												   Activityid:this.state.ActivityID,
												   action:'update'
											   }));			    
			}
			this.fetchPost('http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/modifyActivity?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx',data);			
			
		}		
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
					this.fetchActivites(); 
					const errors = this.state.errors;
					errors['Activityname'] = '';					
					const textFields = this.state.textFields;					
					textFields['Activityname'] = '';
					this.setState ({
						errors:errors,
						textFields:textFields
					});					
					this.handleClose();
				} else{
					const errors = this.state.errors;
					errors['Activityname'] = json['message'];
					this.setState ({
						errors:errors
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
                    
                />
            </div>
                
        );
        
    }    
}

export default ActivityMapPage;
