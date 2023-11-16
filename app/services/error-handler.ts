import Service, { service } from '@ember/service';

import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type { IntlService } from 'ember-intl';

export default class ErrorHandlerService extends Service {
  @service declare flashMessages: FlashMessageService;
  @service declare intl: IntlService;

  public handle(error: unknown, message?: string) {
    const defaultMessage = error instanceof Error ? error.message : `${error}`;
    const finalMessage = message ?? defaultMessage;
    const translation = this.intl.exists(finalMessage)
      ? this.intl.t(finalMessage)
      : finalMessage;

    this.flashMessages.danger(translation);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'error-handler': ErrorHandlerService;
  }
}
