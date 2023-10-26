import { Box, Button, Stack, Typography } from "@mui/material";
import { FMultiCheckbox } from "./form";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
];

export const FILTER_LEVEL_OPTIONS = ["JLPT N1", "JLPT N2", "JLPT N3", "JLPT N4", "JLPT N5"];

function ReadingFilter({ resetFilter }) {
  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Level
        </Typography>
        <FMultiCheckbox
          name="level"
          options={FILTER_LEVEL_OPTIONS}
          sx={{ width: 1 }}
        />
      </Stack>

      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={resetFilter}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default ReadingFilter;