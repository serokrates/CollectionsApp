import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTopFiveCollections,
  reset,
} from "../features/collections/collectionsSlice";
import { getAllTags } from "../features/items/itemsSlice";
import CardBox from "../components/CardBox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import main from "../images/main.png";
import Button from "@mui/material/Button";
function Welcome() {

  return ( 
    <Grid container sx={{color:"white"}}>
        {/* sx={{ display: { xs: 'none', sm: 'block' }}} */}
        <Grid item md={6} sm={12} sx={{mt:{sm:25,xs:15}}}>
            <Box>
                <h2 >Welcome to the collection sharig social app!</h2>
                <Box sx={{mt:5}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                luctus ut est sed faucibus. Duis bibendum ac ex vehicula
                laoreet. Suspendisse congue vulputate lobortis. Pellentesque at
                interdum tortor. Quisque arcu quam, malesuada vel mauris et,
                posuere sagittis ipsum.
                </Box>
                <Box sx={{mt:5}} align={"center"}>
                    <Link 
                    to={`/Main`}
                    style={{ textDecoration: "none" }}
                    >
                        <Button
                            size="small"
                            sx={{
                            width:"50%",
                            minWidth:"160px",
                            borderRadius:"20px",
                            background:"linear-gradient(to left,rgba(230, 203, 87,0.5),transparent)",
                            backgroundColor: "#44e2ce",
                            color: "white",
                            boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            textDecoration: "none",
                            }}
                        >
                            Get started
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Grid>
        <Grid item xs={6} sx={{ mt:{sm:30,md:25,lg:15},display: { xs: 'none', md: 'block' }}}>
            <Box >
                <img
                    src={main}
                    loading="lazy"
                    width="100%"
                />
            </Box>
        </Grid>
    </Grid>
  );
}

export default Welcome;
