import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import Dropzone from "./Dropzone";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import MoneyIcon from "@material-ui/icons/Money";

const FileUpload = () => {
  const auth = useContext(AuthContext);
  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // eslint-disable-next-line
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();

  const handleFile1Change = event => {
    console.log(event.target.files[0]);
    setFile1(event.target.files[0]);
  };

  const handleFile2Change = event => {
    console.log(event.target.files[0]);
    setFile2(event.target.files[0]);
  };

  const [FileError, setFileError] = useState();
  const [fileSuccess, setFileSuccess] = useState(false);

  const uploadDocumentsHandler = async () => {
    console.log(file1, file2);
    if (file1 && file2) {
      try {
        const formData = new FormData();
        formData.append("file", file1);
        formData.append("file", file2);
        formData.append("userName", auth.userName);
        const responseData = await sendRequest(
          "http://localhost:5000/api/crab/create",
          "POST",
          formData,
        );
        console.log(responseData);
        setFileError("");
        setFileSuccess(true)
      } catch (err) {
        setFileError("Uploading the documents failed. Please try again later.");
      }
    } else {
      setFileError("Please Select Appropriate documents for uploading.");
    }
  };
  return (
    <Paper
      style={{ backgroundColor: "white", marginTop: "50px", padding: "30px" }}
    >
      {fileSuccess && (
        <div style={{
          padding: "50px",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
          }}>
            <h3>Your documents are successfully uploaded.</h3>
          </div>
      )}
      {!fileSuccess && (
        <div>
            {FileError && (
        <Alert
          onClose={() => {
            setFileError();
          }}
          severity="error"
        >
          {FileError}
        </Alert>
      )}
      {/* <iframe title="aadhar-card" width="100%" height="600" frameborder="0" src={file}></iframe> */}
      <Grid
        container
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
        spacing={2}
      >
        <Grid item xs={1}>
          <RecentActorsIcon fontSize="large" />
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h5">Submit Aadhar Card</Typography>
        </Grid>
        <Grid item xs={6}>
          <Dropzone handleChange={handleFile1Change} />
        </Grid>
      </Grid>
      <hr></hr>
      <Grid
        container
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
        spacing={2}
      >
        <Grid item xs={1}>
          <MoneyIcon fontSize="large" />
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h5">Submit Income Certificate</Typography>
        </Grid>
        <Grid item xs={6}>
          <Dropzone handleChange={handleFile2Change} />
        </Grid>
      </Grid>
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ width: "100%" }}
          startIcon={<CloudUploadIcon />}
          onClick={uploadDocumentsHandler}
        >
          Upload
        </Button>
      </div>
        </div>
      )}
    </Paper>
  );
};

export default FileUpload;
