export const IS_BROWSER =
  typeof window !== 'undefined' &&
  typeof window.screen !== 'undefined' &&
  window.screen.width > 0;
console.log('Environment Detection: ', IS_BROWSER ? 'Browser' : 'Node');
