import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotronBuilder = Reactotron.configure({}); // controls connection & communication settings
reactotronBuilder.use(reactotronRedux());
reactotronBuilder.useReactNative({
  asyncStorage: true,
  networking: {
    ignoreUrls: /symbolicate|generate_204/,
  },
  editor: true,
});

const reactotron = reactotronBuilder.connect();

export default reactotron;
