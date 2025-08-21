import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
} from "@mui/material";

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    productName: params.get("productName") || "",
    companyName: params.get("companyName") || "",
    quantity: params.get("quantity") || "",
    productId: params.get("productId") || "",
  };
}

const OrderRequestForm = () => {
  const product = getQueryParams();
  const [form, setForm] = useState({
    name: "",
    message: "",
    requestedQuantity: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the order request to your backend
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Order Request
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Product: {product.productName}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Company: {product.companyName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Available Quantity: {product.quantity}
          </Typography>
        </Box>
        {submitted ? (
          <Typography color="success.main" sx={{ mt: 2, fontWeight: 500 }}>
            Request Sent! Thank you for your order request.
          </Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Requested Quantity"
              name="requestedQuantity"
              type="number"
              value={form.requestedQuantity}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              multiline
              rows={3}
              value={form.message}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />
            <Box sx={{ textAlign: "right" }}>
              <Button type="submit" variant="contained" size="large">
                Submit Request
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default OrderRequestForm;
