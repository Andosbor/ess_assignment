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
      },
      test: {
        name: '',
        num_of_questions: '',
        duration: ''
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

  getTests = _ => {
    fetch('http://localhost:4000/tests')
      .then(response => response.json())
      .then(response => this.setState({ tests: response.data }))
      .catch(err => console.error(err))
  }

  addCourse = _ => {
    const { course } = this.state;
    fetch(`http://localhost:4000/courses/add?name=${course.name}&description=${course.description}`)
    .then(this.getCourses)
    .catch(err => console.error(err))
  }

  addTest = _ => {
    const { test } = this.state;
    fetch(`http://localhost:4000/tests/add?name=${test.name}&num_of_questions=${test.num_of_questions}&duration=${test.duration}`)
    .then(this.getTests)
    .catch(err => console.error(err))
  }


  //delete had me stuck for a while
  deleteCourse = _ => {
    const { course } = this.state;
    fetch(`http://localhost:4000/courses/delete?name=${course.name}`)
    .then(this.getCourses)
    .catch(err => console.error(err))
  }

  updateCourse = _ => {
    const { course } = this.state;
    fetch(`http://localhost:4000/courses/update?name=${course.name}&description=${course.description}`)
    .then(this.getCourses)
    .catch(err => console.error(err))
  }

  renderCourse = ({course_id, name, description, test_name }) => <div className="courseBox"key={course_id}>{name}  |  {description} | tests: {test_name}</div>

  renderTest = ({})

  render(){
    const { courses, course, test } = this.state;
    return (
      <div className="App">
          <h2>{this.state.title}</h2>
          {courses.map(this.renderCourse)}
          <br/>
          <div>
            <input placeholder="Course Name (required)" value={course.name}
             onChange={e => this.setState({ course: { ...course, name: e.target.value}})} />
             <br/>
             <button onClick={this.addCourse}> Add Course </button>
             <button onClick={this.deleteCourse}> Delete Course </button>
          </div>
          <br/>
          <div>
            <input placeholder="Course Description" value={course.description} 
             onChange={e => this.setState({ course: { ...course, description: e.target.value}})}/>
             <br/>
            <button onClick={this.updateCourse}> Update Course Description</button>
          </div>

          <br/>
          <div>
            <input placeholder="Test Name" value={test.name} 
             onChange={e => this.setState({ test: { ...test, name: e.target.value}})}/>
             <input placeholder="Number of Questions" value={test.num_of_questions} 
             onChange={e => this.setState({ test: { ...test, num_of_questions: e.target.value}})}/>
             <input placeholder="Duration" value={test.duration} 
             onChange={e => this.setState({ test: { ...test, duration: e.target.value}})}/>
             <br/>
            <button onClick={this.addTest}> Add Test</button>
          </div>
        
      </div>
    );
  }
}

export default App;
