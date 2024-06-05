'use server';

import {btoa} from "node:buffer";
import {YoutubeCardToolConfig} from "@/libs/types/YoutubeCardToolConfig";
import {YoutubeVideoDetails} from "@/libs/types/YoutubeVideoDetails";
import {AxiosResponse} from "axios";
import axiosInstance from "@/app/axios";

export const encodeConfig = async (config: string): Promise<string> => {
    return btoa(config);
}

export const decodeConfig = async (encodedConfig: string): Promise<YoutubeCardToolConfig> => {
    return JSON.parse(atob(encodedConfig));
}

export const getYoutubeVideoDetails = async (videoId: string): Promise<YoutubeVideoDetails> => {
    try {
        const url: URL = new URL(process.env.YOUTUBE_API_URL as string);
        url.searchParams.append('id', videoId);
        url.searchParams.append('key', process.env.API_KEY as string);

        const axiosResponse: AxiosResponse = await axiosInstance.get(url.toString());
        const data: any = axiosResponse.data;

        const thumbnails: any = data.items[0].snippet.thumbnails;
        const thumbnailUrl: string = thumbnails['maxres'] ? thumbnails['maxres'].url : thumbnails['standard'].url;

        // Download image to avoid CORS error with html2canvas
        const arrayBuffer = await axiosInstance.get(thumbnailUrl, {
            responseType: 'arraybuffer'
        });
        let buffer = Buffer.from(arrayBuffer.data,'binary').toString("base64");
        let image = `data:${arrayBuffer.headers["content-type"]};base64,${buffer}`;

        return {
            id: data.items[0].id,
            title: data.items[0].snippet.title,
            thumbnail: image,
            channel: data.items[0].snippet.channelTitle,
            publishedAt: data.items[0].snippet.publishedAt,
            viewsCount: data.items[0].statistics.viewCount,
            duration: data.items[0].contentDetails.duration,
        }
    } catch (error: any) {
        throw error;
    }
}