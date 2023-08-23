export const getEnvVariables = () => {
  // import.meta.env;

  return {
    // ...import.meta.env
    VITE_MODE: import.meta.env.VITE_MODE,
    VITE_SERVER_URL: import.meta.env.VITE_SERVER_URL,
  }
}
