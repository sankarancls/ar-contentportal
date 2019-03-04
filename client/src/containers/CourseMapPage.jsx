import React, {PropTypes} from 'react';
import CourseMapping from '../components/CourseMapForm.jsx';

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
            courseList:[],
            classID : '',
            loaded: true,
            nodata:'',            
            openDialog : false,
			newCourseSelected:'',
			newCourseList:[],
			textFields:{
				productcode:''
			},
			errors :{
				emptyString : '',
				productcode:'',
				product:''
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
           this.fecthCourses();
        }); 
    }
    
    /**
    *Fetch Class Details
    */
    fecthCourses () {
        var data = new FormData();
        this.setState({
            loaded:false,
            nodata:'',
        })
        data.append('json',JSON.stringify({id: this.state.classID}));
        fetch('http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/enrolledCourses?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx',{
            method:'POST',
            body:data           
        })
        .then(response => response.json())
        .then(json=>{
			console.log(json['enrolled']);
            if(json['enrolled'].length>0){
                 this.setState({
                    courseList:json['enrolled'],
                    loaded:true,
                 });
            } 		
			else {                
                 this.setState({
                    courseList:[],
                    loaded:true,
                    nodata:'No Data Available',
                 });
            }
			
			if(json['available'].length>0){
				const textFields = this.state.textFields;
				textFields['productcode'] = '';
                 this.setState({                   
					newCourseList:json['available'],
					newCourseSelected : '',
					textFields : textFields
                 });
            }
             
                //this.fecthClasses();                
        });        
    }
    
    /**
    *Table Row onclick on edit
    */
    rowClickEdit(courseID,productcode) {
		return function (event) {
			const textFields = this.state.textFields;
			textFields['productcode'] = productcode;
			this.setState({
				newCourseSelected: courseID,
				textFields : textFields
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
				this.fetchPost('http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/deleteClassCourse?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx',data);
				
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
        this.setState({newCourseSelected: value});
    };
	
	/** 
    *Change the class textfield 
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
    *On Submit
    */
    onSubmit(event) {
        event.preventDefault();
        var data = new FormData();
		const textFields = this.state.textFields;
		
		if(this.state.newCourseSelected =="" ){
			const errors = this.state.errors;
			errors['product'] = "Field cannot be empty.";
			this.setState ({
				errors:errors
			})
		} 
		if(textFields['productcode'] == "" ){
			const errors = this.state.errors;
			errors['productcode'] = "Field cannot be empty.";
			this.setState ({
				errors:errors
			})
			
			
		}else {
			data.append('json',JSON.stringify({id : this.state.newCourseSelected,
											   productcode:textFields['productcode'],
											   classID: this.state.classID}));			
			this.fetchPost('http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/mapCourse?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx',data);
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
					this.fecthCourses(); 
					const errors = this.state.errors;
					errors['product'] = '';
					errors['productcode'] = '';
					this.setState ({
						errors:errors
					});
					const textFields = this.state.textFields;
					textFields['productcode'] = '';
					this.handleClose();
				} else{
					const errors = this.state.errors;
					errors['productcode'] = json['message'];
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
                <CourseMapping
                    classID ={this.state.classID}
                    selectChange = {this.selectChange}
                    courseList = {this.state.courseList}
                    styles={styles}
                    loaded={this.state.loaded}
                    nodata = {this.state.nodata}
                    handleOpen= {this.handleOpen}
                    handleClose = {this.handleClose}
                    openDialog = {this.state.openDialog}
					newCourseSelected= {this.state.newCourseSelected}
					newCourseChange = {this.newCourseChange}
					newCourseList = {this.state.newCourseList}
					textFields = {this.state.textFields}
					onChangeText = {this.changeTextField}
					errors = {this.state.errors}
					onSubmit ={this.onSubmit}
					onRowClickEdit = {this.rowClickEdit}
					onRowClickDelete = {this.rowClickDelete}
                    
                />
            </div>
                
        );
        
    }    
}

export default CourseMapPage;
