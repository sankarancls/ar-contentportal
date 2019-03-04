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

class classListChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue : this.props.class_id,
            classList:[],
			disabled:true
        }
    
        this.handleChange = this.handleChange.bind(this);
        propTypes : {
            onRequestChange : PropTypes.func.isRequired
        }        
    }
    
    
    
    handleChange (event,index,value) {		
        this.setState ({selectedValue:value});        
        this.props.onRequestChange(event,index,value);
    }
    
     /**
    *Component Mount
    */
    componentDidMount() {
        this.fecthClasses();
    }
    
    /**
    *Fetch Class Details
    */
    fecthClasses () {
        fetch ("http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/classList?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx")
            .then(response => response.json())
            .then(json=>{                
                this.setState({
					classList:json,
					disabled:false
				})
            })
    }
    
    render () {
        return (
            
                <SelectField
				disabled = {this.state.disabled}
                floatingLabelText="Select Class"
                value = {this.state.selectedValue}
                onChange = {this.handleChange}
                style = {{textAlign:'left',marginLeft: 20}}
                >
                {this.state.classList.map((row,index)=> (
                    <MenuItem key = {index} value = {row.id}  primaryText={row.name}/>                
                ))}
               
                </SelectField>
            
       
        )        
    }   
    
}

export default classListChange;
