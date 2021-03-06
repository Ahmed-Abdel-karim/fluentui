import { initializeIcons } from '@uifabric/icons';
import generateStoriesFromExamples from '@uifabric/build/storybook/generateStoriesFromExamples';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withPerformance } from 'storybook-addon-performance';
import { withKnobs } from '@storybook/addon-knobs';
import { withThemeProvider } from '@fluentui/storybook';

addDecorator(withA11y());
addDecorator(withPerformance);
addDecorator(withKnobs({ escapeHTML: false }));
addDecorator(withThemeProvider);
addParameters({
  a11y: {
    manual: true,
  },
});

initializeIcons();

const req = require.context('../src/components', true, /\.Example\.tsx$/);

function loadStories() {
  const stories = new Map();

  req.keys().forEach(key => {
    generateStoriesFromExamples({ key, req, stories });
  });

  // convert stories Set to array
  return [...stories.values()];
}

configure(loadStories, module);
