'use client';

import {Box} from '@mui/material';
import YoutubeCardToolForm from "@/app/components/YoutubeCardTool/YoutubeCardToolForm/YoutubeCardToolForm";
import YoutubeCardToolPreview from "@/app/components/YoutubeCardTool/YoutubeCarToolPreview/YoutubeCarToolPreview";
import {useEffect, useState} from "react";
import {ConfigKey, YoutubeCardToolConfig} from "@/libs/types/YoutubeCardToolConfig";
import {decodeConfig, getYoutubeVideoDetails} from "@/libs/actions";
import {YoutubeVideoDetails} from "@/libs/types/YoutubeVideoDetails";

export default function YoutubeCardTool({searchParams}: {
    searchParams?: { [key: string]: string | string[] | undefined }
}): JSX.Element {
    const [config, setConfig] = useState<YoutubeCardToolConfig>({
        videoUrl: 'https://www.youtube.com/watch?v=f7_CHu0ADhM',
        videoId: undefined,
        showDuration: true,
        showChannel: true,
        showViews: true,
        showPublishedAt: true,
        showProgress: true,
        progressValue: 50,
        theme: 'clear',
    });

    const [videoDetails, setVideoDetails] = useState<YoutubeVideoDetails | undefined>(undefined);

    useEffect(() => {
        (async () => {
            // try to read config from url query params
            const configFromParams: string | undefined = searchParams && searchParams['config'] as string;

            if (configFromParams) {
                const config: YoutubeCardToolConfig = await decodeConfig(configFromParams);
                setConfig(config);
            } else {
                //read config from local storage
                const config = localStorage.getItem('config');


                if (config) {
                    setConfig(JSON.parse(config));
                }
            }
        })();
    }, []);

    const handleConfigChange = (key: ConfigKey, value: string | boolean | number): void => {
        const newConfig = {
            ...config,
            [key]: value,
        }

        localStorage.setItem('config', JSON.stringify(newConfig));

        setConfig((prev: YoutubeCardToolConfig) => {
            return {
                ...prev,
                [key]: value,
            }
        });
    }

    const onSearchClick = async (): Promise<void> => {
        if (config.videoUrl) {
            const url: URL = new URL(config.videoUrl);
            const videoId: string | null = url.searchParams.get('v');

            if (videoId) {
                handleConfigChange('videoId', videoId);

                try {
                    const videoDetails: YoutubeVideoDetails = await getYoutubeVideoDetails(videoId);
                    setVideoDetails(videoDetails);
                } catch (error: any) {
                    console.error(error);
                }
            }
        }
    }

    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                width: '100%',
                height: '600px',
                justifyContent: 'space-between',
                '@media (max-width: 700px)': {
                    flexFlow: 'column',
                    height: 'unset',
                    justifyContent: 'center',
                }
            }}
        >
            <Box component="div" sx={{
                width: '48%',
                '@media (max-width: 700px)': {
                    width: '100%'
                }
            }}>
                <YoutubeCardToolForm onSearchClick={onSearchClick} config={config}
                                     handleConfigChange={handleConfigChange}/>
            </Box>
            <Box component="div" sx={{
                width: '49%',
                '@media (max-width: 700px)': {
                    width: '100%',
                    minHeight: '500px'
                }
            }}>
                <YoutubeCardToolPreview config={config} videoDetails={videoDetails}/>
            </Box>
        </Box>
    )
}