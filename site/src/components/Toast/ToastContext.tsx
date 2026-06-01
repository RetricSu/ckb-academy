import {
  createContext,
  createMemo,
  createUniqueId,
  For,
  ParentComponent,
  useContext,
} from 'solid-js';

import * as zagToast from '@zag-js/toast';
import { normalizeProps, useMachine } from '@zag-js/solid';
import Toast from '~/components/Toast/index';
import { ToastOptions } from '@zag-js/toast';
import { ToastContext } from '~/components/Toast/types';

const toastContext = createContext<ToastContext>();
export const useToast = () => useContext(toastContext)!;
export const toast: ReturnType<typeof zagToast.api> = zagToast.api()!;

const ToastProvider: ParentComponent = (props) => {
  const [state, send] = useMachine(
    zagToast.group.machine({ offsets: '10px', id: createUniqueId() }),
  );
  const api = createMemo(() => zagToast.group.connect(state, send, normalizeProps));
  const context: ToastContext = {
    ...api(),
    create: (options: ToastOptions) => {
      return api().create({
        ...options,
        type: 'custom',
        placement: options.placement ?? 'top-end',
      });
    },
    success: (options: ToastOptions) => {
      return api().success({ ...options, placement: options.placement ?? 'top-end' });
    },
    error: (options: ToastOptions) => {
      return api().error({ ...options, placement: options.placement ?? 'top-end' });
    },
    info: (options: ToastOptions) => {
      return api().create({ ...options, type: 'info', placement: options.placement ?? 'top-end' });
    },
    loading: (options: ToastOptions) => {
      return api().loading({ ...options, placement: options.placement ?? 'top-end' });
    },
  };

  return (
    <toastContext.Provider value={context}>
      <For each={Object.entries(api().toastsByPlacement)}>
        {([placement, toasts]) => {
          return (
            <div {...api().getGroupProps({ placement: placement as zagToast.Placement })}>
              <For each={toasts}>{(toast) => <Toast actor={toast} />}</For>
            </div>
          );
        }}
      </For>
      {props.children}
    </toastContext.Provider>
  );
};

export default ToastProvider;
