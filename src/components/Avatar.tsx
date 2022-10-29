import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar as MuiAvatar, AvatarProps } from '@mui/material';

type AvatarColor = 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

// ----------------------------------------------------------------------

export interface Props extends AvatarProps {
    color?: AvatarColor;
}

const Avatar = forwardRef<HTMLDivElement, Props>((
    { color = 'default', children,  sx, ...other }, ref
) => {
    const theme = useTheme();
    
    if (color === 'default') {
        return (
            <MuiAvatar ref={ref} sx={{ ...sx }} {...other}>
                {children}
            </MuiAvatar>
        );
    }

    return (
        <MuiAvatar
            ref={ref}
            sx={{
                color: theme.palette[color].contrastText,
                backgroundColor: theme.palette[color].main,
                ...sx
            }}
            {...other}
        >
            {children}
        </MuiAvatar>
    );
})

export default Avatar;