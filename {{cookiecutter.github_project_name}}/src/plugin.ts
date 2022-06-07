// Copyright (c) {{ cookiecutter.author_name }}
// Distributed under the terms of the Modified BSD License.

import { Application, IPlugin } from '@phosphor/application';

import { Widget } from '@phosphor/widgets';

import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

const EXTENSION_ID = '{{ cookiecutter.npm_package_name }}:plugin';

/**
 * The example plugin.
 */
const examplePlugin: IPlugin<Application<Widget>, void> = {
  id: EXTENSION_ID,
  requires: [IJupyterWidgetRegistry],
  activate: activateWidgetExtension,
  autoStart: true,
} as unknown as IPlugin<Application<Widget>, void>;
// the "as unknown as ..." typecast above is solely to support JupyterLab 1
// and 2 in the same codebase and should be removed when we migrate to Lumino.

export default examplePlugin;

/**
 * Activate the widget extension.
 */
function activateWidgetExtension(
  app: Application<Widget>,
  registry: IJupyterWidgetRegistry
): void {
  registry.registerWidget({
    name: MODULE_NAME,
    version: MODULE_VERSION,
    exports: async () => import(
      /* webpackChunkName: "{{ cookiecutter.npm_package_name }}-widgets" */ 
      './widget'
    ),
  });
}
