document.querySelectorAll("img").forEach(img => {
  img.onerror = function () {
    this.onerror = null;
    this.src = "https://res.cloudinary.com/dop362bvg/image/upload/v1773020658/" + this.getAttribute("src");
  };
});
