import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        backgroundColor: string;
        inputColor: string;
        positiveColor: string;
        negativeColor: string;
        defaultColor: string;
    }
}