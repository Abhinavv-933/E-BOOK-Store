import { useEffect, useState } from "react";
import { getCartByUser, placeOrder } from "../../service/customer";
import { Box, Grid, Typography, Backdrop, CircularProgress, Dialog, DialogContentText, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";


export default function Cart() {
    const [loading, setLoading] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const [order, setOrder] = useState({});
    const [formData, setFormData] = useState({
        orderDescription: '',
        address: ''
    });
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const fetchCartByUser = async () => {
        setLoading(true);
        try {
            const response = await getCartByUser();
            if (response.status === 200) {
                setOrder(response.data);
                setCartItem(response.data.cartItem);
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartByUser();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await placeOrder(formData);
            if (response.status === 200) {
                navigate(`/customer/dashboard`);
                enqueueSnackbar('Order placed successfully', { variant: 'success', autoHideDuration: 5000 });
                setOpen(false);
            }
        } catch (error) {
            enqueueSnackbar('Getting error while placing Order', { variant: 'error', autoHideDuration: 5000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {cartItem.length > 0 ? (
                <>
                    <Box sx={{ flexGrow: 1, p: 5 }}>
                        <Grid container spacing={1}>
                            <Grid container item spacing={3}>
                                {cartItem.map(item => (
                                    <Grid item key={item.book._id}>
                                        <img src={item.book.imageUrl} alt="product-image" style={{ width: 70, height: 70 }} />
                                        <Typography variant="h6">
                                            Name: {item.book.title}
                                        </Typography>
                                        <Typography variant="body1">
                                            Price: ${item.book.price}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1, p: 5, display: 'flex', justifyContent: 'flex-end' }}>
                        <Grid container spacing={1} direction="column" alignItems="flex-end">
                            <Grid item>
                                <Typography>Total Amount: ${order.amount}</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ mt: 2 }}>
                                    Place Order
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            ) : (
                <Box
                    sx={{
                        flexGrow: 1,
                        p: 5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h4">Nothing to see here</Typography>
                </Box>
            )}

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle>Place Order</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Place your order by adding any special instruction in description and address.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="address"
                        name="address"
                        label="Address"
                        type="text"
                        multiline
                        maxRows={4}
                        fullWidth
                        variant="standard"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="orderDescription"
                        name="orderDescription"
                        label="Description or Instruction"
                        type="text"
                        multiline
                        maxRows={4}
                        fullWidth
                        variant="standard"
                        value={formData.orderDescription}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit">Place Order</Button>
                </DialogActions>
            </Dialog>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="success" />
            </Backdrop>
        </>
    );
}