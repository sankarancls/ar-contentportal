import React, {PropTypes} from 'react';
import {Card,CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const data = [{
    name: 'John Smith',
    status: 'Employed',
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  }
];

class chapterListChange extends React.Component {
    constructor(props) {		
        super(props);
        this.state = {
            selectedValue : this.props.chapter_id,
            chapterList:[],
			courseID:this.props.courseid,
			classID:this.props.classid,
			disabled:true			
        }
    
        this.handleChange = this.handleChange.bind(this);
        propTypes : {
            onRequestChange : PropTypes.func.isRequired
			courseid:PropTypes.number.isRequired
        }        
    }
    
    
    
    handleChange (event,index,value) {        
        this.setState ({selectedValue:value});        
        this.props.onRequestChange(event,index,value);
    }
    
     /**
    *Component Did Mount
    */
    componentDidMount() {		
		if(this.state.courseID!=undefined && this.state.courseID!=''){
			this.fecthChapters();
		}
    }
	
	componentWillReceiveProps(props) {
		
		if(this.state.classID!=props['classid'] && props['classid']!="" && props['classid']!=undefined){
			console.log("class id "+this.state.classID)
			console.log(props);
			this.setState({				
				chapterList:[],
				classID:props['classid'],
				disabled:true 			
			})
		}
		if(this.state.courseID!=props['courseid'] && props['courseid']!="" && props['courseid']!=undefined){
			this.setState({
				courseID:props['courseid'],
				classID:props['classid'],
				chapterList:[],
				disabled:true    
				
			},function(){				
				this.fecthChapters();
			});
		}
		
	} 
    
    /**
    *Fetch Chapter Details
    */
    fecthChapters () {
        var data = new FormData();
        
        data.append('json',JSON.stringify({id: this.state.courseID}));
        fetch('http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/getChapters?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx',{
            method:'POST',
            body:data           
        })
        .then(response => response.json())
        .then(json=>{			
            if(json){
                 this.setState({
                    chapterList:json,
					disabled:false                    
                 });
            } 		
			else {                
                 this.setState({
                    chapterList:[],
                    loaded:true,
                    nodata:'No Data Available',
                 });
            }            
                         
        });        
    }
	
	
	render () {
        return (
            
                <SelectField
				disabled = {this.state.disabled}
                floatingLabelText="Select Chapter"
                value = {this.state.selectedValue}
                onChange = {this.handleChange}
                style = {{textAlign:'left',marginLeft: 20}}
                >
                {this.state.chapterList.map((row,index)=> (
                    <MenuItem key = {index} value = {row.id} primaryText={row.name}/>                
                ))}
               
                </SelectField>
            
       
        )        
    }
    
}

export default chapterListChange;
