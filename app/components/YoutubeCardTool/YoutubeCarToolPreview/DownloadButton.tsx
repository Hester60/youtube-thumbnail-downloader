import {Button} from "@mui/material";
import html2canvas from 'html2canvas';
import {Download} from "@mui/icons-material";

type DownloadButtonProps = {
    cardId: string;
}

export default function DownloadButton({cardId}: DownloadButtonProps) {
    const onButtonClick = async () => {
        const element = document.getElementById(cardId);
        const canvas = await html2canvas(element!, {backgroundColor: 'transparent', scale: 2});
        const data = canvas.toDataURL('image/png');
        const link = document.createElement('a');

        link.href = data;
        link.download = 'downloaded-image.jpg';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Button onClick={onButtonClick} variant="contained" disableElevation={true} startIcon={<Download />}>Télécharger</Button>
    )
}