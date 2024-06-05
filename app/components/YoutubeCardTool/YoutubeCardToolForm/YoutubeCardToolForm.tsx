import {
    Box,
    TextField,
    FormControl,
    FormLabel,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Slider,
    Typography, InputAdornment, IconButton, InputLabel, Select, MenuItem, SelectChangeEvent
} from '@mui/material';
import {Search} from "@mui/icons-material";
import {ConfigKey, YoutubeCardToolConfig} from "@/libs/types/YoutubeCardToolConfig";
import {ChangeEvent} from "react";

type YoutubeCardToolFormProps = {
    config: YoutubeCardToolConfig;
    handleConfigChange: { (key: ConfigKey, value: string | boolean | number): void };
    onSearchClick: {(): Promise<void>}
}

export default function YoutubeCardToolForm({config, handleConfigChange, onSearchClick}: YoutubeCardToolFormProps) {
    return (
        <Box component="div" sx={{
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,0.1)',
            width: '100%',
            borderRadius: '5px',
            boxSizing: 'border-box',
            padding: '30px',
            height: '100%',
            '@media (max-width: 700px)': {
                borderRadius: 0,
            }
        }}>
            <TextField
                id="video-url-input"
                name="video-url-input"
                label="URL de la vidéo"
                fullWidth
                value={config.videoUrl}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleConfigChange('videoUrl', e.target.value)
                }}
                InputLabelProps={{shrink: true}}
                InputProps={{
                    endAdornment: <InputAdornment position="start">
                        <IconButton aria-label="search" color="primary" onClick={onSearchClick}>
                            <Search/>
                        </IconButton>
                    </InputAdornment>,
                }}
                placeholder="e.g. https://www.youtube.com/watch?v=f7_CHu0ADhM"
            />
            <FormControl sx={{mt: 3}} component="fieldset" variant="standard">
                <FormLabel component="legend">Paramètres</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                id="showDuration"
                                name="showDuration"
                                checked={config.showDuration}
                                size="small"
                                sx={{paddingTop: '10px', paddingBottom: '5px'}}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    handleConfigChange('showDuration', e.target.checked)
                                }}
                            />
                        }
                        label="Afficher la durée"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="showChannel"
                                id="showChannel"
                                checked={config.showChannel}
                                size="small"
                                sx={{paddingY: '5px'}}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    handleConfigChange('showChannel', e.target.checked)
                                }}
                            />
                        }
                        label="Afficher le nom de la chaîne"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="showViews"
                                id="showViews"
                                checked={config.showViews}
                                size="small"
                                sx={{paddingY: '5px'}}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    handleConfigChange('showViews', e.target.checked)
                                }}
                            />
                        }
                        label="Afficher les vues"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="showPublishedAt"
                                id="showPublishedAt"
                                checked={config.showPublishedAt}
                                sx={{paddingY: '5px'}}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    handleConfigChange('showPublishedAt', e.target.checked)
                                }}
                            />
                        }
                        label="Afficher la date de publication"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="showProgress"
                                id="showProgress"
                                checked={config.showProgress}
                                sx={{paddingY: '5px'}}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    handleConfigChange('showProgress', e.target.checked)
                                }}
                            />
                        }
                        label="Afficher la progression de lecture"
                    />
                </FormGroup>
            </FormControl>
            {config.showProgress && (
                <Box component="div" sx={{mt: 2}}>
                    <Typography>
                        Progression de lecture ({config.progressValue}%)
                    </Typography>
                    <Slider value={config.progressValue}
                            onChange={(event: Event, newValue: number | number[]) => handleConfigChange('progressValue', newValue as number)}
                            sx={{padding: 0, margin: 0}}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            valueLabelFormat={(v: number) => `${v}%`}
                    />
                </Box>
            )}
            <FormControl sx={{mt: 3, minWidth: '200px'}}>
                <InputLabel id="theme-select-label">Thème</InputLabel>
                <Select
                    labelId="theme-select-label"
                    id="theme-select"
                    value={config.theme}
                    onChange={(e: SelectChangeEvent) => {handleConfigChange('theme', e.target.value)}}
                    label='Thème'
                >
                    <MenuItem value='clear'>Clair</MenuItem>
                    <MenuItem value='dark'>Sombre</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}