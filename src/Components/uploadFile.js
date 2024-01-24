import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Button,
  Icon
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';

const FileUpload = ({ projectId }) => {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [fileImages, setFileImages] = useState([]); 
  const authToken = localStorage.getItem('authToken');
  const config = {
    headers: {
      Authorization: authToken,
    },
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/comments/${projectId}/uploadFile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': authToken
        },
      });

      setFileList(response);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const fetchFileList = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/comments/${projectId}/files`, config);

      return response.data?.files;
    } catch (error) {
      console.error('Error fetching file list:', error);
    }
  };

  const fetchImage = async (filename) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/comments/getFile/${filename}`, {
        responseType: 'arraybuffer',
      });

      const data = new Uint8Array(response.data);
      const blob = new Blob([data], { type: response.headers['content-type'] });
      const fileUrl = URL.createObjectURL(blob);

      return fileUrl
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageList = await fetchFileList();
        const fileUrls = [];
        console.log("Image list:", imageList);
  
        for (const image of imageList) {
          const fileLink = await fetchImage(image.fileName);
          fileUrls.push(fileLink)
        }

        setFileImages(fileUrls)
      } catch (error) {
        console.error("Error fetching or processing image list:", error);
      }
    };

    fetchData();
  }, [fileList]);

  const isImageFile = (contentType) => {
    return contentType && contentType.startsWith('image');
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Upload Files:
      </Typography>
      <div className="card-container">
        <div className="card-columns">
          <div className="card">
            <div className="position-relative">
              <div className="card-body">
                <ul>
                  {fileImages.map((fileImage, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                      {fileImage.isImage ? (
                        <img
                          src={fileImage.fileLink}
                          alt={`Uploaded File ${index}`}
                          style={{ maxWidth: '200px', margin: '1em' }}
                        />
                      ) : (
                        <Icon component={ArticleIcon} style={{ fontSize: '50px', margin: '1em' }} />
                      )}
                      <Button
                        variant="contained"
                        href={fileImage.fileLink}
                        download={fileImage.fileName}
                        style={{ marginLeft: '1em' }}
                      >
                        Download
                      </Button>
                    </li>
                  ))}
                </ul>
                <input type="file" onChange={handleFileChange} />
                <Button variant="contained" onClick={handleFileUpload} style={{ marginLeft: '1em' }}>
                  Upload File
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
