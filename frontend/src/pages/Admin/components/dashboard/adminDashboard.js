import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { deleteBook, getBooks, searchBook } from "../../service/admin";
import { Grid, Typography,Box , Button, Paper, CircularProgress, Backdrop, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import { Edit as  EditIcon, Delete as DeleteIcon} from '@mui/icons-material';
import { styled } from "@mui/material/styles";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    height: '250px',
    objectFit: 'cover'
});

const Item =styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
       backgroundColor: '#1A2027' ,
    }),
}))

export default function AdminDashboard() {
    const [books,setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState('');
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
    const navigate = useNavigate();
    const {enqueueSnackbar } = useSnackbar();

    const fetchBooks = async () => {
        setLoading(true);
        try {
          const response  = await getBooks();
          if(response.status === 200){
            setBooks(response.data);
          }
        } catch (error) {
          console.error(error.message);
        } finally{
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchBooks();
      },[]);

     const handleGenreChange = async (e) => {
        setLoading(true);
        const selectedGenre = e.target.value;
        setSelectedGenre(selectedGenre);
        try {
          const response  = await searchBook(selectedGenre);
          if(response.status === 200){
            setBooks(response.data);
          }
        } catch (error) {
          console.error(error.message);
        } finally{
          setLoading(false);
        }
      };


      const handleDeleteBook = async (id) => {
        setLoading(true);
    
        try {
          const response  = await deleteBook(id);
          if(response.status === 200){
            navigate(`/admin/dashboard`)
            enqueueSnackbar('Book deleted successfully', {variant: 'success', autoHideDuration:5000});
            fetchBooks();
          }
        } catch (error) {
          enqueueSnackbar('Getting error while deleting book', {variant: 'error', autoHideDuration:5000});
        } finally{
          setLoading(false);
        }
      };

    const handleUpdateBook = async (id) => {
       navigate(`/admin/book/${id}/edit`);
    };


    return (
      <>
         <Grid 
             sx={{
                marginTop:3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
             }}
          >
              <FormControl sx={{ mt:2, width:400}} margin="normal">
                   <InputLabel id="genre-label">Select genre to search</InputLabel>
                   <Select
                       labelId="genre-label"
                       id="genre"
                       value={selectedGenre}
                       onChange={handleGenreChange}
                       label="Select genre"
                    >
                       <MenuItem value="">Select genre</MenuItem>
                       {genres.map((genre) => (
                           <MenuItem key={genre} value={genre}>
                              {genre}
                           </MenuItem>
                        ))}
                    </Select>
              </FormControl>
          </Grid>
        <Box sx={{ flexGrow:1, p:5}}>
          <Grid container spacing= {2}>
             {books.map((book) => (
                 <Grid size={{ xs: 12, md: 6 }} key={book._id}>
                   <Item>
                      <Box sx={{ dispay: 'flex',p:3 , alignItems: 'center'}}>
                        <Box sx={{ width: '40%', display: 'flex', justifyContent: 'center',p:2}}>
                                <Img alt="complex" src={book.imageUrl} sx={{ width:'100%' , height: 'auto', maxWidth: '150px'}} />
                          </Box>
                          <Box sx={{ width: '60%',pl:3}}>
                          <Typography varient="h6" component="div">
                              <strong>{book.title}</strong>
                          </Typography>
                          <Box sx={{ display: 'grid', gridTemplateColumns: '100px 1fr' , gap:1, mt:2}}>
                              <Typography varient="body2" color="text.secondary">
                                 Author
                              </Typography>
                              <Typography varient="body2" color="text.secondary">
                                  <strong>{book.author}</strong>
                              </Typography>

                              <Typography varient="body2" color="text.secondary">
                                  Description:
                              </Typography>
                              <Typography varient="body2" color="text.secondary">
                                  <strong>{book.description}</strong>
                              </Typography>

                              <Typography varient="body2" color="text.secondary">
                                  Price:
                              </Typography>
                              <Typography varient="body2" color="text.secondary">
                                  <strong>{book.price}</strong>
                              </Typography>

                              <Typography varient="body2" color="text.secondary">
                                  Genre:
                              </Typography>
                              <Typography varient="body2" color="text.secondary">
                                  <strong>{book.genre}</strong>
                              </Typography>

                              <Typography varient="body2" color="text.secondary">
                                  Condition:
                              </Typography>
                              <Typography varient="body2" color="text.secondary">
                                  <strong>{book.condition}</strong>
                              </Typography>

                              <Typography varient="body2" color="text.secondary">
                                  Edition:
                              </Typography>
                              <Typography varient="body2" color="text.secondary">
                                  <strong>{book.edition}</strong>
                              </Typography>

                              <Typography varient="body2" color="text.secondary">
                                  Status:
                              </Typography>
                              <Typography varient="body2" color="text.secondary">
                                  <strong>{book.status}</strong>
                              </Typography>
                          </Box>
                          <Box sx={{disply: 'flex',gap:2 , mt:2}}>
                               <Button
                                   varient="outlined"
                                   color="primary"
                                   endIcon={<EditIcon />}
                                   onClick={() => handleUpdateBook(book._id)}
                                >
                                  Update
                                </Button>
                                <Button
                                   varient="outlined"
                                   color="primary"
                                   endIcon={<DeleteIcon />}
                                   onClick={() => handleDeleteBook(book._id)}
                                >
                                  Delete
                                </Button>
                          </Box>
                        </Box>
                      </Box>
                   </Item>
                 </Grid>
             ))}
          </Grid>
        </Box>

        <Backdrop 
         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open={loading}
         >
         <CircularProgress color="success" />
        </Backdrop>
      </>
    )
}