import { View, Text, StyleSheet } from "react-native";
import { theme } from "@/constants/theme";

type SectionTitleProps = {
    title: string;
};

export default function SectionTitle({
    title
}: SectionTitleProps) {
    return (
        <View>
            <Text style={styles.title} >{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: theme.colors.foreground,
        marginBottom: theme.spacing.xs,
    },
});