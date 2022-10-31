
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import main from "../images/main.png";
import Button from "@mui/material/Button";
import { FormattedMessage } from "react-intl";
function Welcome() {

  return ( 
    <Grid container sx={{color:"white"}}>
        <Grid item md={6} sm={12} sx={{mt:{sm:25,xs:15}}}>
            <Box>
                <h2><FormattedMessage id={"app.welcome-page.header"}></FormattedMessage></h2>
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
                            <FormattedMessage id={"app.welcome-page.button"}></FormattedMessage>
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Grid>
        <Grid item xs={6} sx={{ mt:{sm:30,md:25,lg:15},display: { xs: 'none', md: 'block' }}}>
            <Box >
                <img
                    src={main}
                    alt="there lies an ivisible"
                    loading="lazy"
                    width="100%"
                />
            </Box>
        </Grid>
    </Grid>
  );
}

export default Welcome;
