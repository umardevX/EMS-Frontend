import Box from "@mui/material/Box/Box";
import { useEffect } from "react";

interface SupportProps {
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>;
  link: string;
}

const Support = ({ setSelectedPage, link } : SupportProps) => {

useEffect(() => {
setSelectedPage(link);
})

    return(
      <Box sx={{ display: { sx: 'flex', md: 'grid' }, gridTemplateColumns: 'repeat(3,1fr)', gap: 3, textAlign: 'center', flexDirection: 'column' }}>

      </Box>
    )
}

export default Support;