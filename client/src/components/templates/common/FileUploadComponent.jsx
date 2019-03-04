import React,{PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';

import {Edit,Delete} from 'material-ui-icons';
let filename = 'nofile';
let urlpath = '';

class FileUpload extends React.Component {
	constructor(props) {
		super(props);		
		filename = 'nofile';        	
		this.state = {
			showFileInput : false,
			showFileDelete : true,
			filename:this.props.filename,			
			audioType:false,
			imageType:false,
			videoType:false,
			preview:true,
			firstlaod : true
		}
		
		this.deleteAudio = this.deleteAudio.bind(this);
		this.changeContentFile = this.changeContentFile.bind(this);
		
		
		
	}
	
	/**
	*Call Back Delete Evenet
	*/
	deleteAudio(obj,type){
		return function(event){
			var result = confirm("Are you sure, you want to delete?");
			if (result) {				
				this.setState({
					filename: '',
					showFileInput : true,
					url:'',
					showFileDelete : false,
					imageType:false,
					audioType:false,
					preview:false
				})
				this.props.deleteAudioFile(obj,type);
			}
		}.bind(this)
		
	}
	
	/**
	* OnFileChange
	*/
	changeContentFile (obj,type){
		return function(event){
			this.props.onFileChange(event,obj,type);
		}.bind(this)
	}
	
	/** 
	* componentWillMount
	*/
	componentDidMount(){
		
		if(this.props.filename == '' || this.props.filename == undefined){
			this.setState({
				filename: '',
				showFileInput : true,
				showFileDelete : false
			})
		} else {			
			this.checkFileExtension();
		}
	}
	
	
	/**
	* Will Receive Props
	*/
	componentWillReceiveProps(props){		
		if(props.filename == "" || props.filename == undefined){
			return this.setState({
				filename: '',
				showFileInput : true,
				showFileDelete : false
			})
		} 
		if(props.filename != this.props.filename){
			this.setState({
				filename: props.filename,
				showFileInput : false,
				showFileDelete : true
			}, function () {								
				this.checkFileExtension();
			})
		}
		
	}
	
	/**
	* Check File Extension
	*/
	checkFileExtension(){
		filename = this.state.filename;		
		if(this.state.firstlaod){			
			if(filename && this.state.preview) {
					//console.log("URL "+this.props.url);
					if(this.props.url == undefined || this.props.url == ""){						
						urlpath = '../resources/'+this.props.shortcode+'/'+this.state.filename						
					} else {
						urlpath = this.props.url +"/"+this.state.filename
					}					
				var extn = filename.substr(filename.lastIndexOf('.') + 1);
				extn = extn.toLowerCase();				
				if(extn == "mp3"){
					this.setState({
						audioType:true,
						url:urlpath,
						imageType:false
					})
				} else if(extn == "png" || extn== 'jpeg' || extn== 'jpg'){
					this.setState({
						imageType:true,
						url:urlpath,
						audioType:false
					})
				}
				this.setState({
					firstlaod:false
				})
			}
		}else{
			this.setState({
				imageType:false,
				audioType:false
			})
		}
	}
	
	
	/** 
	* Render
	*/
	render (){		
		return (
			<div >				
				{this.state.showFileDelete ?
					<div>
						<div style = {{display: 'flex', color:'#000000'}}>
							<p>{this.props.label+" : "+this.state.filename}</p>							
							<Delete style = {{cursor:'pointer', marginTop:10}} onClick = {this.deleteAudio(this.props.obj,this.props.objtype)}/>
						</div>
						<div>
							{this.state.imageType ?
								<img width='100' height='100' style={{borderRadius:'50%'}} src={this.state.url} alt=''/>
							: null
							}
							{this.state.audioType ?
								<audio controls>                
									<source src={this.state.url} />
									Your browser does not support the audio element.
								</audio>
							: null
							}
						</div>						
					</div>
				: null 
				}
				{this.state.showFileInput ?
					<div style = {{display: 'flex',color:'#000000'}} >
						<p>{this.props.label +" :"}</p>
						<FlatButton style = {{marginTop:7,textDecoration:'underline', textTransform:'none'}}
							containerElement='label'															
							>						
							<input type="file" id='file' onChange={this.changeContentFile(this.props.obj,this.props.objtype)} accept={this.props.filetype}>
							</input>			
						</FlatButton>
					</div>
				: null}					
			</div>
		)
	}
}

FileUpload.propTypes = {
	onFileChange : PropTypes.func.isRequired,
	deleteAudioFile : PropTypes.func.isRequired
}

export default FileUpload;
