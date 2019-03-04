import React, {PropTypes} from 'react';
import ARTargetForm from '../components/ARTargetForm.jsx';


let styles = {
  height: '300px',
  center_align:"center",
  left_align:"left"
};

let optionFiles = {
    image:'',
	resource:'',
}


let targetSelectedIndex = 0;

let resource_type = '';
let activity_shortcode = '0';

let selectedactivityid = 0;
let selectedlangid = 1;
class ARTargetPage extends React.Component {
    /**
    * Class Constructor
    */    
    constructor(props){
        super(props);
        activity_shortcode = this.props.shortcode;
		const classname_targets = this.props.classname.replace(" ", "");		
        //Set the initial state //
        this.state = {
            loaded:false,
			className:classname_targets,
            files: [],
			dialogTitle:'Add',
            ar_targetid : 0,			
            targetContent: this.initialContentState,
			resourceFiles:[],
			buzzleActivities:[],
			exisitingFilesToDelete:'',
			resourceFileInfo:{
				file:'',
				type:'',
				id:''
			},
			buzzleActivityInfo:this.initialBuzzleInfo,
            textFields:{				
				targetname:'',
				targetimagefile:'',
				resourcefile:'',
				xmlfile:'',
				databasefile:'',
			},
			errors :{
				emptyString : '',				
				targetname:'',
				buzzleactivity:'',
				language:'',				
			},
            resourceDialogToggle : false,
			targetDialogToggle : false,
			mappingDialogToggle: false,
			addTargetBoo:true,
			addResourceBoo:true,
			addActMappingBoo:true,
			mapActivityBoo:false,
			selectedType:'',
			ar_imagetargetid:'',
			ar_imageresourceid:'',
			ar_imageactivityid:'',
			action:'add',
			targetAction:'add',
			araction:'add',
			activitiesList:[],
			languageList:[],
			selectedActivity:'',
			selectedLanguage:'',
			classID: this.props.classid,
			searchText: ''
			
			
        };       
        
        this.onChangeText = this.onChangeText.bind(this);
		this.deleteAudioFile = this.deleteAudioFile.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onChangeSelectType = this.onChangeSelectType.bind(this);        
		this.onRowClickDelete = this.onRowClickDelete.bind(this);       
		
		this.onSubmitMapping = this.onSubmitMapping.bind(this);
		this.onSubmitTarget = this.onSubmitTarget.bind(this);
		this.onSubmitResource = this.onSubmitResource.bind(this)
		this.onDeleteTarget = this.onDeleteTarget.bind(this)
		this.onEditTarget = this.onEditTarget.bind(this)
		this.onEditResource = this.onEditResource.bind(this);
		this.onChangeActivity = this.onChangeActivity.bind(this)
		this.onChangeLanguage = this.onChangeLanguage.bind(this);
		this.onEditBuzzleMapping = this.onEditBuzzleMapping.bind(this);
		this.autoCompleteHandleUpdateInput = this.autoCompleteHandleUpdateInput.bind(this);
    }
	
	/** 
	* Get Initial Content State
	*/
	get initialContentState() {
		return {
			databasefile:'',
			xmlfile:'',
			target:{
				name:'',
				targetfile:'',
				resource:[],
				buzzle:[],
			},
			targets:{
				target:[]
			}
		}
	}
	
	get initialBuzzleInfo () {
		return {
			activity:'',
			language:'',
			id:''
		}
	}

	/**
	* Component Did Mount
	*/
	componentDidMount(){
		this.fetchARActivityInfo();
		this.fetchARInfo();		
	}
	
	
	/**
	* Component Will Receive props
	*/
	componentWillReceiveProps(props){		
		if(props.classid != this.state.classID) {
			this.setState({
				classID:props.classid,	
				className:props.classname				
			}, function (){
				targetSelectedIndex = 0;
				this.fetchARActivityInfo();
				this.fetchARInfo();
			})
			
		}		
	}	
	/**
    *Fetch Chapter Details
    */
    fetchARActivityInfo () {
        var data = new FormData();		
        data.append('json',JSON.stringify({id: this.state.classID}));
        fetch('http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/getClassActivities?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx',{
            method:'POST',
            body:data           
        })
        .then(response => response.json())
        .then(json=>{			
            if(json){
                 this.setState({
                    activitiesList:json['activities'],
					languageList:json['languages']
                 });
            } 		
			else {                
                 this.setState({
                    activitiesList:[],
					languageList:[],    
                 });
            }            
                         
        });        
    }
	/**
	* Fetch AR Info
	*/
	
