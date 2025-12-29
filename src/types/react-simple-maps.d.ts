declare module 'react-simple-maps' {
    import { ComponentType } from 'react';

    export interface ComposableMapProps {
        projection?: string;
        projectionConfig?: {
            scale?: number;
            center?: [number, number];
            rotate?: [number, number, number];
        };
        width?: number;
        height?: number;
        children?: React.ReactNode;
    }

    export interface GeographiesProps {
        geography: string | object | any[];
        children?: (context: { geographies: any[] }) => React.ReactNode;
    }

    export interface GeographyProps {
        geography: any;
        fill?: string;
        fillOpacity?: number;
        stroke?: string;
        strokeWidth?: number;
        onClick?: (event: React.MouseEvent) => void;
        style?: {
            default?: React.CSSProperties;
            hover?: React.CSSProperties;
            pressed?: React.CSSProperties;
        };
    }

    export interface ZoomableGroupProps {
        center?: [number, number];
        zoom?: number;
        minZoom?: number;
        maxZoom?: number;
        children?: React.ReactNode;
    }

    export interface MarkerProps {
        coordinates: [number, number];
        children?: React.ReactNode;
    }

    export const ComposableMap: ComponentType<ComposableMapProps>;
    export const Geographies: ComponentType<GeographiesProps>;
    export const Geography: ComponentType<GeographyProps>;
    export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
    export const Marker: ComponentType<MarkerProps>;
}
