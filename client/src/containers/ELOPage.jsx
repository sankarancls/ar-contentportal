import React, {PropTypes} from 'react';
import ELOMapping from '../components/ELOForm.jsx';

const data = [
];

let styles = {
  height: '300px',
  center_align:"center",
  left_align:"left"
};

class ELOMapPage extends React.Component {
    /**
    * Class Constructor
    */    
    constructor(props){
        super(props);
        
        //Set the initial state //
        this.state = {
            errors :{},
            eloList:[],
			topicList:[],
            classID : '',
            loaded: false,
            nodata:'',            
            openDialog : false,
			courseID:'',
			chapterID:'',
			eloID:'',
			onSubmitAction:'',
			title:'Add',
			textFields:{				
				eloname:''
			},
			errors :{
				emptyString : '',				
				eloname:'',
				topicname:'',
			},
			mapTopicBoo:false,
			searchText: '',
			selectedTopic:0,
			topicEloMapId:0
        };        
        this.selectChange = this.selectChange.bind(this); 
        this.rowClickEdit = this.rowClickEdit.bind(this);
        this.rowClickDelete = this.rowClickDelete.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
		this.newCourseChange = this.newCourseChange.bind(this);
		this.changeTextField = this.changeTextField.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.getElosOnClick = this.getElosOnClick.bind(this);
		this.newChapterChange = this.newChapterChange.bind(this);
		this.autoCompleteHandleUpdateInput = this.autoCompleteHandleUpdateInput.bind(this);
		
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
    
	
	//Topic Mapping Auto Complete //
    autoCompleteHandleUpdateInput (searchText,datasource,params) {
		const errors = this.state.errors		
		for (var key in datasource) {
			if(datasource[key]['name'] == searchText){
				errors['topicname'] = '';
				this.setState({
				  selectedTopic: datasource[key]['id'],
				  searchText: datasource[key]['name'],
				  errors: errors
				}, function(){
					
				});
			}
		}		
    };
	
	
    /**
    *Table Row onclick on edit
    */
    rowClickEdit(id,eloname,topic_elo_map_id,topic_ref_id) {
		return function (event) {
			const textFields = this.state.textFields;			
			textFields['eloname'] = eloname;
			const topicList = this.state.topicList

			for (var key in topicList) {				
				if(topicList[key]['id'] == topic_ref_id){
					this.setState({					  
					  searchText: topicList[key]['name'],
					  selectedTopic:topic_ref_id
					});
				}
			}
			this.setState({				
				textFields : textFields,
				title:'Modify',
				eloID:id,
				topicEloMapId:topic_elo_map_id
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
    *Get ELOs
    */
	getElosOnClick (event){
		event.preventDefault();
		 this.setState({
			title:'Add'
		 });					
		this.fetchELOs();
		this.fetchTopics();
	}
	
	fetchELOs() {
		this.setState({
			loaded:true,
		})
        var data = new FormData();
		data.append('json',JSON.stringify({chapterid: this.state.chapterID,courseid:this.state.courseID}));
		fetch("http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/getELOs?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx",{
				method:'POST',
				body:data           
			})
			.then(response => response.json())
			.then(json=>{
				if(json){
					this.setState({
						eloList:json,
						loaded:false,						
						nodata:'',
					});					
				} 		
				else {                
					 this.setState({
						eloList:[],
						loaded:false,						
						nodata:'No Data Available',
					 });
				}
				
			})
	}
	
	fetchTopics() {		
        var data = new FormData();
		data.append('json',JSON.stringify({courseid:this.state.courseID}));
		fetch("http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/getTopics?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx",{
				method:'POST',
				body:data           
			})
			.then(response => response.json())
			.then(json=>{
				if(json){
					this.setState({						
						topicList:json,
						selectedTopic : 0
					});									} 		
				else {                
					 this.setState({						
						topicList:[],
						selectedTopic : 0
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
		const errors = this.state.errors;
		const textFields = this.state.textFields;
		var invokeAjax = true;
		if(this.state.selectedTopic == 0){
			errors['topicname'] = "Field cannot be empty.";
			invokeAjax = false;
			this.setState ({
				errors:errors
			})
		}
		for(var i in textFields) {
			if(textFields[i] == "" ){				
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
											   course_id : this.state.courseID,
											   eloname: textFields['eloname'],
											   selectedTopic:this.state.selectedTopic,
											   action:'add'}));			    
			} else{
				data.append('json',JSON.stringify({id : this.state.chapterID,
												   course_id : this.state.courseID,
												   eloname: textFields['eloname'],
												   eloid:this.state.eloID,
												   topicEloMapId:this.state.topicEloMapId,
												   selectedTopic:this.state.selectedTopic,
												   action:'update'
											   }));			    
			}
			this.fetchPost('http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/modifyELO?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx',data);			
			
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
					errors['eloname'] = '';					
					const textFields = this.state.textFields;					
					textFields['eloname'] = '';
					this.setState ({
						errors:errors,
						textFields:textFields,						
						title:'Add',
						loaded:false
					});
					this.handleClose();
					this.fetchELOs(); 
				} else{
					const errors = this.state.errors;
					errors['eloname'] = json['message'];										
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
                <ELOMapping
                    classID ={this.state.classID}
                    selectChange = {this.selectChange}
                    eloList = {this.state.eloList}
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
					getElosOnClick = {this.getElosOnClick}
					dialogTitle = {this.state.title}
					newChapterChange = {this.newChapterChange}
					autoCompleteHandleUpdateInput = {this.autoCompleteHandleUpdateInput}
					searchText = {this.state.searchText}
					mapTopicBoo = {this.state.mapTopicBoo}
					topicList = {this.state.topicList}
                    
                />
            </div>
                
        );
        
    }    
}

export default ELOMapPage;
