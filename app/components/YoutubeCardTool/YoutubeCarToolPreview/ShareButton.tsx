import {Button} from "@mui/material";
import {YoutubeCardToolConfig} from "@/libs/types/YoutubeCardToolConfig";
import {encodeConfig} from "@/libs/actions";
import {CopyAll} from "@mui/icons-material";

type ShareButtonProps = {
    config: YoutubeCardToolConfig;
}

export default function ShareButton({config}: ShareButtonProps) {
    const onButtonClick = async () => {
        const config = localStorage.getItem('config');

        if (config) {
            const encodedConfig: string = await encodeConfig(config);
            return await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_DOMAIN}?config=${encodedConfig}`);
        }

        return await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_DOMAIN as string);
    }

    return (
        <Button onClick={onButtonClick} variant="contained" disableElevation={true} startIcon={<CopyAll />}>Copier</Button>
    )
}