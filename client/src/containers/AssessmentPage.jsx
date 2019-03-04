import React,{PropTypes} from 'react';
import * as Components from './templates/types';

let componentName = '';
class AssessmentPage extends React.Component {
    constructor(props) {
        super(props);		
        this.state = {
            quiz_type_ref_id : this.props.quiz_type_ref_id,
			chapter_activity_ref_id : this.props.chapter_activity_ref_id
        }
		//MCQ //
		if(this.props.quiz_type_ref_id == 5 || this.props.quiz_type_ref_id == 21 ){
			componentName = 'Mcq';
		}
		//Moving //
		if(this.props.quiz_type_ref_id == 17){
			componentName = 'Moving';
		}
		//Fillup //
		if(this.props.quiz_type_ref_id == 6){
			componentName = 'Fillup';
		}
		//True False //
		if(this.props.quiz_type_ref_id ==8){
			componentName = 'TrueFalse';
		}
		//True False //
		if(this.props.quiz_type_ref_id ==13){
			componentName = 'DTOTree';
		}
		//Guess //
		if(this.props.quiz_type_ref_id ==16){
			componentName = 'Guess';
		}
		//Bingo //
		if(this.props.quiz_type_ref_id == 9){
			componentName = 'Bingo';
		}
		//Alphabet //
		if(this.props.quiz_type_ref_id == 14){
			componentName = 'Alphabet';
		}
		//Curiosity //
		if(this.props.quiz_type_ref_id == 3){
			componentName = 'Curiosity';
		}
		//DTOFlim //
		if(this.props.quiz_type_ref_id == 11){
			componentName = 'DTOFlim';
		}
		//DTORobo //
		if(this.props.quiz_type_ref_id == 12){
			componentName = 'DTORobo';
		}
		//Forum //
		if(this.props.quiz_type_ref_id == 4){
			componentName = 'Forum';
		}
		//Memory //
		if(this.props.quiz_type_ref_id == 20){
			componentName = 'Memory';
		}
		//Snowman //
		if(this.props.quiz_type_ref_id == 2){
			componentName = 'Snowman';
		}
		//Drag and Drop //
		if(this.props.quiz_type_ref_id == 10){
			componentName = 'DragandDrop';
		}	
		//jig Saw //
		if(this.props.quiz_type_ref_id == 19){
			componentName = 'Jigsaw';
		}
		//Match //
		if(this.props.quiz_type_ref_id == 7){
			componentName = 'Match';
		}
		//Rearrange //
		if(this.props.quiz_type_ref_id == 18){
			componentName = 'Rearrange';
		}
		//Numbers //
		if(this.props.quiz_type_ref_id == 15){
			componentName = 'Numbers';
		}		
        
    };
    
   
    
     /**
    *Render the components
    */
    render() {		
        const QuizComponents = Components[componentName];
        return (
         <div>
           <QuizComponents 
			quiz_type_ref_id = {this.props.quiz_type_ref_id} 
			chapter_activity_ref_id={this.props.chapter_activity_ref_id} 
			shortcode = {this.props.activity_coderef}
			question_id = {this.props.question_id}
			chapter_id = {this.props.chapter_id}
			activity_info = {this.props.activity_info}
			/>
         </div>
        )
    }
}

export default AssessmentPage
