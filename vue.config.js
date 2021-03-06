module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "Red Time",
    short_name: "RT",
    icons: [
      {
        src: "img/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "img/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    lang: "en-US",
    start_url: "./",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#af4448"
  }
};
