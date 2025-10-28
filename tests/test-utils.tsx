import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from '@/components/layout/theme-provider';

// Custom render function that includes ThemeProvider
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  themeProviderProps?: {
    defaultTheme?: 'light' | 'dark' | 'system';
    disableTransitionOnChange?: boolean;
  };
}

function AllTheProviders({
  children,
  themeProviderProps = {},
}: {
  children: ReactNode;
  themeProviderProps?: CustomRenderOptions['themeProviderProps'];
}) {
  const { defaultTheme = 'dark', disableTransitionOnChange = true } = themeProviderProps;

  return (
    <ThemeProvider
      defaultTheme={defaultTheme}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </ThemeProvider>
  );
}

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const { themeProviderProps, ...renderOptions } = options;

  return render(ui, {
    wrapper: props => <AllTheProviders {...props} themeProviderProps={themeProviderProps} />,
    ...renderOptions,
  });
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
