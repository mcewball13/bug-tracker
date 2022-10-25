import { Box } from '@mui/material';

import { IconButtonAnimate } from '../../../components';

type CollapseButtonProps = {
  onToggleCollapse: VoidFunction;
  collapseClick: boolean;
};

export default function CollapseButton({ onToggleCollapse, collapseClick }: CollapseButtonProps) {
  return (
    <IconButtonAnimate onClick={onToggleCollapse}>
      <Box
        sx={{
          lineHeight: 0,
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(collapseClick && {
            transform: 'rotate(180deg)',
          }),
        }}
      ></Box>
    </IconButtonAnimate>
  );
}
