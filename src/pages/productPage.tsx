import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { AddProduct } from "../component/features/product/component/modal/AddProduct";
import ListProduct from "../component/features/product/component/ListProduct";

export function ProductPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>
      <div className="bg-white p-14">
        <div className="w-[100%] flex justify-between mb-[20px]">
          <p className="text-2xl font-bold">My Product</p>
          <Button
            onClick={handleOpen}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundColor: isHovered ? "white" : "#1B5EA0",
              color: isHovered ? "#1B5EA0" : "white",
              border: isHovered ? "2px solid #1B5EA0" : "2px solid white",
              padding: "3px 15px 3px 15px",
              fontWeight: "bold",
              transition: "all 0.3s ease",
            }}
          >
            Add Product
          </Button>

          <Modal open={open} onClose={handleClose}>
            <AddProduct />
          </Modal>
        </div>
        <ListProduct />
      </div>
    </>
  );
}
