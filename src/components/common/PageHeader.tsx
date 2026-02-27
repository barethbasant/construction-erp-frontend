import { Stack, Typography, Button } from "@mui/material";

type Props = {
  title: string;
  buttonText?: string;
  onAdd?: () => void;
};

export default function PageHeader({ title, buttonText, onAdd }: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className="page-header"
    >
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>

      {buttonText && (
        <Button variant="contained" onClick={onAdd}>
          {buttonText}
        </Button>
      )}
    </Stack>
  );
}