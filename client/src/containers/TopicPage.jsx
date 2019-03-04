import React, {PropTypes} from 'react';
import TopicMapping from '../components/TopicForm.jsx';

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



class CourseMapPage extends React.Component {
    /**
    * Class Constructor
    */    
    constructor(props){
        super(props);
        
        //Set the initial state //
        this.state = {
            errors :{},
            topicList:[],
            classID : '',
            loaded: false,
            nodata:'',            
            openDialog : false,
			courseID:'',
			topicID:'',
			onSubmitAction:'',
			title:'Add',
			textFields:{				
				topicname:''
			},
			errors :{
				emptyString : '',				
				topicname:''
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
		this.getTopicsOnClick = this.getTopicsOnClick.bind(this);
		
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
    rowClickEdit(id,topicname) {
		return function (event) {
			const textFields = this.state.textFields;			
			textFields['topicname'] = topicname;
			this.setState({				
				textFields : textFields,
				title:'Modify',
				topicID:id
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
    *Get Topics
    */
	getTopicsOnClick (event){
		event.preventDefault();
		 this.setState({
			title:'Add'
		 });					
		this.fetchTopics()
	}
	
	fetchTopics() {
		this.setState({
			loaded:true,
		})
        var data = new FormData();
		data.append('json',JSON.stringify({classid : this.state.classID,											   
										   courseid: this.state.courseID}));
		fetch("http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/getTopics?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx",{
				method:'POST',
				body:data           
			})
			.then(response => response.json())
			.then(json=>{
				if(json){
					this.setState({
						topicList:json,
						loaded:false,
						nodata:'',
					});
				} 		
				else {                
					 this.setState({
						topicList:[],
						loaded:false,
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
				data.append('json',JSON.stringify({id : this.state.courseID,											   
											   topicname: textFields['topicname'],
											   action:'add'}));			    
			} else{
				data.append('json',JSON.stringify({id : this.state.courseID,												   
												   topicname: textFields['topicname'],
												   topicid:this.state.topicID,
												   action:'update'
											   }));			    
			}
			this.fetchPost('http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/modifyTopic?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx',data);			
			
		}		
    }
	
	/**
	* Fetch Post 
	*/
	fetchPost(url,data) {
		this.setState({
			loaded:true,
		});		
		fetch(url,{
				method:'POST',
				body:data           
			})
			.then(response => response.json())
			.then(json=>{
				
				if(json['status'] == 'success'){
					//alert(json['message']);
					
					const errors = this.state.errors;
					errors['topicname'] = '';					
					const textFields = this.state.textFields;					
					textFields['topicname'] = '';
					this.setState ({
						errors:errors,
						textFields:textFields
					});					
					this.handleClose();
					this.fetchTopics(); 
				} else{
					const errors = this.state.errors;
					errors['topicname'] = json['message'];					
					this.setState ({
						errors:errors,
						loaded:false,
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
                <TopicMapping
                    classID ={this.state.classID}
                    selectChange = {this.selectChange}
                    topicList = {this.state.topicList}
                    styles={styles}
                    loaded={this.state.loaded}
                    nodata = {this.state.nodata}
                    handleOpen= {this.handleOpen}
                    handleClose = {this.handleClose}
                    openDialog = {this.state.openDialog}
					courseID= {this.state.courseID}
					newCourseChange = {this.newCourseChange}					
					textFields = {this.state.textFields}
					onChangeText = {this.changeTextField}
					errors = {this.state.errors}
					onSubmit ={this.onSubmit}
					onRowClickEdit = {this.rowClickEdit}
					onRowClickDelete = {this.rowClickDelete}
					getTopicsOnClick = {this.getTopicsOnClick}
					dialogTitle = {this.state.title}
                    
                />
            </div>
                
        );
        
    }    
}

export default CourseMapPage;
