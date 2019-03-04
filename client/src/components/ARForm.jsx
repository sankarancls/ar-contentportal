import React ,{PropTypes} from 'react';
import {Link} from 'react-router';
import {Card,CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import ClassListMenu from './ClassListPage.jsx';
import CourseListMenu from './CourseListPage.jsx';
import ChapterListMenu from './ChapterListPage.jsx';
import {Edit,Delete} from 'material-ui-icons';
import Loader from './templates/common/Loader.jsx';
import {List, ListItem} from 'material-ui/List';
import AddTarget from './ARAddForm.jsx';

import {Table,
        TableBody,
        TableHeader,
        TableHeaderColumn,
        TableRow,
        TableRowColumn
        } from 'material-ui/Table';

const style = {
	list:{
		width:'fit-content',
		padding:0,
	},
	listitem:{		
		
	},
	deletetop:{
		top:50,
	},
	avatar:{
		position:'initial'
	},
    paper: {
        display: 'inline-block',        
        margin: '16px 32px 16px 0',
    },
    rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
    },
};

const ARMapping = ({        
        classID,
		selectChange,        
        loaded,
        nodata,
    }) => (    
    
    
    <Card className="container">
		<Loader loaded={loaded} />         
        <h4 className="card-heading">AR Content Mapping</h4>
        <div style = {{display: 'flex'}} >          
            <ClassListMenu onRequestChange={selectChange}  />
        </div>
        <p className="card-heading">{nodata}</p> 
    </Card>   

);
export default ARMapping;
