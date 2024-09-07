import { Button, ButtonBaseProps, CircularProgress } from "@mui/material";

interface ButtonProps extends ButtonBaseProps {
  bg?: string;
  title?: string;
  py?: string;
  px?: string;
  fs?: string;
  buttonType?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  border?: string;
  color?: string;
  fw?: string;
  isLoading?: boolean; // Ubah isPending menjadi boolean
  onClick?: () => void;
}

export function PrimaryButton(props: ButtonProps) {
  return (
    <>
      <Button
        type={props.buttonType}
        onClick={props.onClick}
        disabled={props.isLoading} // Disable button jika sedang loading
        style={{
          backgroundColor: props.bg || "#1B5184",
          padding: `${props.py || "10px"} ${props.px || "40px"}`,
          fontSize: props.fs,
          boxShadow: "none",
          border: props.border,
          color: props.color || "black",
          fontWeight: props.fw,
        }}
        variant="contained"
      >
        {props.isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <>
            {props.icon}
            {props.title}
          </>
        )}
      </Button>
    </>
  );
}