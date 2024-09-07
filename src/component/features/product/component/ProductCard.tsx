import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import { BoxProps } from "@mui/material";
import { ProductEntity } from "../entities/ProductEntity";
import { useDeleteThread } from "../hooks/use-delete-product";
import { useState } from "react";
import { EditProduct } from "./modal/EditProduct";
import { Modal } from "@mui/material";

interface ProductCardProps {
  product: ProductEntity;
}

export function ProductCard({ product }: ProductCardProps) {
  const { onDelete } = useDeleteThread(product.id);
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

  const [isHover, setIsHover] = useState(false);

  const handleMouseIn = () => {
    setIsHover(true);
  };

  const handleMouseOut = () => {
    setIsHover(false);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{ height: 250, width: 300 }}
        image={product.photoProduct}
      />
      <CardContent>
        <Typography
          gutterBottom
          style={{
            fontSize: "18px",
            lineHeight: "25px",
            height: "35px",
            width: "100%",
          }}
          component="div"
        >
          {product.productName}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "18px" }}>
          $ {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            backgroundColor: isHovered ? "white" : "#1B5EA0",
            color: isHovered ? "#1B5EA0" : "white",
            border: isHovered ? "2px solid #1B5EA0" : "2px solid white",
            padding: "3px 15px 3px 15px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            width: "100%",
          }}
          onClick={handleOpen}
          size="small"
        >
          Edit
        </Button>
        <Modal open={open} onClose={handleClose}>
          <EditProduct product={product} />
        </Modal>
        <Button
          onMouseEnter={handleMouseIn}
          onMouseLeave={handleMouseOut}
          style={{
            backgroundColor: isHover ? "white" : "#1B5EA0",
            color: isHover ? "#1B5EA0" : "white",
            border: isHover ? "2px solid #1B5EA0" : "2px solid white",
            padding: "3px 15px 3px 15px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            width: "100%",
          }}
          onClick={() => {
            onDelete();
          }}
          size="small"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
