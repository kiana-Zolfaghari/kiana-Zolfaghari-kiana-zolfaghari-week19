import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Paginations({ setPage }) {
  return (
    <Stack
      spacing={2}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <Pagination
        count={10}
        variant="outlined"
        color="primary"
        dir="ltr"
        onChange={(e, value) => setPage(value)}
      />
    </Stack>
  );
}

export default Paginations;
