import React from "react";
import "./index.css";

export class LoaderComponent extends React.Component {
  render() {
    return (
      <div id="loader_wrapper">
        <div className="hand">
          <div className="thumb"></div>
          <div className="finger"></div>
          <div className="finger"></div>
          <div className="finger"></div>
          <div className="finger"></div>
        </div>
      </div>
    );
  }
}
