import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Backdrop,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate, useParams} from "react-router-dom";
import { useSnackbar} from "notistack";
import { Edit } from "@mui/icons-material";
import { getBooksById, updateBook } from "../../service/admin";

const defaultTheme = createTheme();

export default function UpdateBook(){

     const [conditions] = useState(["New", "Like New", "Used - Good", "Used - Acceptable","Used - Like New"]);
     const {id} = useParams();
     const [genres] = useState([
       "Fantasy",
       "Science Fiction",
       "Thriller",
       "Mystery",
       "Romance",
       "Drama",
       "Historical Fiction",
       "Horror",
       "Adventure",
       "Non-Fiction",
       "Biography",
       "Self-Help",
       "Philosophy",
       "Young Adult",
       "Dystopian",
       "Crime",
       "Poetry",
       "Classics",
       "Graphic Novel",
       "Children's Literature"
     ]);
     const [statuses] = useState(["Available", "Sold"]);
     const [book, setBook] = useState({
       title: '',
       author: '',
       description: '',
       price: '',
       genre: '',
       condition: '',
       edition: '',
       imageUrl: '',
       status: ''
     });
   
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();
     const {enqueueSnackbar } = useSnackbar();

     
    useEffect(() => {
       const fetchBook = async () => {
        const fetchBook = async () => {
             setLoading(true);
             try {
               const response  = await getBooksById(id);
               if(response.status === 200){
                 setBook(response.data);
               }
             } catch (error) {
               console.error(error.message);
             } finally{
               setLoading(false);
             }
           };
    };
    fetchBook();
}, []);

   const handleInputChange = (event) => {
       const { name, value } = event.target;
       const numericValue = (name === 'price') ? parseInt(value, 10) : value;
   
       setBook({
         ...book,
         [name]: numericValue
       });
     };
   
   const handleSubmit = async (e) => {
       e.preventDefault();
       setLoading(true);
   
       try {
         const response  = await updateBook(id, book);
         if(response.status === 200){
           enqueueSnackbar('Book updated successfully', {variant: 'success', autoHideDuration:5000});
            navigate(`/admin/dashboard`);
         }
       } catch (error) {
         enqueueSnackbar('Getting error while updating book', {variant: 'error', autoHideDuration:5000});
       } finally{
         setLoading(false);
       }
     };

   return (
      <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box 
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <Edit />
            </Avatar>

            <Typography component="h1" variant="h5">
              Update Book
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

              <TextField 
                margin="normal"
                required
                fullWidth
                id="imageUrl"
                label="Enter image url"
                name="imageUrl"
                type="text"
                autoComplete="imageUrl"
                autoFocus
                value={book.imageUrl}
                onChange={handleInputChange}
              />

              <TextField 
                margin="normal"
                required
                fullWidth
                id="title"
                label="Enter book title"
                name="title"
                type="text"
                autoComplete="title"
                value={book.title}
                onChange={handleInputChange}
              />

              <TextField 
                margin="normal"
                required
                fullWidth
                id="author"
                label="Enter author name"
                name="author"
                type="text"
                autoComplete="author"
                value={book.author}
                onChange={handleInputChange}
              />

              <TextField 
                margin="normal"
                required
                fullWidth
                multiline
                rows={3}
                id="description"
                label="Enter book description"
                name="description"
                type="text"
                autoComplete="description"
                value={book.description}
                onChange={handleInputChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                type="number"
                id="price"
                label="Enter price"
                name="price"
                autoComplete="price"
                value={book.price}
                onChange={handleInputChange}
              />

              {/* GENRE DROPDOWN */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="genre-label">Select genre</InputLabel>
                <Select
                  labelId="genre-label"
                  id="genre"
                  name="genre"
                  value={book.genre}
                  label="Select genre"
                  onChange={handleInputChange}
                >
                  <MenuItem value="">Select genre</MenuItem>
                  {genres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* CONDITION DROPDOWN */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="condition-label">Select condition</InputLabel>
                <Select
                  labelId="condition-label"
                  id="condition"
                  name="condition"
                  value={book.condition}
                  label="Select condition"
                  onChange={handleInputChange}
                >
                  <MenuItem value="">Select condition</MenuItem>
                  {conditions.map((condition) => (
                    <MenuItem key={condition} value={condition}>
                      {condition}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                margin="normal"
                required
                fullWidth
                id="edition"
                label="Enter edition"
                name="edition"
                value={book.edition}
                onChange={handleInputChange}
              />
               
              <FormControl fullWidth margin="normal">
                  <InputLabel id="status-label">Select Status</InputLabel>
                  <Select 
                      labelId="status-label"
                      id="status"
                      value={book.status}
                      onChange={handleInputChange}
                      name="status"
                      label="Select status"
                  >
                    <MenuItem value="">Select status</MenuItem>
                    {statuses.map((status) => (
                       <MenuItem key={status} value={status}>
                            {status}
                       </MenuItem>
                    ))}
                  </Select>                     
              </FormControl>

              <Button 
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={
                     !book.title ||
                     !book.author ||
                     !book.description ||
                      book.price === '' || book.price === null ||
                     !book.genre ||
                     !book.condition ||
                     !book.edition ||
                     !book.imageUrl ||
                     !book.status 
                }
              >
                {loading ? <CircularProgress color="success" size={24} /> : "Update Book"}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

      {/* LOADING BACKDROP */}
      <Backdrop 
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="success" />
      </Backdrop>
      </>
   )
};