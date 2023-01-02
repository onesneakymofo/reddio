import "./main.scss";

import React, {createElement} from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/components/app';

const domContainer = document.querySelector('#app');
const home = createRoot(domContainer);
home.render(createElement(App));
