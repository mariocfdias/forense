import {Grid} from "@mui/material"

export const ImageLoader = (props) => {
    return (
        <Grid sx={{maxWidth: "1008px", maxHeight: "460px"}} item xs={6}>
        {props.show ? <img style={{maxWidth: "840px", maxHeight: "460px"}} src={props.image} width={props.dimensions.width} height={props.dimensions.height}/>: ""}
        </Grid>
    )
}