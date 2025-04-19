import { StyleSheet } from "react-native";
import theme from "@/app/theme/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.components.login.overlay,
    width: theme.components.login.containerWidth,
    minHeight: theme.components.login.containerHeight,
    borderRadius: theme.components.login.borderRadius,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSizes.header,
    fontWeight: "bold",
    marginBottom: theme.spacing.lg,
    color: theme.colors.primary,
    borderBottomColor: theme.colors.textTertiary,
    borderBottomWidth: 3,
    padding: theme.spacing.sm,
    textAlign: "center",
  },
  input: {
    width: theme.components.login.inputWidth,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primary,
    color: "#774936",
    },
  button: {
    width: theme.components.login.inputWidth,
    backgroundColor: theme.colors.primary,
    marginTop: theme.spacing.md,
    borderRadius: 6,
    overflow: "hidden",
  },
  message: {
    marginTop: theme.spacing.md,
    textAlign: "center",
    color: theme.colors.textPrimary,
  },
  error: {
    color: theme.colors.error,
    textAlign: "center",
    marginBottom: theme.spacing.sm,
  },
});
