import React, { Component } from "react";
import "./css/ModalForm.css";

export default class ModalConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amt: "",
    };

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.handleClose();
    }
  }

  render() {
    const showHideClassName = this.props.show
      ? "modal display-block"
      : "modal display-none";
    return (
      <div className={showHideClassName}>
        <div className="card edited-card py-4" ref={this.wrapperRef}>
          <div className="card-title row justify-content-center">
            <h2 className="col-12 px-5">
              <b>{this.props.message}</b>
            </h2>
          </div>
          <div className="card-body">
            <div className="row gx-0 justify-content-md-center">
              <div className="text-center mt-2">
                <button
                  className="btn createAccountBtn btn-lg btn-ex-lg"
                  style={{
                    paddingLeft: "2.5rem",
                    paddingRight: "2.5rem",
                  }}
                  onClick={(e) => {
                    this.props.handleClose();
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
