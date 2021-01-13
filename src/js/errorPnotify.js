import { error, notice, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

function errorNotification(title, text) {
  defaults.delay = 3000;

  error({
    title: title,
    text: text,
  });
}

export default errorNotification;