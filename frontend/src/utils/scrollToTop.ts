export function scrollToTop(smooth: boolean = true) {
  window.scrollTo({
    top: 0,
    behavior: smooth ? "smooth" : "auto",
  });
}
