const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apikey: 'f316552b1586328535a44e5ef0753195',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}
export default apiConfig;