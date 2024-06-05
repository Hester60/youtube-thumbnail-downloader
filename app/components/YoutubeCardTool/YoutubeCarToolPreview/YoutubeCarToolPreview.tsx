import {Box, Card, CardContent, Typography} from '@mui/material';
import {YoutubeCardToolConfig} from "@/libs/types/YoutubeCardToolConfig";
import {convertDuration} from "@/libs/utils/iso8601toReaddable";
import {formatViewsCount} from "@/libs/utils/formatViewsCount";
import fr from 'date-fns/locale/fr';
import {format} from 'date-fns';
import DownloadButton from "@/app/components/YoutubeCardTool/YoutubeCarToolPreview/DownloadButton";
import ShareButton from "@/app/components/YoutubeCardTool/YoutubeCarToolPreview/ShareButton";
import {YoutubeVideoDetails} from "@/libs/types/YoutubeVideoDetails";

type YoutubeCardToolPreviewProps = {
    config: YoutubeCardToolConfig;
    videoDetails?: YoutubeVideoDetails;
}

export default function YoutubeCardToolPreview({config, videoDetails}: YoutubeCardToolPreviewProps) {
    const cardId: string = 'card-preview';

    const getViewsAndDate = (): string => {
        const values: string[] = [];

        if (config.showViews) {
            values.push(`${formatViewsCount(parseInt(videoDetails!.viewsCount))} vues`);
        }

        if (config.showPublishedAt) {
            //@ts-ignore
            values.push(`Le ${format(videoDetails!.publishedAt, 'd MMMM yyyy', {locale: fr})}`);
        }

        return values.join(' • ');
    }

    const isThemeClear = (): boolean => {
        return 'clear' === config.theme;
    }

    return (
        <Box component="div" sx={{
            borderRadius: '5px',
            width: '100%',
            boxSizing: 'border-box',
            padding: '30px',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexFlow: 'column',
            backgroundImage: `url('/assets/images/background-transparent.jpg')`,
            '@media (max-width: 700px)': {
                borderRadius: 0,
                minHeight: '500px',
            }
        }}>
            {videoDetails && (
                <>
                    <Card sx={{width: '100%', borderRadius: '20px', backgroundColor: isThemeClear() ? 'white' : '#121212'}} elevation={0} id={cardId}>
                        <CardContent sx={{padding: '25px !important'}}>
                            <Box component="div" sx={{
                                borderRadius: '10px',
                                overflow: 'hidden',
                                display: 'flex',
                                position: 'relative',
                            }}>
                                <img src={videoDetails!.thumbnail} width="100%"
                                     alt="Video Title"/>
                                {
                                    config.showDuration && (
                                        <Box component="div" sx={{
                                            position: 'absolute',
                                            padding: '1px 3px',
                                            backgroundColor: 'rgba(0,0,0,0.6)',
                                            bottom: 10,
                                            right: 10,
                                            borderRadius: '5px',
                                        }}>
                                            <Typography color='white' fontSize="smaller">
                                                {convertDuration(videoDetails!.duration)}
                                            </Typography>
                                        </Box>
                                    )
                                }
                                {
                                    config.showProgress && (
                                        <Box component="div" sx={{
                                            width: '100%',
                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                            height: '4px',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                        }}>
                                            <Box component="div" sx={{
                                                width: `${config.progressValue}%`,
                                                backgroundColor: 'red',
                                                height: '100%',
                                            }}>
                                            </Box>
                                        </Box>
                                    )
                                }
                            </Box>
                            <Box component="div" sx={{
                                display: 'flex',
                                flexFlow: 'column',
                                mt: 1
                            }}>
                                <Typography sx={{fontSize: '1rem', fontWeight: 500}} color={isThemeClear() ? 'text.primary' : 'white'}>
                                    {videoDetails!.title}
                                </Typography>
                                {config.showChannel && (
                                    <Typography component="p" fontSize=".9rem" color={isThemeClear() ? 'text.secondary' : 'rgba(255, 255, 255, 0.7)'}
                                                sx={{marginTop: '3px'}}>
                                        {videoDetails!.channel}
                                    </Typography>
                                )}
                                {(config.showPublishedAt || config.showViews) && (
                                    <Typography component="p" fontSize=".9rem" color={isThemeClear() ? 'text.secondary' : 'rgba(255, 255, 255, 0.7)'}
                                                sx={{marginTop: '3px'}}>
                                        {getViewsAndDate()}
                                    </Typography>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                    <Box component="div" sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 3,
                        gap: 2,
                    }}>
                        <DownloadButton cardId={cardId}/>
                        <ShareButton config={config}/>
                    </Box>
                </>
            )}
        </Box>
    )
}