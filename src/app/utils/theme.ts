export function getTheme(): string {
  // For now, always return 'light' (can be extended for dark/purple)
  return 'light';
}

export function setTheme(theme: string): void {
  const html = document.documentElement;
  const body = document.body;
  html.classList.remove('dark', 'purple', 'light');
  body.classList.remove('dark', 'purple', 'light');
  html.classList.add(theme);
  body.classList.add(theme);
} ``