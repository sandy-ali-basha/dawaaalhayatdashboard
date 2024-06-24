import {
  Box,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  Pagination,
  TableRow,
} from "@mui/material";

export const Table = ({ rows, columns, page, setPage, count }) => {
  return (
    <Box>
      <Box className="table-scroll" sx={{ overflow: "auto" }}>
        <TableContainer
          sx={{
            width: "100%",
            display: "table",
            tableLayout: "fixed",
          }}
        >
          <MuiTable>
            {/* <TableHead>
              {columns?.map((item, index) => (
                <TableCell key={index} sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle1">{item}</Typography>
                </TableCell>
              ))}
            </TableHead> */}
            <TableHead>
              <TableRow>
                {columns?.map((item, index) => (
                  <TableCell key={index} sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">{item}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                textAlign: "left",
                alignContent: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              {rows}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Box>
      <Box
        sx={{
          alignContent: "center",
          display: "flex",
          justifyContent: "center",
          mt: "5px",
        }}
      >
        <Pagination
          page={page}
          onChange={(e, page) => setPage(page)}
          count={count ?? 1}
          sx={{
            ".MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "origin.main",
            },
          }}
        />
      </Box>
    </Box>
  );
};
