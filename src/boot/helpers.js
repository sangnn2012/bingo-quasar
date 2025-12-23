import { boot } from 'quasar/wrappers';
import { helpers } from '../helpers/utils';

export default boot(({ app }) => {
  app.config.globalProperties.$helpers = helpers;
});
