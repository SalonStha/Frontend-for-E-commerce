import { Divider } from "@mui/material";

const BannerPage = () =>{
    return(
        <>
               <div className="p-7" style={{ 
                fontFamily: 'Poppins, sans-serif',
                color: '#333',
                }}>
                <h2 className="text-2xl font-poppins! font-semibold mb-4">Banner</h2>
                <Divider/>
            </div>
        </>
    )
}

export default BannerPage;