import { StyleSheet } from "react-native";
import { theme } from "@/app/theme/theme";

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    marginVertical: theme.spacing.sm,
    padding: theme.spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  titleStyle: {
    fontSize: theme.fontSizes.title,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  ratingStyle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  locationStyle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
  },
  ratingLocationStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: '100%',        // Full width of container
    height: 200,          // Fixed height for consistency
    borderRadius: 8,      // Match your card border radius
    marginBottom: 16,     // Space between image and content
    backgroundColor: '#CECECC', // Secondary color for loading state
    shadowColor: '#000',  // Shadow to match your card style
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,         // Android shadow
  },
});

export default styles;
