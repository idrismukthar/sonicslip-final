export const getTopData = async (accessToken: string, type: string, range: string) => {
  let endpoint = "";
  
  // Real Spotify Endpoints
  if (type === "tracks") endpoint = "https://api.spotify.com/v1/me/top/tracks";
  else if (type === "artists") endpoint = "https://api.spotify.com/v1/me/top/artists";
  else if (type === "albums") endpoint = "https://api.spotify.com/v1/me/albums"; // Saved Albums
  else if (type === "shows") endpoint = "https://api.spotify.com/v1/me/shows";   // Podcasts

  const response = await fetch(`${endpoint}?time_range=${range}&limit=10`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message || "Failed to fetch Spotify data");
  }
  
  return await response.json();
};

export const getUserProfile = async (accessToken: string) => {
  const response = await fetch(`https://api.spotify.com/v1/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return await response.json();
};