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

interface ProductCardProps {
  product: ProductEntity;
}

export function ProductCardDashboard({ product }: ProductCardProps) {
  const { onDelete } = useDeleteThread(product.id);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDeleteConfirm = () => setOpenDeleteConfirm(true);
  const handleCloseDeleteConfirm = () => setOpenDeleteConfirm(false);

  const handleDelete = () => {
    onDelete();
    setOpenDeleteConfirm(false);
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const [isHover, setIsHover] = useState(false);

  const handleMouseIn = () => setIsHover(true);
  const handleMouseOut = () => setIsHover(false);

  return (
    <Card
      sx={{
        borderRadius: "10px",
        width: "99%",
        display: "flex",
        flexDirection: "row",
        padding: "20px",
        gap: "20px",
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{ height: 250, width: "30%", borderRadius: "10px" }}
        image={product.photoProduct}
      />
      <CardContent
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 8,
          width: "70%",
        }}
      >
        <Typography
          gutterBottom
          style={{
            fontSize: "20px",
            lineHeight: "18px",
            height: "36px",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            fontWeight: "bold",
          }}
          component="div"
        >
          {product.productName}
        </Typography>
        <Typography
          gutterBottom
          style={{
            fontSize: "15px",
            lineHeight: "18px",
            height: "36px",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
          component="div"
        >
          {product.description}
        </Typography>
        <Typography
          gutterBottom
          style={{
            fontSize: "18px",
            lineHeight: "18px",
            height: "36px",
            width: "100%",
            fontWeight: "bold",
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
            }}
          >
            <Typography
              sx={{ color: "black", fontSize: "30px", fontWeight: "bold" }}
            >
              {numberToRupiah(product?.priceAfterDiscount as number)}
            </Typography>
            <Typography style={{ fontSize: "25px" }}>|</Typography>
            <Typography
              className="bg-gray-500"
              sx={{
                color: "white",
                fontSize: "20px",
                borderRadius: "10px",
                padding: "3px",
              }}
            >
              {product?.discount}%
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontSize: "20px",
                textDecoration: "line-through",
              }}
            >
              {numberToRupiah(product?.price as number)}
            </Typography>
          </div>
        ) : (
          <Typography
            sx={{ color: "black", fontSize: "30px", fontWeight: "bold" }}
          >
            {numberToRupiah(product?.price as number)}
          </Typography>
        )}

        <CardActions>
          <div className="w-full flex justify-between gap-2">
            <Button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundColor: isHovered ? "white" : "black",
                color: isHovered ? "black" : "white",
                border: isHovered ? "2px solid black" : "2px solid black",
                padding: "3px 15px 3px 15px",
                fontWeight: "bold",
                transition: "all 0.3s ease",
                width: "100%",
              }}
              onClick={handleOpenEdit}
              size="small"
            >
              Edit
            </Button>
            <Modal
              open={openEdit}
              onClose={handleCloseEdit}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <EditProduct product={product} />
            </Modal>

            <Button
              onMouseEnter={handleMouseIn}
              onMouseLeave={handleMouseOut}
              style={{
                backgroundColor: isHover ? "white" : "black",
                color: isHover ? "black" : "white",
                border: isHover ? "2px solid black" : "2px solid black",
                padding: "3px 15px 3px 15px",
                fontWeight: "bold",
                transition: "all 0.3s ease",
                width: "100%",
              }}
              onClick={handleOpenDeleteConfirm}
              size="small"
            >
              Delete
            </Button>
            <Modal
              open={openDeleteConfirm}
              onClose={handleCloseDeleteConfirm}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  width: "500px",
                }}
              >
                <Typography variant="h6">
                  Are you sure you want to delete this product?
                </Typography>
                <div style={{ marginTop: "20px" }}>
                  <Button
                    onClick={handleDelete}
                    style={{
                      marginRight: "10px",
                      backgroundColor: "red",
                      color: "white",
                      fontWeight: "bold",
                      padding: "3px 15px 3px 15px",
                    }}
                    size="medium"
                  >
                    Yes, Delete
                  </Button>
                  <Button
                    onClick={handleCloseDeleteConfirm}
                    style={{
                      backgroundColor: "grey",
                      color: "white",
                      fontWeight: "bold",
                      padding: "3px 15px 3px 15px",
                    }}
                    size="medium"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </CardActions>
      </CardContent>
    </Card>
  );
}