	fetchARInfo() {
		const textFields = this.state.textFields; 
		textFields['databasefile'] = '';
		textFields['xmlfile'] = '';
		this.setState({
			loaded:true,
			addTargetBoo:true,
			araction:'add',
			textFields:textFields,
			resourceFiles:[],
			buzzleActivities:[],
			targetContent: this.initialContentState,
		})
		var data = new FormData();
		data.append('json',JSON.stringify({class_id: this.state.classID}));		
		fetch("http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/arInfo?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx",{
				method:'POST',
				body:data           
			})
			.then(response => response.json())
			.then(json=>{
				if(json) {
					const textFields = this.state.textFields; 
					textFields['databasefile'] = json['databasefile'];
					textFields['xmlfile'] = json['xmlfile'];
					
					this.setState({
						targetContent : json,
						textFields:textFields,
						ar_targetid:json['id'],
						araction:'update',
						addTargetBoo:false,
						loaded:false,	
					}, function (){						
					})
										
					const targetContent = this.state.targetContent;					
					let resourceFiles = [];
					let buzzleActivities = [];
					if(json['targets']['target'].length >0){						
						for (var key in json['targets']['target'][targetSelectedIndex]['resource']) {
							resourceFiles.push(json['targets']['target'][targetSelectedIndex]['resource'][key]);
						}
						for (var key in json['targets']['target'][targetSelectedIndex]['buzzle']) {
							buzzleActivities.push(json['targets']['target'][targetSelectedIndex]['buzzle'][key]);
						}
					}		
					
					this.setState({						
						resourceFiles:resourceFiles,
						buzzleActivities:buzzleActivities,
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
        const targetContent = this.state.targetContent;
        if(obj == "option"){
			optionFiles[type] = event.target.files[0]['name'];			
        }else{
			targetContent[type] = event.target.files[0]['name']; 
		}		
		for (var x = 0;x<event.target.files.length;x++){
			files.push(event.target.files[x]);
		}
        
        this.setState({
            files:files,
            targetContent:targetContent
        }, function(){
            
        })
    }
    
    /** 
    * On Delete File
    */
    deleteAudioFile(obj,type) {		
		const targetContent = this.state.targetContent;
		if(obj=='option'){
			//this.deleteFile(optionFiles[type]);			
			optionFiles[type] = '';		
		} else {
			//this.deleteFile(targetContent[type]);
			targetContent[type] = "";			
		}
				
		this.setState({            
			targetContent:targetContent
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
    * Open Dialog Handler
    */
    openDialog(dialog){
		return function (event){
			if(dialog == 'target'){
				const targetContent = this.state.targetContent;
				const textFields =  this.state.textFields;
				textFields['targetname']='',
				textFields['targetimagefile']= ''				
				targetContent['target'] = {
					name:'',
					targetfile:'',				
				};
				this.setState({
					targetDialogToggle: true,
					targetContent:targetContent,
					textFields:textFields,
					files:[],
					resourceFiles:[],
					buzzleActivities:[],
					targetAction:'add',
					addResourceBoo:true,
					addActMappingBoo:true,
				});
			} if(dialog == 'resource'){
				const textFields =  this.state.textFields;
				textFields['resourcefile'] =  ''
				this.setState({
					resourceDialogToggle: true,
					textFields:textFields,
					selectedType:'',
					action:'add',
					dialogTitle:'Add',
					files:[],					
				});
			} if(dialog == 'mapping'){				
				this.setState({
					mappingDialogToggle: true,
					selectedActivity:'',
					selectedLanguage:'',
					searchText:'',
					action:'add',
					dialogTitle:'Add',
					mapActivityBoo:false,
					files:[],					
				});
			}
		}.bind(this)
		
        
    }
    
    /**
    * Close Dialog Handler
    */
    closeDialog(dialog){
		return function (event){
			if(dialog == 'target'){
				this.setState({
					targetDialogToggle: false,
					targetAction:'add',
					resourceFiles:[],
					buzzleActivities:[]
				});
			} if(dialog == 'resource'){
				this.setState({
					resourceDialogToggle: false,
					action:'add',
				});
			}
			if(dialog == 'mapping'){
				this.setState({
					mappingDialogToggle: false,
					action:'add',
				});
			}
		}.bind(this)
    }
    
    
    
    /**
    * onChangeSelectType
    */
    onChangeSelectType(event,index,value){
		const targetContent = this.state.targetContent
		resource_type = event.target.innerHTML
		optionFiles['resource'] = '';
		const textFields =  this.state.textFields;
		textFields['resourcefile'] =  ''
        this.setState({
            selectedType:value,
			textFields:textFields,
			files:[]
        }, function(){
			
		})
    }
	
	/**
    * onChangeActivity
    */
    onChangeActivity(event,index,value){				
        this.setState({
            selectedActivity:value,			
        }, function(){
			
		})
    }
	
	autoCompleteHandleUpdateInput (searchText,datasource,params) {		
		for (var key in datasource) {
			if(datasource[key]['activity_searchcombination'] == searchText){
				this.setState({
				  selectedActivity: datasource[key]['activity_ref_id'],
				  searchText: datasource[key]['activity_searchcombination']
				}, function(){
					console.log(this.state.selectedActivity);
				});
			}
		}		
    };
	
	/**
    * onChangeLanguage
    */
    onChangeLanguage(event,index,value){		
        this.setState({
            selectedLanguage:value,			
        }, function(){
			
		})
    }
	
	
	
	/**
    * Table Row Click Delete
    */
    onRowClickDelete(index){
        return function(event){            
            var result = confirm("Want to delete?");
			if (result) {
				const targetContent = this.state.targetContent            
				targetContent['option'].splice(index, 1);
				this.setState({
					targetContent:targetContent
				})
			}
        }.bind(this)
                
    }
    
    /**
    *On Submit
    */
    onSubmit(event) {
		var validationstatus = this.onSubmitFieldValidation();		
		if(validationstatus){
			this.update_ajax('addARFiles');			
		} else{
			
		}
    }
	
	/**
    *On Submit Target
    */
    onSubmitTarget(event) {
		const textFields = this.state.textFields
		const errors = this.state.errors;
		const targetContent = this.state.targetContent
        var target_validation = true;
		if(textFields['targetname'] == ''){
			errors['targetname'] = 'Target Name Cannot be Empty!';
			target_validation = false;
			this.setState({
				errors:errors
			})
		} 
		if(optionFiles['image'] == ''){
			alert("Target image file is missing!");
			target_validation = false;
		}
				
		if(target_validation){			
			const target_values = {
				name: textFields['targetname'],
				targetfile:optionFiles['image']				
			}		
			
			targetContent.target['name'] = textFields['targetname']
			targetContent.target['targetfile'] = optionFiles['image']			
			this.setState({				
				targetContent:targetContent
			});			
			this.update_ajax('arTargetFiles');
		}
		
		
    }
	
	/**
    *On Submit Resource
    */
    onSubmitResource(event) {
		this.setState({
			resourceFileInfo:[]
		})
		const textFields = this.state.textFields
		const errors = this.state.errors;
		const targetContent = this.state.targetContent
		const resourceFiles = this.state.resourceFiles
        var target_validation = true;
		if(resource_type == ''){			
			target_validation = false;
			alert("Please select resource type");
		} 
		if(optionFiles['resource'] == ''){
			alert("Resource file is missing!");
			target_validation = false;
		}		
		if(target_validation){	
			const resource_values = {
				type: resource_type,
				resourcefile:optionFiles['resource']				
			}
			const resourceFileInfo = this.state.resourceFileInfo
			resourceFileInfo['type'] = resource_type;
			resourceFileInfo['file'] = optionFiles['resource']
					
			this.setState({				
				resourceDialogToggle: false,
				resourceFileInfo:resourceFileInfo
				
			}, function(){				
				this.update_ajax('arTargetResourceFiles');
			})
		}
    }
	
	/**
    *On Submit Activity Mapping for Target
    */
    onSubmitMapping(event) {
		this.setState({
			buzzleActivityInfo:this.initialBuzzleInfo
		})
		const textFields = this.state.textFields
		const errors = this.state.errors;
		const targetContent = this.state.targetContent
        var target_validation = true;
		
		if(this.state.selectedActivity == '' || this.state.selectedActivity == undefined ){
			errors['buzzleactivity'] = "Field Cannot be Empty!";
			alert("Activity mapping is missing!");
			target_validation = false;
		}
		if(this.state.selectedLanguage == '' || this.state.selectedLanguage == undefined ){
			alert("Language is missing!");
			errors['language'] = "Language Cannot be Empty!"
			target_validation = false;
		}		
		if(target_validation){			
			const buzzleActivityInfo = this.state.buzzleActivityInfo
			buzzleActivityInfo['activity'] = this.state.selectedActivity;
			buzzleActivityInfo['language'] = this.state.selectedLanguage;
			console.log("buzzle "+buzzleActivityInfo);
			this.setState({				
				mappingDialogToggle: false,
				buzzleActivityInfo:buzzleActivityInfo
				
			}, function(){				
				this.update_ajax('arTargetBuzzleMapping');
			})
		}
		
		
    }
	
	onDeleteTarget(id,type){
		return function(event){
			var result = confirm("Want to delete?");
			if (result) {
				event.preventDefault();
				var data = new FormData();
				if(id !="" ){			
					data.append('json',JSON.stringify({id : id,type:type}));
					this.fetchPost('http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/deleteTarget?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx',data,null);
					
				} else {
					alert("ID is missing. Unable to delete. Please contact admin")
				}
			}
		}.bind(this)
	}
	
	onEditTarget(index,id,name,file,resource,activities){
		return function(event){
			targetSelectedIndex = index;			
			const targetContent = this.state.targetContent;			
			targetContent['target'] = {
				name:name,
				targetfile:file,				
			};
			optionFiles['image'] = file
			const textFields = this.state.textFields;
			textFields['targetname'] =  name
			textFields['targetimagefile'] =  file
			let resourceFiles = this.state.resourceFiles;
			resourceFiles = [];
			let buzzleActivities = this.state.buzzleActivities;
			buzzleActivities = [];
			for (var key in resource) {
				resourceFiles.push(resource[key]);
			}
			
			for (var key in activities) {
				buzzleActivities.push(activities[key]);
			}
			
			this.setState({
				targetDialogToggle: true,
				addResourceBoo:false,
				addActMappingBoo:false,
				ar_imagetargetid:id,
				targetContent:targetContent,
				textFields:textFields,
				resourceFiles:resourceFiles,
				buzzleActivities:buzzleActivities,				
				targetAction:'update'
			})
			
		}.bind(this)
	}
	
	onEditResource(index,id,type,file){
		return function(event){			
			let selectedType = this.state.selectedType
			const textFields = this.state.textFields;			
			textFields['resourcefile'] =  file			
			optionFiles['resource'] = file
			if(type == '3D_BUNDLE'){
				selectedType = 1;
			} else if(type == 'VIDEO'){
				selectedType = 2;
			} else{
				selectedType = 3;
			}
			this.setState({
				resourceDialogToggle: true,
				selectedType:selectedType,
				exisitingFilesToDelete:file,
				textFields:textFields,
				files:[],
				dialogTitle:"Update",
				action:'update',
				ar_imageresourceid:id
			})
		}.bind(this)
	}
	
	onEditBuzzleMapping(index,id,activity,language){
		return function(event){
			const activitiesList = this.state.activitiesList
			for (var key in activitiesList) {
				if(activitiesList[key]['activity_ref_id'] == activity){
					this.setState({					  
					  searchText: activitiesList[key]['activity_searchcombination']
					}, function(){
						console.log(this.state.selectedActivity);
					});
				}
			}
			this.setState({
				mappingDialogToggle: true,
				selectedActivity:activity,
				selectedLanguage:language,				
				files:[],
				dialogTitle:"Update",
				mapActivityBoo:true,
				action:'update',
				ar_imageactivityid:id
			})
		}.bind(this)
	}
	
	
	/**
	* Update Ajax Call
	*/
	update_ajax(method){
		const formData = new FormData();
		const targetContent = this.state.targetContent;
		const files = this.state.files;		
		for (var key in files) {
			// check if this is a file:
			if (files.hasOwnProperty(key) && files[key] instanceof File) {
				formData.append(key, files[key]);				
			}
		}		
		formData.append('json',JSON.stringify({targetContent: targetContent,										   
										   action : this.state.action,
										   araction:this.state.araction,
										   targetAction : this.state.targetAction,
										   selected_activity:this.state.selectedActivity,
										   selected_language:this.state.selectedLanguage,
										   exisitingFilesToDelete:this.state.exisitingFilesToDelete,
										   resourceFileInfo:this.state.resourceFileInfo,
										   buzzleActivityInfo:this.state.buzzleActivityInfo,
										   ar_targetid:this.state.ar_targetid,
										   ar_imagetargetid:this.state.ar_imagetargetid,
										   ar_imageresourceid: this.state.ar_imageresourceid,
										   ar_imageactivityid: this.state.ar_imageactivityid,
										   class_name: this.state.className,
										   classid:this.state.classID										   
									  }));	    
	    
		this.fetchPost("http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/"+method+"?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx",formData,method);
		
	}
	
	/**
	* Fetch Post 
	*/
	fetchPost(url,data,callbackmethod) {
		this.setState({
			loaded:true
		})
		fetch(url,{
				method:'POST',
				body:data,				
			})
			.then(response => response.json())			
			.then(json=>{				
				if(json['content']['status'] == 'success'){					
					alert(json['content']['message']);
					if(callbackmethod == 'addARFiles') {
						this.setState({
							addTargetBoo:false,
							ar_targetid:json['content']['id'],
							files:[],
							loaded:false
						})
					}if(callbackmethod == 'arTargetFiles') {						
						this.setState({
							targetDialogToggle:false,
							ar_imagetargetid:json['content']['targetid'],
							files:[],
							loaded:false,							
						}, function(){
							this.fetchARInfo();
						})
					}if(callbackmethod == 'arTargetResourceFiles') {						
						this.setState({	
							files:[],
							loaded:false
						}, function(){
							this.fetchARInfo();
						})
					} if(callbackmethod == 'arTargetBuzzleMapping') {						
						this.setState({	
							files:[],
							loaded:false,
							selectedActivity:'',
							selectedLanguage:'',
						}, function(){
							this.fetchARInfo();
						})
					} if(callbackmethod == null) {						
						this.setState({	
							files:[],
							loaded:false,							
						}, function(){
							this.fetchARInfo();
						})
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
		const targetContent = this.state.targetContent;
		var validation = true;
		
		if(targetContent['databasefile']== ''){			
			alert("Database File Cannot be Empty!");
			validation = false;
		} 
		if(targetContent['xmlfile']== ''){			
			alert("Xml File Cannot be Empty!");
			validation = false;
		} 
		return validation;
	}
    
	
    /**
    *Render the components
    */
    render () {        
        return (
            <div> 
                <ARTargetForm 
                    onChangeText = {this.onChangeText}
                    styles={styles}
                    errors = {this.state.errors}
                    textFields = {this.state.textFields}
                    loaded = {this.state.loaded}
                    deleteAudioFile = {this.deleteAudioFile}
                    onFileChange = {this.onFileChange}
                    onSubmit = {this.onSubmit}
                    dialogToggle = {this.state.dialogToggle}
                    openDialog = {this.openDialog}
                    closeDialog = {this.closeDialog}                                        
                    selectedType = {this.state.selectedType}                    
                    onChangeSelectType = {this.onChangeSelectType}
                    targetContent ={this.state.targetContent}                    
					onRowClickDelete = {this.onRowClickDelete}
                    dialogTitle = {this.state.dialogTitle}
					resourceDialogToggle={this.state.resourceDialogToggle}
					targetDialogToggle = {this.state.targetDialogToggle}
					addTargetBoo = {this.state.addTargetBoo}
					addResourceBoo = {this.state.addResourceBoo}
					onSubmitTarget = {this.onSubmitTarget}
					onSubmitResource = {this.onSubmitResource}
					onDeleteTarget = {this.onDeleteTarget}
					resourceFiles = {this.state.resourceFiles}
					onEditTarget = {this.onEditTarget}
					onEditResource = {this.onEditResource}
					activitiesList = {this.state.activitiesList}
					languageList = {this.state.languageList}
					selectedActivity = {this.state.selectedActivity}
					selectedLanguage = {this.state.selectedLanguage}
					onChangeActivity = {this.onChangeActivity}
					onChangeLanguage = {this.onChangeLanguage}
					onSubmitMapping = {this.onSubmitMapping}
					mappingDialogToggle = {this.state.mappingDialogToggle}
					addActMappingBoo = {this.state.addActMappingBoo}
					onEditBuzzleMapping = {this.onEditBuzzleMapping}
					buzzleActivities = {this.state.buzzleActivities}
					autoCompleteHandleUpdateInput = {this.autoCompleteHandleUpdateInput}
					searchText = {this.state.searchText}
					className = {this.state.className}
					mapActivityBoo = {this.state.mapActivityBoo}
                />
            </div>
                
        );
        
    }    
}

export default ARTargetPage;
