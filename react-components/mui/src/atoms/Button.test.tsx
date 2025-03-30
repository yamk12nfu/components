
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import { Button } from './Button';
import { describe, it, expect, jest } from '@jest/globals';

// テスト用のテーマを作成
const theme = createTheme();

// テスト用のラッパーコンポーネント
const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>
  );
};

describe('Button', () => {
  // 基本的なレンダリングテスト
  it('renders children correctly', () => {
    renderWithTheme(<Button>テストボタン</Button>);
    expect(screen.getByText('テストボタン')).toBeInTheDocument();
  });
  // ボタンのテスト
  it('renders a button', () => {
    renderWithTheme(<Button>ボタン</Button>);
    expect(screen.getByText('ボタン')).toBeInTheDocument();
  });

  // バリアントのテスト
  it('renders with different variants', () => {
    const { rerender } = renderWithTheme(
      <Button variant="contained">ボタン</Button>
    );
    expect(screen.getByTestId('custom-button')).toHaveAttribute('data-variant', 'contained');

    rerender(<Button variant="outlined">ボタン</Button>);
    expect(screen.getByTestId('custom-button')).toHaveAttribute('data-variant', 'outlined');

    rerender(<Button variant="text">ボタン</Button>);
    expect(screen.getByTestId('custom-button')).toHaveAttribute('data-variant', 'text');
  });

  // サイズのテスト
  it('renders with different sizes', () => {
    const { rerender } = renderWithTheme(
      <Button size="small">ボタン</Button>
    );
    expect(screen.getByTestId('custom-button')).toHaveAttribute('data-size', 'small');

    rerender(<Button size="medium">ボタン</Button>);
    expect(screen.getByTestId('custom-button')).toHaveAttribute('data-size', 'medium');

    rerender(<Button size="large">ボタン</Button>);
    expect(screen.getByTestId('custom-button')).toHaveAttribute('data-size', 'large');
  });

  // クリックイベントのテスト
  it('handles click events', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Button onClick={handleClick}>クリック</Button>
    );

    fireEvent.click(screen.getByText('クリック'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 無効状態のテスト
  it('respects disabled state', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Button disabled onClick={handleClick}>
        無効ボタン
      </Button>
    );

    const button = screen.getByText('無効ボタン');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('disabled');
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
