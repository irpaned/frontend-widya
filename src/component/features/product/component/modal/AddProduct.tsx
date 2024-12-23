import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { PrimaryButton } from "../../../../ui/button/PrimatyButton";
import { useAddProduct } from "../../hooks/use-add-product";

export function AddProduct() {
  const { register, errors, handleSubmit, onSubmit } = useAddProduct();

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
          Add Product
        </Typography>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("productName")}
            className="w-full"
            type="text"
            label="Product Name"
          />
          <Typography color={"red"}>{errors.productName?.message}</Typography>

          <TextField
            {...register("description")}
            className="w-full"
            type="text"
            label="Description"
          />
          <Typography color={"red"}>{errors.description?.message}</Typography>

          <TextField
            {...register("discount")}
            className="w-full"
            type="text"
            label="Discount"
          />
          <Typography color={"red"}>{errors.discount?.message}</Typography>

          <TextField
            {...register("stock")}
            className="w-full"
            type="text"
            label="Stock"
          />
          <Typography color={"red"}>{errors.stock?.message}</Typography>

          <TextField
            {...register("price")}
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
            bg="black"
            fs="15px"
            className="w-full"
          />
        </form>
      </Box>
    </div>
  );
}

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
