// See http://blog.sodhanalibrary.com/2016/08/detect-when-user-scrolls-to-bottom-of.html#.X1dd53UzbJw
export const detectScrollBottom = () => {
  const windowHeight =
    "innerHeight" in window
      ? window.innerHeight
      : document.documentElement.offsetHeight;
  const body = document.body;
  const html = document.documentElement;
  const docHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  const windowBottom = windowHeight + window.pageYOffset;
  if (windowBottom >= docHeight) {
    return true;
  }
};
