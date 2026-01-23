import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Add, PlusOne, Remove } from "@mui/icons-material";
import { _axios } from "interceptor/http-config";
import i18next from "i18next";
import { useCallback } from "react";
import { BoxStyled } from "components/styled/BoxStyled";

export default function OrdersCreate() {
  /* ------------------ location ------------------ */
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [cityId, setCityId] = useState("");
  const [cityName, setCityName] = useState("");

  /* ------------------ products ------------------ */
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  /* ------------------ customer ------------------ */
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  /* ------------------ totals ------------------ */
  const [totals, setTotals] = useState({
    subtotal: 0,
    shipping: 50,
    total: 0,
  });

  /* ------------------ load countries ------------------ */
  useEffect(() => {
    _axios.get("/regions").then((res) => {
      setCountries(res?.data.data || []);
    });
  }, []);

  /* ------------------ when country changes ------------------ */
  const handleCountryChange = (e) => {
    const id = e.target.value;
    setCountryId(id);
    setCityId("");

    const selected = countries.find((c) => c.id === id);
    setCities(selected?.cities || []);
  };

  /* ------------------ when city changes ------------------ */
  const handleCityChange = (e) => {
    console.log("CITY SELECTED", e);
    setCityId(e.target.value.id);
    setCityName(e.target.value.name);
  };

  /* ------------------ load products by city ------------------ */
  useEffect(() => {
    if (!cityId) return;

    _axios
      .post("/filter", { filters: {} }, { headers: { city: cityId } })
      .then((res) => setProducts(res.data?.data?.products || []));
  }, [cityId]);

  /* ------------------ add product ------------------ */
  const addProduct = (product, variant) => {
    const existsIndex = selectedItems.findIndex(
      (i) => i.variant_id === variant.id,
    );

    if (existsIndex !== -1) {
      const copy = [...selectedItems];
      copy[existsIndex].quantity += 1;
      setSelectedItems(copy);
      return;
    }

    setSelectedItems((prev) => [
      ...prev,
      {
        product_id: product.id,
        name: product.name.en,
        variant_id: variant.id,
        variant_name: variant.options,
        price: variant.price,
        quantity: 1,
      },
    ]);
  };

  /* ------------------ update quantity ------------------ */
  const updateQty = (index, qty) => {
    if (qty < 1) return;
    const copy = [...selectedItems];
    copy[index].quantity = qty;
    setSelectedItems(copy);
  };

  /* ------------------ calculate totals ------------------ */
  useEffect(() => {
    const subtotal = selectedItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0,
    );

    setTotals({
      subtotal,
      shipping: totals.shipping,
      total: subtotal + totals.shipping,
    });
  }, [selectedItems]);

  /* ------------------ create order ------------------ */
  const createOrder = () => {
    const payload = {
      city_id: cityId,
      customer,
      items: selectedItems,
      totals,
    };

    console.log("ORDER PAYLOAD", payload);
    // _orders.create(payload)
  };

  /* ------------------ filter variants by city ------------------ */
  const filteredVariants = useCallback(
    (variants) => {
      return variants.filter(
        (v) => v.city?.toLowerCase() === cityName.toLowerCase(),
      );
    },
    [cityName],
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography color="text.primary" variant="h5" fontWeight="bold" mb={3}>
        Create Order
      </Typography>

      {/* ------------------ Country & City ------------------ */}
      <BoxStyled>
        <Grid container spacing={2} sx={{p:2}}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                value={countryId}
                onChange={handleCountryChange}
                label="Country"
              >
                {countries.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c[`name_${i18next.language}`] || c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl fullWidth disabled={!countryId}>
              <InputLabel>City</InputLabel>
              <Select value={cityId} onChange={handleCityChange} label="City">
                {cities.map((c) => (
                  <MenuItem key={c.id} value={c}>
                    {c[`name_${i18next.language}`] || c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </BoxStyled>

      {/* ------------------ Products ------------------ */}
      <Grid container spacing={2} mt={2}>
        {products?.map((p) => (
          <Grid item md={4} key={p.id}>
            <Card>
              <CardContent>
                <Typography color="text.primary" fontWeight="bold">
                  {p.name.en}
                </Typography>
                {filteredVariants(p.variants)?.map((v) => (
                  <Button
                    key={v.id}
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => addProduct(p, v)}
                  >
                    + {v.options} – {v.price} {v.currency.code}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ------------------ Cart ------------------ */}
      <BoxStyled mt={4} sx={{p:2}}>
        <Typography color="text.primary" variant="h6">
          Order Items
        </Typography>

        {selectedItems.map((item, idx) => (
          <Box
            key={idx}
            sx={{ display: "flex", alignItems: "center", gap: 2, my: 1 }}
          >
            <Typography color="text.primary" sx={{ flex: 1 }}>
              {item.name} ({item.variant_name})
            </Typography>

            <IconButton onClick={() => updateQty(idx, item.quantity - 1)}>
              <Remove />
            </IconButton>

            <Typography color="text.primary">{item.quantity}</Typography>

            <IconButton onClick={() => updateQty(idx, item.quantity + 1)}>
              <Add />
            </IconButton>

            <Typography color="text.primary">
              {item.price * item.quantity}
            </Typography>
          </Box>
        ))}
      </BoxStyled>

      {/* ------------------ Customer ------------------ */}
      <BoxStyled mt={4} sx={{p:2}}>
        <TextField
          fullWidth
          label="Customer Name"
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        />
        <TextField
          fullWidth
          label="Phone"
          sx={{ mt: 2 }}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
        />
        <TextField
          fullWidth
          label="Address"
          sx={{ mt: 2 }}
          onChange={(e) =>
            setCustomer({ ...customer, address: e.target.value })
          }
        />
        <TextField
          fullWidth
          label="Notes"
          sx={{ mt: 2 }}
          onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
        />
      </BoxStyled>

      {/* ------------------ Summary ------------------ */}
      <Box mt={4}>
        <Typography color="text.primary">
          Subtotal: {totals.subtotal}
        </Typography>
        <Typography color="text.primary">
          Shipping: {totals.shipping}
        </Typography>
        <Typography color="text.primary" fontWeight="bold">
          Total: {totals.total}
        </Typography>
      </Box>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={createOrder}
        disabled={!selectedItems.length || !cityId}
      >
        Create Order
      </Button>
    </Container>
  );
}
