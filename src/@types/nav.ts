import { ReactElement } from "react";
import { BoxProps } from '@mui/material';


export type NavItemProps = {
    item: NavListProps;
    depth: number;
    open: boolean;
    active: boolean;
    isCollapse?: boolean;
}

export type NavListProps = {
    title: string;
    icon?: ReactElement;
    path: string;
    info?: string;
    caption?: string;
    disabled?: boolean;
    roles?: string[];
    children?: any;
}

export interface NavSectionProps extends BoxProps {
    isCollapse?: boolean;
    navConfig: {
      subheader: string;
      items: NavListProps[];
    }[];
  }
  