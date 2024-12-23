// import { TextField, Typography } from "@mui/material";
// import Box from "@mui/material/Box";
// import { PrimaryButton } from "../../../../ui/button/PrimatyButton";
// import { useEditProduct } from "../../hooks/use-edit-product";
// import { ProductEntity } from "../../entities/ProductEntity";

// interface ProductCardProps {
//   product: ProductEntity;
// }

// export function EditProduct({ product }: ProductCardProps) {
//   const { register, errors, handleSubmit, onSubmit } = useEditProduct(
//     product.id
//   );

//   return (
//     <div>
//       <Box sx={style}>
//         <Typography
//           style={{
//             fontSize: "30px",
//             fontWeight: "bold",
//             marginBottom: 15,
//           }}
//         >
//           Edit Product
//         </Typography>
//         <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
//           <TextField
//             {...register("productName")}
//             defaultValue={product.productName}
//             className="w-full"
//             type="text"
//             label="Product Name"
//           />
//           <Typography color={"red"}>{errors.productName?.message}</Typography>

//           <TextField
//             {...register("description")}
//             defaultValue={product.description}
//             className="w-full"
//             type="text"
//             label="Description"
//           />
//           <Typography color={"red"}>{errors.description?.message}</Typography>

//           <TextField
//             {...register("discount")}
//             defaultValue={product.discount}
//             className="w-full"
//             type="text"
//             label="Discount"
//           />
//           <Typography color={"red"}>{errors.discount?.message}</Typography>

//           <TextField
//             {...register("stock")}
//             defaultValue={product.stock}
//             className="w-full"
//             type="text"
//             label="Stock"
//           />
//           <Typography color={"red"}>{errors.stock?.message}</Typography>

//           <TextField
//             {...register("price")}
//             defaultValue={product.price}
//             className="w-full"
//             type="number"
//             label="Price"
//           />
//           <Typography color={"red"}>{errors.price?.message}</Typography>

//           <Typography>Photo Product</Typography>
//           <TextField
//             {...register("photoProduct")}
//             className="w-full"
//             type="file"
//           />
//           <Typography color={"red"}>{errors.photoProduct?.message}</Typography>

//           <PrimaryButton
//             title="Submit"
//             buttonType="submit"
//             color="white"
//             bg="black"
//             fw="bold"
//             fs="15px"
//             className="w-full"
//           />
//         </form>
//       </Box>
//     </div>
//   );
// }

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 5,
// };

import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { PrimaryButton } from "../../../../ui/button/PrimatyButton";
import { ProductEntity } from "../../entities/ProductEntity";
import { useEditProduct } from "../../hooks/use-edit-product";

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
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-4 ">
            <div className="flex flex-col gap-4 w-[50%]">
              <TextField
                {...register("productName")}
                className="w-full"
                defaultValue={product.productName}
                type="text"
                label="Product Name"
              />
              <Typography color={"red"}>
                {errors.productName?.message}
              </Typography>

              <TextField
                {...register("price")}
                defaultValue={product.price}
                className="w-full"
                type="number"
                label="Price"
              />
              <Typography color={"red"}>{errors.price?.message}</Typography>

              <TextField
                {...register("discount")}
                defaultValue={product.discount}
                className="w-full"
                type="number"
                label="Discount"
              />
              <Typography color={"red"}>{errors.discount?.message}</Typography>

              <TextField
                {...register("stock")}
                defaultValue={product.stock}
                className="w-full"
                type="number"
                label="Stock"
              />
              <Typography color={"red"}>{errors.stock?.message}</Typography>
            </div>

            <div className="flex flex-col gap-4 w-[50%]">
              <TextField
                {...register("description")}
                defaultValue={product.description}
                className="w-full "
                multiline
                rows={5}
                type="text"
                label="Description"
              />
              <Typography color={"red"}>
                {errors.description?.message}
              </Typography>

              <TextField
                {...register("photoProduct")}
                className="w-full"
                type="file"
                InputLabelProps={{
                  shrink: true, // Agar label tetap terlihat di atas input
                }}
                InputProps={{
                  inputProps: {
                    placeholder: "Upload your product image here", // Tidak akan terlihat langsung
                  },
                }}
                label="Photo Product"
              />
              <Typography color={"red"}>
                {errors.photoProduct?.message}
              </Typography>
              <PrimaryButton
                title="Submit"
                buttonType="submit"
                color="white"
                fw="bold"
                bg="black"
                fs="15px"
                py="12px"
                className="w-full"
              />
            </div>
          </div>
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
  width: 800,
  height: 500,
  bgcolor: "background.paper",
  overflow: "scroll",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};
