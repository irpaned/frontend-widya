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
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "80px",
        paddingY: "50px",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          borderRadius: "10px",
          width: "99%",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          sx={{ height: 350, width: "50%", borderRadius: "10px" }}
          image={products?.photoProduct}
        />
        <CardContent
          className="bg-gray-100"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "50%",

            borderRadius: "10px",
          }}
        >
          <Typography
            gutterBottom
            style={{
              fontSize: "25px",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
            component="div"
          >
            {products?.productName}
          </Typography>

          <Typography
            gutterBottom
            style={{
              fontSize: "18px",
            }}
            component="div"
          >
            Stock Available {products?.stock}
          </Typography>
          {products?.discount > 0 ? (
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
                {numberToRupiah(products?.priceAfterDiscount as number)}
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
                {products?.discount}%
              </Typography>
              <Typography
                sx={{
                  color: "black",
                  fontSize: "20px",
                  textDecoration: "line-through",
                }}
              >
                {numberToRupiah(products?.price as number)}
              </Typography>
            </div>
          ) : (
            <Typography
              sx={{ color: "black", fontSize: "30px", fontWeight: "bold" }}
            >
              {numberToRupiah(products?.price as number)}
            </Typography>
          )}

          <Counter backgroundColor="background" />
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
      </div>
      <div style={{ width: "100%" }}>
        <Typography style={{ fontSize: "25px", fontWeight: "bold" }}>
          Product Description
        </Typography>
        <div style={{ whiteSpace: "pre-line" }}>{products?.description}</div>
      </div>
    </Card>
  );
}
