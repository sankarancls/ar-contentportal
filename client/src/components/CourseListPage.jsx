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

class courseListChange extends React.Component {
    constructor(props) {		
        super(props);		
        this.state = {
            selectedValue : this.props.course_id,
            courseList:[],
			classID:this.props.classid,
			disabled:true
        }
    
        this.handleChange = this.handleChange.bind(this);
        propTypes : {
            onRequestChange : PropTypes.func.isRequired
			classid:PropTypes.number.isRequired
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
        if(this.state.classID!=undefined && this.state.classID != '' ){			
			this.fecthCourses();
		}
    }
	
	componentWillReceiveProps(props) {		
		if(this.state.classID!=props['classid'] && props['classid']!="" && props['classid']!=undefined){
			this.setState({
				classID:props['classid'],
				courseList:[],
				disabled:true
			},function(){				
				this.fecthCourses();
			});
		}
		
	} 
    
    /**
    *Fetch Class Details
    */
    fecthCourses () {
        var data = new FormData(); 
		
        data.append('json',JSON.stringify({id: this.state.classID}));
        fetch('http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/enrolledCourses?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx',{
            method:'POST',
            body:data           
        })
        .then(response => response.json())
        .then(json=>{			
            if(json && json['enrolled'].length>0){
                 this.setState({
                    courseList:json['enrolled'],
					disabled:false
                 });
            } 		
			else {                
                 this.setState({
                    courseList:[],
                    loaded:true,
                    nodata:'No Data Available',
                 });
            }            
                         
        });        
    }
	
	getalert(){
		alert("Alert MEssage");
	}

	render () {
        return (
            
                <SelectField
				disabled = {this.state.disabled}
                floatingLabelText="Select Course"
                value = {this.state.selectedValue}
                onChange = {this.handleChange}
                style = {{textAlign:'left',marginLeft: 20}}
                >
                {this.state.courseList.map((row,index)=> (
                    <MenuItem key = {index} value = {row.id}  primaryText={row.name}/>                
                ))}
               
                </SelectField>
            
       
        )        
    }
    
}

export default courseListChange;
