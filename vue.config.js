module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "Red Time",
    short_name: "RT",
    icons: [
      {
        src: "./img/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      },
      {
        src: "./img/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "./img/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    display: "standalone",
    background_color: "#000000",
    theme_color: "#af4448"
  }
};
