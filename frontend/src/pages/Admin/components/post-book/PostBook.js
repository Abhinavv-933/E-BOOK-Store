import { useState } from "react";
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
  Snackbar,
  Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BookIcon from '@mui/icons-material/Book';
import { postBook } from "../../service/admin";
import {useNavigate} from "react-router-dom";
import { useSnackbar} from "notistack";

const defaultTheme = createTheme();

export default function PostBook() {

  const [conditions] = useState(["New", "Like New", "Used - Good", "Used - Acceptable","Used - Like New"]);
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

  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    genre: '',
    condition: '',
    edition: '',
    imageUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar } = useSnackbar();
  const [successOpen, setSuccessOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setBook(prev => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting Book:", book);
      const response  = await postBook(book);
      if(response.status === 201){
        navigate(`/admin/dashboard`)
        enqueueSnackbar('Book posted successfully', {variant: 'success', autoHideDuration:5000});
      }


      // Show success message
      setSuccessOpen(true);

      // Reset form after submit
      setBook({
        title: "",
        author: "",
        description: "",
        price: "",
        genre: "",
        condition: "",
        edition: "",
        imageUrl: ""
      });

    } catch (error) {
      enqueueSnackbar('Getting error while posting book', {variant: 'error', autoHideDuration:5000});
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
              <BookIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Post Book
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

              <TextField 
                margin="normal"
                required
                fullWidth
                id="imageUrl"
                label="Enter image url"
                name="imageUrl"
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
                  <MenuItem value="" disabled>Select genre</MenuItem>
                  {genres.map(g => (
                    <MenuItem key={g} value={g}>
                      {g}
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
                  <MenuItem value="" disabled>Select condition</MenuItem>
                  {conditions.map(c => (
                    <MenuItem key={c} value={c}>
                      {c}
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

              <Button 
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={
                  !book.title ||
                  !book.author ||
                  !book.description ||
                  !book.price ||
                  !book.genre ||
                  !book.condition ||
                  !book.edition ||
                  !book.imageUrl
                }
              >
                {loading ? <CircularProgress color="inherit" size={22} /> : "Post Book"}
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
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* SUCCESS SNACKBAR */}
      <Snackbar 
        open={successOpen} 
        autoHideDuration={3000} 
        onClose={() => setSuccessOpen(false)}
      >
        <Alert onClose={() => setSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
          Book Posted Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
