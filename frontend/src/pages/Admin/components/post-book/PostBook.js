import { useState } from "react"

const defaultTheme = createTheme();

export default function PostBook(){
  const [conditions] = useState(["New", "Like New", "Used - Good", "Used - Acceptable"]);
  const [genre] = useState([
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
  const [book,setBook] = useState({
    title: '',
    auhtor: '',
    Description: '',
    price: '',
    condition: '',
    edition: '',
    imageUrl: ''
  });

  const [loading,setLoading] = useState(false);

  const handleInputChange = (event) => {
     const {name, value} = event.target;
     const numericValue = (name === 'price') ? parseInt(value,10) : value;
     setBook({
       ...book,
       [name] : numericValue
     })
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    console.log(book);
    setLoading(false);
  }

   return (
      <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Box 
             sx={{
                 marginTop: 2,
                 display:'flex',
                 flexDirection: 'column',
                 alignItems: 'center',
             }}
          >
             <Avatar sx={{ m:1, bgcolor: 'primary.main'}}>
               <BookIcon />
             </Avatar>
             <Typography component = "h1" variant = "h5">
                PostBook
             </Typography>
             <Box component = "form" onSubmit={handleSubmit} noValidate sx={{mt:1}}>
             <TextField 
                margin="normal"
                required
                fullWidth
                id="imageUrl"
                label="Enter image url"
                name="imageUrl"
                autoComplete="imageUrl"
                autoFocus
                value= {book.imageUrl}
                onChange={handleInputChange}
             />
            <TextField 
               margin="normal"
               required
               fullWidth
               id="title"
               label="Enter book title"
               name="title"
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


             </Box>
          </Box>  
        </Container>
      </ThemeProvider>
      </>
   )
};