import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { conut: 0 };
  }

  componentDidMount() {
    //This one will be called only one during the initial render.
    //Ideal place to call api
    console.log("componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
    //This on will be called everytime the state or props changes.
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    //This will be called the DOM leave page/component.
    //Typically used for cleaning.
    console.log("componentWillUnmount");
  }
  render() {
    return (
      <div className="profile">
        <h1>
          This is inside Class Based Profile Component...! {this.props.name}
        </h1>
        <h2>Clicked : {this.state.conut}</h2>
        <button
          onClick={() => {
            this.setState({ conut: this.state.conut + 1 });
          }}
        >
          Click
        </button>
      </div>
    );
  }
}

export default Profile;
