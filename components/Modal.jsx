import { useState } from 'react';
import { useSession } from 'next-auth/react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';

import { labelsStar, getLabelText } from '@utils/constants/constants';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ModalPopup = ({ open, handleClose, post }) => {
  const { data: session } = useSession();
  const [Hover, setHover] = useState(-1);
  const [Value, setValue] = useState(2);
  const [Comment, setComment] = useState("");
  const [Submitting, setSubmitting] = useState(false)

  // handle the rating hover
  const handleChangeActive = (e, newHover) => {
    setHover(newHover);
  }

  // handle change of ratings
  const handleRating = (e, newValue) => {
    setValue(newValue);
  }

  // handle the textfield comment
  const handleComment = (e) => {
    setComment(e.target.value);
  }

  // handle the ratings and comments
  const handleSendComment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/comment/new/`, {
        method: 'POST',
        body: JSON.stringify({
          user: post.creator._id,
          creator: session?.user.id,
          prompt: post._id,
          comment: Comment,
          rating: Value,
        })
      });
      
      if (!response.ok) {
        handleClose();
        toast.error('Something went wrong');
        return;
      }
      
      toast.success('Comment sent');

    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      handleClose();
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Typography id="modal-modal-title" variant="h3" component="h3">
              Say thanks!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Give a rating and comment to <span className='underline'>{post?.creator?.username}</span>, and let them know what you think about their prompt.
            </Typography>
            <Box className='flex flex-col items-center justify-center w-full gap-3' >
              {Value !== null && (
                <Box sx={{ px: 2 }}>{labelsStar[Hover !== -1 ? Hover : Value]}</Box>
              )}
              
              <Rating
                readOnly={false}
                name="hover-feedback"
                size='large'
                value={Value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={handleRating}
                onChangeActive={handleChangeActive}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                className='cursor-pointer'
              />
            </Box>
          </div>
          
          <TextField
            id="outlined-textarea"
            label="Comment"
            placeholder={`Comment ${post?.creator?.username} prompt here...`}
            multiline
            rows={3}
            onChange={handleComment}
            className='w-full'
          />

          <div className='flex items-center justify-center flex-1 w-full mt-3'>
            <Button variant='outlined' onClick={handleSendComment}>
            {Submitting ? 'Sending...' : 'Send'}
          </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalPopup