import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ProductEntity } from "../entities/ProductEntity";
import { useDeleteThread } from "../hooks/use-delete-product";
import { useState } from "react";
import { EditProduct } from "./modal/EditProduct";
import { Modal } from "@mui/material";
import { numberToRupiah } from "../../../../utils/numberToRupiah";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ProductEntity;
  useButton?: boolean;
}

export function ProductCard({ product, useButton = false }: ProductCardProps) {
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
    <Link to={`/product/${product.id}`}>
      <Card sx={{ borderRadius: "10px", width: "99%" }}>
        <CardMedia
          component="img"
          alt="green iguana"
          sx={{ height: 200, width: "100%" }}
          image={product.photoProduct}
        />
        <CardContent
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 8,
            flex: 1,
            flexWrap: "wrap",
          }}
        >
          <Typography
            gutterBottom
            style={{
              fontSize: "14px",
              lineHeight: "18px",
              // height: "36px",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
            component="div"
          >
            {product.productName}
          </Typography>
          <Typography
            gutterBottom
            style={{
              fontSize: "12px",
              lineHeight: "18px",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              fontWeight: "bold",
              color: "gray",
            }}
            component="div"
          >
            Stock {product.stock}
          </Typography>
          {product?.discount > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Typography
                sx={{ color: "black", fontSize: "14px", fontWeight: "bold" }}
              >
                {numberToRupiah(product?.priceAfterDiscount as number)}
              </Typography>
              <Typography
                className="bg-red-600"
                sx={{
                  color: "white",
                  fontSize: "12px",
                  borderRadius: "2px",
                  padding: "2px",
                  fontWeight: "bold",
                }}
              >
                {product?.discount}%
              </Typography>
              <Typography
                sx={{
                  color: "black",
                  fontSize: "12px",
                  textDecoration: "line-through",
                }}
              >
                {numberToRupiah(product?.price as number)}
              </Typography>
            </div>
          ) : (
            <Typography
              sx={{ color: "black", fontSize: "14px", fontWeight: "bold" }}
            >
              {numberToRupiah(product?.price as number)}
            </Typography>
          )}
        </CardContent>
        {useButton && (
          <CardActions>
            <div className="w-full flex flex-col">
              <div className="w-full flex justify-between">
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
              </div>
            </div>
          </CardActions>
        )}
      </Card>
    </Link>
  );
}
