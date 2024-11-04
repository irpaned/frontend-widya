import { Button, Modal } from "@mui/material";
import { ProductCard } from "../component/features/product/component/ProductCard";
import { useProduct } from "../component/features/product/hooks/useProduct";
import { useEffect, useState } from "react";
import { AddProduct } from "../component/features/product/component/modal/AddProduct";

export function ProductPage() {
  const { products } = useProduct();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // ini untuk memunculkan snap dari midtrans
  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    const scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>
      <div className="bg-white p-14">
        <div className="w-[100%] flex justify-end mb-[20px]">
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
        <div className="flex grid grid-cols-3 gap-3">
          {Array.isArray(products) &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </>
  );
}
