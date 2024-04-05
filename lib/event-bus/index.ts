// Assuming createUseExternalEvents and CallbackFunction are defined elsewhere

import { createUseExternalEvents } from './create-use-external-events';

type CallbackFunction = () => void;

const [useExternalEvents, create] =
  createUseExternalEvents('events-handler-app');

const createEvent = (
  id: string,
  callback: CallbackFunction,
): Record<string, CallbackFunction> => {
  const event: Record<string, CallbackFunction> = {};
  event[id] = callback;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useExternalEvents(event); // Use useExternalEvents to register the event
  return event;
};

const useEvent = (id: string): CallbackFunction | undefined => {
  // Assuming create returns a function to access the event handler
  return create(id);
};

export { createEvent, useEvent };
