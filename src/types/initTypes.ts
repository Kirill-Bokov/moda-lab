export interface BootstrapResponse {
  accessToken: string | null
  isAuthenticated: boolean
  user: { id: number; email: string, name: string} | null
  geolocation: string | null
}
