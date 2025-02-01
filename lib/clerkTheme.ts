import { experimental_createTheme } from '@clerk/themes';

export const lcThemeDark = experimental_createTheme({
    variables: {
        colorBackground: 'hsl(215 28% 19%)',
        colorNeutral: 'hsl(0 0% 100%)',
        colorPrimary: 'hsl(219.62 78.16% 50.68%)',
        colorTextOnPrimaryBackground: 'hsl(0 0% 100%)',
        colorText: 'hsl(0 0% 100%)',
        colorInputText: 'hsl(0 0% 100%)',
        colorInputBackground: 'hsl(215 28% 25%)',
    },
    elements: {
        providerIcon__apple: { filter: 'invert(1)' },
        providerIcon__github: { filter: 'invert(1)' },
        activeDeviceIcon: {
            '--cl-chassis-bottom': '#d2d2d2',
            '--cl-chassis-back': '#e6e6e6',
            '--cl-chassis-screen': '#e6e6e6',
            '--cl-screen': 'hsl(215 28% 19%)',
        },
    },
});

export const lcThemeLight = experimental_createTheme({
    variables: {
        colorBackground: 'hsl(0 0% 100%)',
        colorNeutral: 'hsl(215 28% 17%)',
        colorPrimary: 'hsl(219.62 78.16% 50.68%)',
        colorTextOnPrimaryBackground: 'hsl(0 0% 100%)',
        colorText: 'hsl(215 28% 17%)',
        colorInputText: 'hsl(215 28% 17%)',
        colorInputBackground: 'hsl(214 32% 91%)',
    },
    elements: {
        providerIcon__apple: { filter: 'invert(1)' },
        providerIcon__github: { filter: 'invert(1)' },
        activeDeviceIcon: {
            '--cl-chassis-bottom': '#d2d2d2',
            '--cl-chassis-back': '#e6e6e6',
            '--cl-chassis-screen': '#e6e6e6',
            '--cl-screen': 'hsl(0 0% 100%)',
        },
    },
});
