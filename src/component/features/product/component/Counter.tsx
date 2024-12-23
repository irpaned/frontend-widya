import React, { useState, forwardRef } from "react";
import { IconButton, Box, useTheme, InputBase } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CounterProps {
  backgroundColor?: string;
  fontColor?: string;
  borderColor?: string;
  useShadow?: boolean;
  onCountChange?: (count: number) => void;
}

const Counter = forwardRef<HTMLDivElement, CounterProps>(
  (
    {
      backgroundColor = "#fff",
      fontColor = "#000",
      borderColor = "#000",
      useShadow = false,
      onCountChange,
    }: CounterProps,
    ref
  ) => {
    const [count, setCount] = useState<number>(1);
    const [inputValue, setInputValue] = useState<string>("1");

    const theme = useTheme();

    const increment = () => {
      const newCount = count + 1;
      setCount(newCount);
      setInputValue(String(newCount));
      if (onCountChange) {
        onCountChange(newCount);
      }
    };

    const decrement = () => {
      if (count > 1) {
        const newCount = count - 1;
        setCount(newCount);
        setInputValue(String(newCount));
        if (onCountChange) {
          onCountChange(newCount);
        }
      }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (/^\d{0,4}$/.test(value)) {
        setInputValue(value);
      }
    };

    const handleInputSubmit = () => {
      const numericValue = parseInt(inputValue, 10);
      const newCount =
        isNaN(numericValue) || numericValue < 1 ? 1 : numericValue;
      setCount(newCount);
      setInputValue(String(newCount));
      if (onCountChange) {
        onCountChange(newCount);
      }
    };

    return (
      <Box
        ref={ref}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          boxShadow: useShadow ? theme.shadows[4] : "none",
          maxWidth: 130,
        }}
      >
        <IconButton
          onClick={decrement}
          disabled={count === 1}
          sx={{ padding: 1 }}
        >
          <RemoveIcon sx={{ color: fontColor }} />
        </IconButton>

        {/* Input with no border */}
        <InputBase
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputSubmit}
          sx={{
            width: 50,
            textAlign: "center",
            height: 40,
            border: "none",
            color: fontColor,
            "& .MuiInputBase-input": {
              textAlign: "center",
            },
          }}
          inputProps={{
            style: { textAlign: "center" },
            inputMode: "numeric",
          }}
        />

        <IconButton onClick={increment} sx={{ padding: 1 }}>
          <AddIcon sx={{ color: fontColor }} />
        </IconButton>
      </Box>
    );
  }
);

export default React.memo(Counter);
