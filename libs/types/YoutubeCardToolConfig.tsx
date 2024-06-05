export type YoutubeCardToolConfig = {
    videoUrl?: string;
    videoId?: string;
    showDuration: boolean;
    showChannel: boolean;
    showViews: boolean;
    showPublishedAt: boolean;
    showProgress: boolean;
    progressValue: number;
    theme: 'dark' | 'clear';
}

export type ConfigKey = keyof YoutubeCardToolConfig;