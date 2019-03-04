import React ,{PropTypes} from 'react';
import TextField from 'material-ui/TextField'


class QuestionText extends React.Component {
    constructor(props){
        super(props);          
        this.state = {
            questionText:this.props.questiontext,
            errorText:this.props.errorText
        }
    }
    
    /**
    *Component Will Receive Props 
    */
    componentWillReceiveProps(props){         
        if(props.questiontext!=this.state.questionText){
            this.setState({
                questionText:props.questiontext
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
                floatingLabelText = "Question Text"
                name = "questiontext"
                style={{width:'80%'}}
                onChange={this.props.onChangeText}
                errorText = {this.state.errorText}
                value = {this.state.questionText}                   
            />
        )
    }
}

QuestionText.propTypes = {
    onChangeText : PropTypes.func.isRequired
}
export default QuestionText;
