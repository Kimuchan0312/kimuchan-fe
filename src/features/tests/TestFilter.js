import { Box, Button, Stack, Typography } from "@mui/material";
import { FMultiCheckbox } from "../../components/form";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export const FILTER_LEVEL_OPTIONS = ["N1", "N2", "N3", "N4", "N5"];

function TestFilter({ resetFilter }) {

  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Test Level
        </Typography>
        <FMultiCheckbox
          name="jlptLevel"
          options={FILTER_LEVEL_OPTIONS}
          sx={{ width: 1 }}
        />
      </Stack>

      <Box>
        <Button
          size="large"
          type="button"
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

export default TestFilter;