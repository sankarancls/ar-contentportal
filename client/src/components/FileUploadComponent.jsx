import React,{PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Edit,Delete} from 'material-ui-icons';

let filename = 'nofile';
let firstlaod = true;

const buttonStyle = {
       minWidth: '56px',
       width: '56px',
       minHeight: '56px',
       height: '56px',
       borderRadius: '28px',
     };
	 
class FileUpload extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
		filename = 'nofile';
        firstlaod = true;
		this.state = {
			showFileInput : false,
			showFileDelete : true,
			filename:this.props.filename,
			audioType:false,
			imageType:false,
			videoType:false,
			preview:true
		}
		
		this.deleteAudio = this.deleteAudio.bind(this);
		this.changeContentFile = this.changeContentFile.bind(this);
		
	}
	
	/**
	*Call Back Delete Evenet
	*/
	deleteAudio(type){
		return function(event){
			var result = confirm("Are you sure, you want to delete?");
			if (result) {				
				this.setState({
					filename: '',
					showFileInput : true,
					showFileDelete : false,
					imageType:false,
					audioType:false,
					preview:false
					
				})
				this.props.deleteAudioFile(type);
			}
		}.bind(this)
		
	}
	
	/**
	* OnFileChange
	*/
	changeContentFile (type){
		return function(event){
			this.setState({
				preview:false
			})
			this.props.onFileChange(event,type);
		}.bind(this)
	}
	
	/** 
	* componentWillMount
	*/
	componentDidMount(){		
		if(this.props.filename == ''){
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
		if(props.filename == ""){
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
	
	imageExists(image_url){
		var http = new XMLHttpRequest();
		http.open('HEAD', image_url, false);
		http.send();
		return http.status != 404;
	}
	
	/**
	* Check File Extension
	*/
	checkFileExtension(){
		filename = this.state.filename;		
		if(firstlaod){			
			if(filename && this.state.preview) {							
				var extn = filename.substr(filename.lastIndexOf('.') + 1);
				extn = extn.toLowerCase();
				if(extn == "mp3"){
					this.setState({
						audioType:true,
						imageType:false
					})
				} else if(extn == "png" || extn== 'jpeg' || extn== 'jpg'){
					this.setState({
						imageType:true,
						audioType:false
					})
				}
				firstlaod = false;
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
			<div>				
				{this.state.showFileDelete ?
					<div>
						<div style = {{display: 'flex'}} >
							<p>{this.props.label+" : "}</p>
							<p> {this.state.filename}</p>
							<Delete className="material-icons" style = {{cursor:'pointer', marginTop:15}} onClick = {this.deleteAudio(this.props.type)}/>
						</div>
						<div>
							{this.state.imageType ?
								<img width='100' height='100' style={{borderRadius:'50%'}} src={'../resources/'+this.props.shortcode+'/'+this.state.filename} alt="No Preview" />
							: null
							}
							{this.state.audioType ?
								<audio controls>                
									<source src={'../resources/'+this.props.shortcode+'/'+this.state.filename}  alt="No Preview" />
									Your browser does not support the audio element.
								</audio>
							: null
							}
						</div>
						
					</div>
				: null 
				}
				{this.state.showFileInput ?
					<div style = {{display: 'flex'}} >
						<p style={{color:'#000'}}>{this.props.label} : </p>
						<FlatButton 
							style = {{marginTop:7,color:'rgb(0, 188, 212)',textDecoration:'underline', textTransform:'none'}}
							containerElement='label'															
							>
							 <input type="file" multiple onChange={this.changeContentFile(this.props.type)} accept={this.props.filetype}></input>			
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