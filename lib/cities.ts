export const CITIES = [
  { label: "New York, NY", lat: 40.7128, lon: -74.006 },
  { label: "Los Angeles, CA", lat: 34.0522, lon: -118.2437 },
  { label: "Chicago, IL", lat: 41.8781, lon: -87.6298 },
  { label: "Houston, TX", lat: 29.7604, lon: -95.3698 },
  { label: "Phoenix, AZ", lat: 33.4484, lon: -112.074 },
  { label: "Philadelphia, PA", lat: 39.9526, lon: -75.1652 },
  { label: "San Antonio, TX", lat: 29.4241, lon: -98.4936 },
  { label: "San Diego, CA", lat: 32.7157, lon: -117.1611 },
  { label: "Dallas, TX", lat: 32.7767, lon: -96.797 },
  { label: "Austin, TX", lat: 30.2672, lon: -97.7431 },
  { label: "Denver, CO", lat: 39.7392, lon: -104.9903 },
  { label: "Seattle, WA", lat: 47.6062, lon: -122.3321 },
  { label: "Miami, FL", lat: 25.7617, lon: -80.1918 },
  { label: "Atlanta, GA", lat: 33.749, lon: -84.388 },
  { label: "Boston, MA", lat: 42.3601, lon: -71.0589 },
  { label: "Detroit, MI", lat: 42.3314, lon: -83.0458 },
  { label: "Minneapolis, MN", lat: 44.9778, lon: -93.265 },
  { label: "Portland, OR", lat: 45.5152, lon: -122.6784 },
  { label: "Las Vegas, NV", lat: 36.1699, lon: -115.1398 },
  { label: "Nashville, TN", lat: 36.1627, lon: -86.7816 },
] as const;

export const VEHICLE_CLASSES = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "pickup", label: "Pickup truck" },
  { value: "oversized", label: "Oversized" },
] as const;

export const TRANSPORT_TYPES = [
  { value: "open", label: "Open transport" },
  { value: "enclosed", label: "Enclosed transport" },
] as const;
