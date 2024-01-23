import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Classcard.css';
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const CommentCreate = ({ projectId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: authToken,
          },
        };

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/comments/${projectId}`, config);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [projectId]);

  const handleCommentSubmit = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: authToken,
        },
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/comments/${projectId}`,
        { body: commentText, projectId: projectId },
        config
      );

      setComments([...comments, response.data.comment]);
      setCommentText('');

    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Comments
      </Typography>
      <div className="card-container">
        <div className="card-columns">
          <div className="card">
            <div className="position-relative">
              <div className="card-body">
                {comments.length > 0 ? (
                  <List>
                    {comments.map((comment) => (
                      <ListItem key={comment._id}>
                        <ListItemText primary={comment.body} />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No comments present for this project.
                  </Typography>
                )}
                <Box>
                  <TextField
                    type="text"
                    label="Add a comment..."
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: '0.7em' }}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <Button variant="contained" onClick={handleCommentSubmit}>
                    Submit
                  </Button>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCreate;
