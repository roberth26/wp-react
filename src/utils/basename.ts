// prefix router base path for dev environment TODO: move to build process
export default location.hostname === 'localhost' ? '/caitlyn' : '';