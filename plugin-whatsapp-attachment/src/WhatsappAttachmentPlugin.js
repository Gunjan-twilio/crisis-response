import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import WhatsAppMessageBubble  from './components/WhatsAppMessageBubble/WhatsAppMessageBubble'
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'WhatsappAttachmentPlugin';

export default class WhatsappAttachmentPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);
    flex.MessageBubble.Content.add(<WhatsAppMessageBubble key="custom-bubble" flex={flex} />);
    flex.CRMContainer.defaultProps.uriCallback = (task) =>
    task
      ? 'https://docs.google.com/spreadsheets/d/1EvwTtDP2FA8YyRGWk56E4hwSbOedmzE-0mWx1-lvN4o/edit#gid=0'
      : 'https://docs.google.com/spreadsheets/d/1EvwTtDP2FA8YyRGWk56E4hwSbOedmzE-0mWx1-lvN4o/edit#gid=0';
}


  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
