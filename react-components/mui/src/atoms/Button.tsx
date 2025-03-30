import React, { memo } from 'react';
import {Button as MuiButton, ButtonProps as MuiButtonProps} from "@mui/material";
import { styled } from "@mui/material/styles";


interface ButtonProps extends MuiButtonProps {
    variant?: "contained" | "outlined" | "text";
    size?: "small" | "medium" | "large";
    children: React.ReactNode;
}

const StyledButton = styled(MuiButton)<ButtonProps>(({theme, variant, size}) => {
    const variantStyles = {
        contained: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },
        outlined: {
            backgroundColor: "transparent",
            border: `2px solid ${theme.palette.primary.main}`,
            color: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: theme.palette.primary.light,
            },
        },
        text: {
            backgroundColor: "transparent",
            color: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: theme.palette.primary.light,
            },
        },
    }[variant || 'contained'];

    return {
        borderRadius: theme.shape.borderRadius as number,
        textTransform: "none",
        fontWeight: theme.typography.fontWeightMedium,
        padding: size === "small" ? "6px 12px" : size === "medium" ? "8px 16px" : "12px 24px",
        ...variantStyles,
    };
});

export const Button = memo<ButtonProps>(({
    variant = "contained",
    size = "medium",
    children,
    ...props
}) => {
    return (
        <StyledButton
            data-testid="custom-button"
            data-variant={variant}
            data-size={size}
            {...props}
        >
            {children}
        </StyledButton>
    );
});
