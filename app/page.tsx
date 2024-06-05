import YoutubeCardTool from "@/app/components/YoutubeCardTool/YoutubeCardTool";
import {Box} from "@mui/material";
import Footer from "@/app/components/Footer/Footer";

export default function Home({
                                 searchParams,
                             }: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    return (
        <Box component='main' sx={{
            padding: '50px 0',
            '@media (max-width: 700px)': {
                padding: 0
            }
        }}>
            <YoutubeCardTool searchParams={searchParams}/>
            <Footer />
        </Box>
    );
}
