import Typography from "@mui/material/Typography";

export default function SendEmailPage() {
  return (
    <div className="space-y-4 w-[600px]">
      <div className="space-y-2">
        <Typography
          sx={{ fontSize: "30px", fontWeight: "bold" }}
          className="text-center"
        >
          Email verifikasi telah dikirimkan.
        </Typography>
        <img src="https://res.cloudinary.com/dbgugbfil/image/upload/v1724290924/Genius/tkncqbqyvvub5pjf3ncu.png" />
        <Typography
          sx={{ fontSize: "20px", fontWeight: "bold" }}
          className="text-center"
        >
          Silakan cek email Anda dan klik tombol verifikasi untuk memastikan
          email Anda valid.
        </Typography>
      </div>
    </div>
  );
}
