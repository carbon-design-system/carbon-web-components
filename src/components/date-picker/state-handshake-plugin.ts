/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import { Plugin } from 'flatpickr/dist/types/options';
import BXDatePicker from './date-picker';

/**
 * @param config Plugin configuration.
 * @returns A Flatpickr plugin to handshake states with `<bx-date-picker>`.
 */
export default (datePicker: BXDatePicker): Plugin => (fp: FlatpickrInstance) => {
  /**
   * Sets open state.
   */
  const setOpen = () => {
    datePicker.open = true;
  };

  /**
   * Sets closed state.
   */
  const setClosed = () => {
    datePicker.open = false;
  };

  /**
   * Registers this Flatpickr plugin.
   * @param calendar The Flatpickr instance.
   */
  const register = (_selectedDates, _value, calendar: FlatpickrInstance) => {
    datePicker.calendar = calendar;
    fp.loadedPlugins.push('carbonFlatpickrStateHandshakePlugin');
  };

  return {
    onOpen: setOpen,
    onClose: setClosed,
    onReady: [register],
  };
};
