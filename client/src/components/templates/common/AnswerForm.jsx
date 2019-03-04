import React ,{PropTypes} from 'react';
import TextField from 'material-ui/TextField'


class AnswerForm extends React.Component {
    constructor(props){
        super(props);        
        this.state = {
            answertext:this.props.answertext,
            errorText:this.props.errorText
        }
        
        //this.onChangeText = this.onChangeText.bind(this);
    }
    
    /**
    *Component Will Receive Props 
    */
    componentWillReceiveProps(props){        
        if(props.answertext!=this.state.answertext){
            this.setState({
                answertext:props.answertext
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
                floatingLabelText = "Answer Text"
                name = "answertext"
                style={{width:'80%'}}
                onChange={this.props.onChangeText}
                errorText = {this.state.errorText}
                value = {this.state.answertext}                   
            />
        )
    }
}

AnswerForm.propTypes = {
    onChangeText : PropTypes.func.isRequired
}
export default AnswerForm;
