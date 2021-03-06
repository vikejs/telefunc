import { AsyncLocalStorage } from 'async_hooks'
import { assert, isObject } from '../../utils'
import { installAsyncMode } from '../getContext'
import type { Telefunc } from './TelefuncNamespace'

export { getContext_async }
export { provideTelefuncContext_async }

let _asyncStore: AsyncLocalStorage<Telefunc.Context>

installAsyncMode({ getContext_async, provideTelefuncContext_async })

function getContext_async(): Telefunc.Context | undefined {
  const context = _asyncStore.getStore()
  assert(context === undefined || isObject(context))
  return context
}

function provideTelefuncContext_async(context: Telefunc.Context) {
  assert(isObject(context))
  _asyncStore = _asyncStore || new AsyncLocalStorage()
  _asyncStore.enterWith(context)
}
