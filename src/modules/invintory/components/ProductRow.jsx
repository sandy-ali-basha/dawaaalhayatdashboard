import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Collapse,
  IconButton,
  TableHead,
  TableBody,
  Table,
  Chip,
  Stack,
  Avatar,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { ImageOutlined } from "@mui/icons-material";

// COMPONENT FOR EACH PRODUCT ROW
function ProductRow({ product }) {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      {/* ---------- PRODUCT ROW ---------- */}
      <TableRow hover>
        <TableCell>
          <IconButton size="large" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell>
          <Avatar variant="square" sx={{ bgcolor: "#e4e4e4" }} src={product.images?.[0]?.image_path}>
            <ImageOutlined />
          </Avatar>
        </TableCell>

        <TableCell>{product.id}</TableCell>
        <TableCell>{product?.name?.en||"-"}</TableCell>
        <TableCell>{product.sku}</TableCell>
        <TableCell>{product.brand?.name ?? "-"}</TableCell>
        <TableCell>{product.product_type?.name ?? "-"}</TableCell>
      </TableRow>

      {/* ---------- VARIANTS ROW (COLLAPSIBLE) ---------- */}
      <TableRow>
        <TableCell colSpan={6} sx={{ py: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableHead sx={{ py: 0 }}>
                  <TableRow>
                    <TableCell>Options</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Re order</TableCell>
                    <TableCell>City</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {product.variants?.map((variant) => (
                    <TableRow key={variant.id}>
                      {/* OPTIONS AS PILLS */}
                      <TableCell>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {variant.options?.length > 0
                            ? variant.options.map((opt, idx) => (
                                <Chip
                                  key={idx}
                                  label={opt}
                                  size="small"
                                  sx={{
                                    borderRadius: "12px",
                                    background: "#91bad6ff",
                                  }}
                                />
                              ))
                            : "- no options -"}
                        </Stack>
                      </TableCell>

                      <TableCell>{variant.sku ?? "-"}</TableCell>
                      <TableCell>{variant.price}</TableCell>
                      <TableCell>{variant.compare_price}</TableCell>
                      <TableCell>{variant.quantity}</TableCell>

                      {/* RE ORDER POINT ALERT ICON */}
                      <TableCell>
                        {variant.reorder_alert ? (
                          <WarningAmberIcon color="error" />
                        ) : (
                          "-"
                        )}
                      </TableCell>

                      {/* CITY NAME */}
                      <TableCell>{variant.city ?? "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default ProductRow;
