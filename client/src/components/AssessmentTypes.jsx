
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Edit, Delete } from 'material-ui-icons';


import {Table,
        TableBody,
        TableHeader,
        TableHeaderColumn,
        TableRow,
        TableRowColumn
        } from 'material-ui/Table';
let styles = {
  height: '300px',
  center_align:"center",
  left_align:"left",
  margin_right:'80%'
};
        
class AssessmentType extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            assessmentList: [],
            selectedValue: '',
			nodata:'',
            questions:this.props.questions
        }
        
        this.onChange = this.onChange.bind(this);
		this.onQuestionRowClickDelete = this.onQuestionRowClickDelete.bind(this);
    }
    
    /**
    * ComponentDidMount
    */
    componentWillMount () {		
        this.fecthAssessmentType();
    }
    
   /**
   * Select on Change
   */
   onChange(event,index,value){
       this.setState({
           selectedValue:value
       })
       this.props.onRequestChange(event,index,value)
   }
   
   /**
   * COmponent Receive Props
   */
   componentWillReceiveProps(props){
	   if(props.questions == ''){
		   this.setState({
			   nodata:'No Quiz Available!'
		   })
	   }
       if(props.questions !=this.state.questions){
           this.setState({
               questions : props.questions,
			   nodata:''
           })
       }
   }
   
   /**
	* on Question Row Click Delete
	*/
	onQuestionRowClickDelete(question_id,index){
		return function (event) {
			var data = new FormData();			
			data.append('json',JSON.stringify({question_id : question_id}));
			fetch ("http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/deleteQuestion?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx",{
				method:'POST',
				body:data           
			})			
            .then(response => response.json())
            .then(json=>{                
                if(json['status'] == 'success'){
					const questions = this.state.questions;
					questions.splice(index, 1);
					this.setState({
						questions:questions
					});					
					alert(json['message']);
				}
            })
		}.bind(this)
	}
    
    
    /**
    *Fetch Class Details
    */
    fecthAssessmentType () {		
		var data = new FormData();
		data.append('json',JSON.stringify({id : this.props.activity_type_ref_id}));
		console.log("activity_type_ref_id "+this.props.activity_type_ref_id);
        fetch ("http://buzzle.chrysalis.world/buzzleConceptCards-api/index.php/client/assessmentTypes?key=htn6ASfBr4X7GF29uCciOPeDaysWjJMx",{
			method:'POST',
			body:data           
		})		
            .then(response => response.json())
            .then(json=>{                
                this.setState({assessmentList:json})
            })
    }
    
    render () {		
		let quiz = false;
		let multiple_quiz = true;
		if(this.state.assessmentList.length != 0 && this.state.assessmentList.length != undefined){
			quiz = true;
		}
		if(this.state.assessmentList.length == 1){
			//multiple_quiz = false;
		}		
        return (
			
			<div>
				{quiz ?
					<div>						
						{multiple_quiz ?
							<div>
								<p className="">Assessment Questions : </p>
								<SelectField
									floatingLabelText="Select Quiz type"
									onChange = {this.onChange}
									value={this.state.selectedValue}
									style = {{textAlign:'left'}}
								>
								{this.state.assessmentList.map((row,index)=>(
									<MenuItem key={index} value={row.id} primaryText={row.name}/>
								))}
								</SelectField>
								<RaisedButton
									label="Add"
									primary={true}
									onClick = {this.props.addNewAssessmentOnClick}            
									style={{textAlign:'left', height:30,verticalAlign:'bottom',marginLeft:20}}
								/>
								
							</div>
						:null }
						
						{!multiple_quiz ?
							<div>	
								<RaisedButton
									label="Add Question"
									primary={true}
									onClick = {this.props.addNewAssessmentOnClick}            
									style={{textAlign:'left', height:30,verticalAlign:'bottom',marginLeft:20}}
								/>
								
							</div>
						:null }
						
						<br/>
						<Table>
							<TableHeader displaySelectAll={false}
								adjustForCheckbox={false}
								enableSelectAll={false}>
								<TableRow>
									<TableHeaderColumn className="table-th" style={{textAlign:styles.left_align}}>Question Order</TableHeaderColumn>
									<TableHeaderColumn className="table-th" style={{textAlign:styles.left_align}}>Quiz Type</TableHeaderColumn>
									<TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Edit</TableHeaderColumn>
									<TableHeaderColumn className="table-th" style={{textAlign:styles.center_align}}>Delete</TableHeaderColumn>
								</TableRow>
							</TableHeader>
					   
							<TableBody displayRowCheckbox = {false}>
								{this.state.questions.map((row,index)=>(                   
									<TableRow key={index} >
										<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{index+1}</TableRowColumn>
										<TableRowColumn className="table-td" style={{textAlign:styles.left_align}}>{row.quiz_type}</TableRowColumn>
									   
										<TableRowColumn style={{textAlign:styles.center_align}}>
											<Edit style = {{cursor:'pointer'}} id={row.question_id} onClick={this.props.onQuestionRowClickEdit(row.question_id,row.quiz_type_ref_id)} />
										</TableRowColumn>
										<TableRowColumn style={{textAlign:styles.center_align}}>
											<Delete style = {{cursor:'pointer'}} id={row.question_id} onClick={this.onQuestionRowClickDelete(row.question_id,index)}/>
										</TableRowColumn>
									</TableRow>
								))}
							</TableBody>                
						</Table>
						<p className="card-heading">{this.state.nodata}</p>
					</div>
				: null}
			</div>
			
          
        );
    }
}

AssessmentType.propTypes = {
    onRequestChange:PropTypes.func.isRequired,
    addNewAssessmentOnClick: PropTypes.func.isRequired
}
export default AssessmentType;