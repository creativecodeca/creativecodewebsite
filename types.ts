export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  colSpan?: number; // 1 or 2
  visual: React.ReactNode;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

// Spline Viewer custom element type declaration
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url?: string;
      };
    }
  }
}