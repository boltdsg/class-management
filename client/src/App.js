import React from "react";
import { Provider, useSelector } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/* Css */
import "./styles.css";

/* Redux store */
import store from "./store/store";
import { getClasses, getCourses } from "./store/actions/classActions";
import { getStudents } from "./store/actions/studentActions";

/* Components */
import AppNavbar from "./components/AppNavbar";
import AdminClass from "./components/AdminClass";
import AdminStudent from "./components/AdminStudent";
import AdminCourse from "./components/AdminCourse";
import Students from "./components/Students";
import Classes from "./components/Classes";
import ViewStudent from "./components/ViewStudent";
import UpdateStudent from "./components/student/UpdateStudent";
import ViewClass from "./components/ViewClass";
import UpdateClass from "./components/student/UpdateClass";
import Courses from "./components/Courses";
import ViewCourse from "./components/ViewCourse";
import UpdateCourse from "./components/student/UpdateCourse";

/* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

store.dispatch(getStudents());
store.dispatch(getClasses());
store.dispatch(getCourses());

const HomeComponet = () => {
  const { courses } = useSelector((state) => state.cou);
  console.log(courses);

  return (
    <div className="container">
      <AppNavbar />
      <div className="home__wrapper">
        <div className="home__left">
          <img src={avatar} />

          <h1>App Actions</h1>
          <ul>
            <li>Create & Manage Courses</li>
            <li>Create & Manage Classes</li>
            <li>Create & Manage Students</li>
          </ul>
        </div>

        <div className="home__actions">
          <>
            <div className="home__action">
              <Link to="/create-class">
                <button>Create a class</button>
              </Link>
            </div>
            <div className="home__action">
              <Link to="/create-student">
                <button>Add a student</button>
              </Link>
            </div>
            <div className="home__action">
              <Link to="/create-course">
                <button>Create a course</button>
              </Link>
            </div>
            <div className="home__manager">
              <Link to="/students">Manage Students</Link>
              <Link to="/classes">Manage Classes</Link>
              <Link to="/courses">Manage Courses</Link>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/create-class" exact component={AdminClass} />
          <Route path="/create-student" exact component={AdminStudent} />
          <Route path="/create-course" exact component={AdminCourse} />
          <Route path="/students" exact component={Students} />
          <Route path="/classes" exact component={Classes} />
          <Route path="/class/update/:slug" exact component={UpdateClass} />
          <Route path="/about-class/:slug" exact component={ViewClass} />
          <Route path="/about-course/:slug" exact component={ViewCourse} />
          <Route path="/student/update/:slug" exact component={UpdateStudent} />
          <Route path="/student/:slug" exact component={ViewStudent} />
          <Route path="/courses" component={Courses} exact />
          <Route path="/course/update/:slug" exact component={UpdateCourse} />
          <Route component={HomeComponet} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;