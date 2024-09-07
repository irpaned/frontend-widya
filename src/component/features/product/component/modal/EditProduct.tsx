import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { PrimaryButton } from "../../../../ui/button/PrimatyButton";
import { useEditProduct } from "../../hooks/use-edit-product";
import { ProductEntity } from "../../entities/ProductEntity";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

interface ProductCardProps {
  product: ProductEntity;
}

export function EditProduct({ product }: ProductCardProps) {
  const { register, errors, handleSubmit, onSubmit } = useEditProduct(
    product.id
  );

  return (
    <div>
      <Box sx={style}>
        <Typography
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          Edit Product
        </Typography>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("productName")}
            defaultValue={product.productName}
            className="w-full"
            type="text"
            label="Product Name"
          />
          <Typography color={"red"}>{errors.productName?.message}</Typography>

          <TextField
            {...register("price")}
            defaultValue={product.price}
            className="w-full"
            type="number"
            label="Price"
          />
          <Typography color={"red"}>{errors.price?.message}</Typography>

          <Typography>Photo Product</Typography>
          <TextField
            {...register("photoProduct")}
            className="w-full"
            type="file"
          />
          <Typography color={"red"}>{errors.photoProduct?.message}</Typography>

          <PrimaryButton
            title="Submit"
            buttonType="submit"
            color="white"
            fw="bold"
            fs="15px"
            className="w-full"
          />
        </form>
      </Box>
    </div>
  );
}
