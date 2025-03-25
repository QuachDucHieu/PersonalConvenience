import { message } from 'antd';

type MessageType = 'success' | 'warning' | 'error';

export const showMessage = (type: MessageType, content: string, duration: number | null): void => {
  if (duration) {
    message[type](content, duration);
  } else {
    message[type](content);
  }
};

export const successMessage = (message: string): void => {
  showMessage('success', message, null);
};

export const warningMessage = (message: string): void => {
  showMessage('warning', message, null);
};

export const errorMessage = (message: string): void => {
  showMessage('error', message || 'Server Error', null);
};

export const successMessage2 = (message: string, duration: number): void => {
  showMessage('success', message, duration);
};
