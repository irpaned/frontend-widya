import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { numberToRupiah } from "../utils/numberToRupiah";
import { useDetailProduct } from "../component/features/product/hooks/useDetailProduct";
import { useParams } from "react-router-dom";
import Counter from "../component/features/product/component/Counter";
import { PrimaryButton } from "../component/ui/button/PrimatyButton";

export function DetailProduct() {
  const { id } = useParams<{ id: string }>();
  const numbericId = Number(id);
  const { products } = useDetailProduct(numbericId);
  return (
    <Card
      sx={{
        borderRadius: "10px",
        width: "99%",
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        padding: "80px",
        paddingY: "50px",
        backgroundColor: "white",
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{ height: 350, width: "50%", borderRadius: "10px" }}
        image={products?.photoProduct}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "50%",
        }}
      >
        <Typography
          gutterBottom
          style={{
            fontSize: "25px",
            width: "100%",
          }}
          component="div"
        >
          {products?.productName}
        </Typography>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <Typography
            gutterBottom
            style={{
              fontSize: "18px",
            }}
            component="div"
          >
            150 Sold
          </Typography>
          |
          <Typography
            gutterBottom
            style={{
              fontSize: "18px",
            }}
            component="div"
          >
            450 Stars
          </Typography>
        </div>
        <Typography
          sx={{ color: "black", fontSize: "30px", fontWeight: "bold" }}
        >
          {numberToRupiah(products?.price as number)}
        </Typography>
        <Counter />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifySelf: "end",
          }}
        >
          <PrimaryButton
            title="Add to Cart"
            bg="black"
            color="white"
            style={{ width: "100%", marginBottom: 0, borderRadius: "10px" }}
          />
          <PrimaryButton
            title="Buy Now"
            bg="black"
            color="white"
            style={{ width: "100%", marginBottom: 0, borderRadius: "10px" }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
