import React from "react";
import NOTFOUND from "../../Assets/Not_found.png";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ffffff",
        zIndex: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <img
        src={NOTFOUND}
        alt="Not Found"
        style={{ width: "200px", height: "200px", marginBottom: "20px" }}
      />
      <div
        style={{
          textAlign: "center",
          fontSize: "24px",
          color: "#000000",
          zIndex: 1,
        }}>
        Page Not Found
      </div>
      <Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          style={{ marginTop: "20px" }}>
          Back
        </Button>
      </Typography>
    </div>
  );
};

export default NotFound;
