import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { AddProduct } from "../component/features/product/component/modal/AddProduct";
import ListProductDashboard from "../component/features/product/component/ListProductDashboard";

export function Dashboard() {
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
      <div className="bg-white p-14 w-[100%] flex flex-col items-center">
        <div className="w-[100%] flex justify-between mb-[20px]">
          <p className="text-2xl font-bold">My Product</p>
          <Button
            onClick={handleOpen}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundColor: isHovered ? "white" : "black",
              color: isHovered ? "black" : "white",
              border: isHovered ? "2px solid black" : "2px solid black",
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
        <ListProductDashboard />
      </div>
    </>
  );
}
