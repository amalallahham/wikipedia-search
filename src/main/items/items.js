
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './items.css'
import img from "../../assets/1200px-Wikipedia-logo-v2-es.svg.png"

function Items({dataParentToChild}) {
  const title = 'https://en.wikipedia.org/wiki/' + dataParentToChild.title
  return (

        <Card className="card" sx={{ display: 'flex' }}>
          <CardActionArea href={title}  target="_blank">

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <CardContent className="container">
                <div                className="img">
                <CardMedia
                component="img"
 
                sx={{ width: 151 }}
                image={img}
                alt="Live from space album cover"/>
                </div>
                </CardContent>

             
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  alignContent: 'flex-start' ,  justifyContent:'center'}}>
                <span className="title">{dataParentToChild.title}</span>
                <div className="redirect">
                  <span>Redirect to wikipedia page</span>
                  <ArrowForwardIcon className="icon-arrow"></ArrowForwardIcon>
                </div>
              </Box>
            </Box>
          </CardActionArea>

        </Card>


  );
}

export default Items;
