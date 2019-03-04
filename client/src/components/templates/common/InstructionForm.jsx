import React ,{PropTypes} from 'react';
import TextField from 'material-ui/TextField'


class InstructionPage extends React.Component {
    constructor(props){
        super(props);        
        this.state = {
            instruction:this.props.instruction,
            errorText:this.props.errorText
        }
        
        //this.onChangeText = this.onChangeText.bind(this);
    }
    
    /**
    *Component Will Receive Props 
    */
    componentWillReceiveProps(props){        
        if(props.instruction!=this.state.instruction){
            this.setState({
                instruction:props.instruction
            })
        }
        if(props.errorText!=this.state.errorText){
            this.setState({
                errorText:props.errorText
            })
        }
    }
    
   
    
    
    render() {
        return (       
            <TextField                      
                floatingLabelText = "Instruction Text"
                name = "instruction"
                style={{width:'80%'}}
                onChange={this.props.onChangeText}
                errorText = {this.state.errorText}
                value = {this.state.instruction}                   
            />
        )
    }
}

InstructionPage.propTypes = {
    onChangeText : PropTypes.func.isRequired
}
export default InstructionPage;
