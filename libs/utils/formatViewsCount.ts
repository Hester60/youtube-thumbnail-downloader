export const formatViewsCount = (views: number) => {
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + ' M';
    } else if (views >= 1000) {
        return Math.floor(views / 1000) + ' k';
    } else {
        return views.toString();
    }
}