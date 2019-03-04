import React ,{PropTypes} from 'react';
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';



class ELOMapping extends React.Component {
    constructor(props){
        super(props);
console.log(props);		
        this.state = {
            eloList:[],         
            errors:this.props.errors,            
            selectedELO:this.props.selectedELO,                        
        }                
        this.onChangeSelectELO = this.onChangeSelectELO.bind(this);
        
    }
    
    /**
    * Component WIll Mount
    */
    componentWillMount() {
        this.fetchELOs();
    }
    
    /**
    *Component Will Receive Props 
    */
    componentWillReceiveProps(props){        
        const fields = this.state.fields
        const errors = this.state.errors        
        if(props.selectedELO!=this.state.selectedELO){
			this.setState({
				selectedELO:props.selectedELO,
			})
		}
        if(props.errors['eloselection']!=this.state.errors['eloselection']){
            errors['eloselection'] = props.errors['eloselection']
			this.setState({
				errors:errors,
			})
        }        
        
    }
    
    /**
    * onChangeSelectAnswer
    */
    onChangeSelectELO(event,index,value){
        this.setState({
            selectedELO : value
        })
        this.props.onChangeSelectELO(event,index,value);
    }
    
    /**
    * get Chapter ELOs
    */
    
    fetchELOs() {		
        var data = new FormData();
		data.append('json',JSON.stringify({chapterid: this.props.chapter_id}));
		fetch("http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/getELOs?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx",{
				method:'POST',
				body:data           
			})
			.then(response => response.json())
			.then(json=>{
				if(json){
					this.setState({
						eloList:json,
						loaded:true,
						nodata:'',
					});
				} 		
				else {                
					 this.setState({
						eloList:[],
						loaded:true,
						nodata:'No Data Available',
					 });
				}
				
			})
	}
    
    
    render() {
        return (
        
            <SelectField
                floatingLabelText = "ELO"
                onChange = {this.onChangeSelectELO}
                style={{width:'50%'}}
                value = {this.state.selectedELO}
                errorText = {this.state.errors['eloselection']}
                >
                {this.state.eloList.map((row,index) => (
                    <MenuItem key={index} value={row.id} primaryText = {row.name}/>                   
                ))}
                         
            </SelectField>              
            
        
        )
    }
}

ELOMapping.propTypes = {   
    onChangeSelectELO : PropTypes.func.isRequired,
    
}
export default ELOMapping;
