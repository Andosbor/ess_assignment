import React, { Component  } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'ESS Activity',
      courses: [],
      course: {
        name: '',
        domain: '',
        description: ''
      }
    }
  }

  componentDidMount(){
    this.getCourses();
  }

  getCourses = _ => {
    fetch('http://localhost:4000/courses')
      .then(response => response.json())
      .then(response => this.setState({ courses: response.data }))
      .catch(err => console.error(err))
  }

  addCourse = _ => {
    const { course } = this.state;
    fetch(`http://localhost:4000/courses/add?name=${course.name}&description=${course.description}`)
    .then(this.getCourses)
    .catch(err => console.error(err))
  }

  renderCourse = ({course_id, name, description }) => <div key={course_id}>{name}  |  {description}</div>

  render(){
    const { courses, course } = this.state;
    return (
      <div className="App">
          <h2>{this.state.title}</h2>
          {courses.map(this.renderCourse)}
          <div>
            <input placeholder="course name" value={course.name}
             onChange={e => this.setState({ course: { ...course, name: e.target.value}})} />
            <input placeholder="course description" value={course.description} 
             onChange={e => this.setState({ course: { ...course, description: e.target.value}})}/>
             <button onClick={this.addCourse}> Add Course </button>
          </div>
      </div>
    );
  }
}

export default App;
