import { Dimensions, PixelRatio } from "react-native";

// Get device width and height
const { width, height } = Dimensions.get("window");

// Define base dimensions (commonly used iPhone 11 dimensions)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Function to get percentage-based width
export const wp = (percentage: number) =>
  PixelRatio.roundToNearestPixel((width * percentage) / 100);

// Function to get percentage-based height
export const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel((height * percentage) / 100);

// Function to scale size based on screen width
export const scale = (size: number) =>
  PixelRatio.roundToNearestPixel((width / BASE_WIDTH) * size);

// Function to scale size based on screen height
export const verticalScale = (size: number) =>
  PixelRatio.roundToNearestPixel((height / BASE_HEIGHT) * size);

// Function to scale font sizes responsively
export const fontSize = (size: number) => {
  const scaleFactor = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
  return PixelRatio.roundToNearestPixel(size * scaleFactor);
};

// Function to scale line height
export const lineHeight = (size: number) =>
  PixelRatio.roundToNearestPixel(fontSize(size) * 1.2);

// Function to scale icon sizes
export const iconSize = (size: number) => scale(size);

// Function to scale border width
export const borderWidth = (size: number) =>
  PixelRatio.roundToNearestPixel(scale(size));

// Function to scale border radius
export const borderRadius = (size: number) =>
  PixelRatio.roundToNearestPixel(scale(size));

// Function to scale margins
export const margin = (size: number) =>
  PixelRatio.roundToNearestPixel(scale(size));

// Function to scale paddings
export const padding = (size: number) =>
  PixelRatio.roundToNearestPixel(scale(size));

// Export all utilities as an object for easy import
const responsive = {
  wp,
  hp,
  scale,
  verticalScale,
  fontSize,
  lineHeight,
  iconSize,
  borderWidth,
  borderRadius,
  margin,
  padding,
};

export default responsive;
