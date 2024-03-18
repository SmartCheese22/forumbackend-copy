import React from "react";

const Jumotron = () => {
  const jumbotronStyle = {
    backgroundColor: "rgb(160, 199, 199)",
    color: "white",
    padding: "50px",
    borderRadius: "10px",
  };

  const headingStyle = {
    fontSize: "48px",
    fontWeight: "bold",
  };

  const paragraphStyle = {
    fontSize: "24px",
    fontStyle: "italic",
  };

  return (
    <div className="jumbotron" style={jumbotronStyle}>
      <h1 className="display-3" style={headingStyle}>
        Forum
      </h1>
      <p style={paragraphStyle}>
        Join the Discussion, Share Your Insights, and Connect with the Community!
      </p>
    </div>
  );
};

export default Jumotron;
